import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import { parse } from "csv-parse/sync";

const dbPath = path.join(process.cwd(), "dev.db");
console.log(`Connecting to: ${dbPath}`);

const db = new sqlite3.Database(dbPath);

async function main() {
    const csvFilePath = path.join(process.cwd(), "../../games.csv");
    console.log(`Reading data from: ${csvFilePath}`);

    if (!fs.existsSync(csvFilePath)) {
        console.error(`CSV file not found at ${csvFilePath}!`);
        process.exit(1);
    }

    const fileContent = fs.readFileSync(csvFilePath, "utf-8");
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
    });

    console.log(`Found ${records.length} records. Processing...`);

    db.serialize(() => {
        // Check table structure
        db.all("PRAGMA table_info(Game)", (err, rows) => {
            if (err) {
                console.error("Error checking table structure:", err);
                return;
            }
            console.log("Table columns found:", rows.map(r => r.name).join(", "));
        });

        const stmt = db.prepare(`
      INSERT OR REPLACE INTO Game (appId, title, releaseDate, priceUSD, estimatedOwners, revenue, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

        let count = 0;
        for (const record of records) {
            const appId = parseInt(record.appId);
            const priceUSD = parseFloat(record.priceUSD);
            const estimatedOwners = parseInt(record.estimatedOwners);
            const revenue = priceUSD * estimatedOwners;

            // SQLite store dates as integers (ms since epoch) or strings
            // Prisma uses DateTime which maps to ISO string or numeric in SQLite usually
            const releaseDate = record.releaseDate ? new Date(record.releaseDate).toISOString() : null;

            stmt.run(
                appId,
                record.title,
                releaseDate,
                priceUSD,
                estimatedOwners,
                revenue,
                record.tags
            );
            count++;
        }

        stmt.finalize();
        console.log(`Seeding of ${count} records completed.`);
    });

    db.close();
}

main().catch(console.error);
