import * as fs from "fs";
import * as path from "path";
import sqlite3 from "sqlite3";

// 定義從 Aggregator 讀取進來的資料形狀
interface AggregatorGameData {
    title: string;
    priceUSD: number;
    estimatedOwners: number;
    revenue: number;
    tags: string[];
}

const dbPath = path.join(process.cwd(), "dev.db");
console.log(`[SeedBridge] Connecting to DB: ${dbPath}`);

const db = new sqlite3.Database(dbPath);

async function main() {
    const jsonPath = path.resolve(process.cwd(), "../../projects/activity-aggregator/data/output.json");
    console.log(`[SeedBridge] Reading aggregated data from: ${jsonPath}`);

    if (!fs.existsSync(jsonPath)) {
        console.error(`[SeedBridge] Fatal: Output JSON not found at ${jsonPath}. Please run activity-aggregator first.`);
        process.exit(1);
    }

    const fileContent = fs.readFileSync(jsonPath, "utf-8");
    const records: AggregatorGameData[] = JSON.parse(fileContent);

    console.log(`[SeedBridge] Found ${records.length} records from Aggregator. Merging into local database...`);

    db.serialize(() => {
        // 為了滿足原有的 Schema (appId 為必填 Unique)，我們從一個夠高的數字開始指派流水號
        let virtualAppId = 9000000;

        const stmt = db.prepare(`
      INSERT OR REPLACE INTO Game (appId, title, priceUSD, estimatedOwners, revenue, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

        let count = 0;
        for (const record of records) {
            // Adapter: 轉換欄位格式以符合 Analyzer Schema
            const appId = virtualAppId++;
            const tagsString = record.tags.join(";");

            stmt.run(
                appId,
                record.title,
                record.priceUSD,
                record.estimatedOwners,
                record.revenue,
                tagsString
            );
            count++;
        }

        stmt.finalize();
        console.log(`[SeedBridge] Successfully seeded ${count} virtual/real records from Aggregator output.`);
    });

    db.close();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
