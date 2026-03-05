import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { parse } from "csv-parse/sync";
import { PrismaClient } from "@prisma/client";

async function main() {
    dotenv.config();
    console.log("DEBUG: DATABASE_URL =", process.env.DATABASE_URL);

    const prisma = new PrismaClient();

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

    let count = 0;
    for (const record of records) {
        const appId = parseInt(record.appId);
        const priceUSD = parseFloat(record.priceUSD);
        const estimatedOwners = parseInt(record.estimatedOwners);
        const revenue = priceUSD * estimatedOwners;

        await prisma.game.upsert({
            where: { appId },
            update: {
                title: record.title,
                releaseDate: record.releaseDate ? new Date(record.releaseDate) : null,
                priceUSD,
                estimatedOwners,
                revenue,
                tags: record.tags,
            },
            create: {
                appId,
                title: record.title,
                releaseDate: record.releaseDate ? new Date(record.releaseDate) : null,
                priceUSD,
                estimatedOwners,
                revenue,
                tags: record.tags,
            },
        });
        count++;
    }

    console.log(`Successfully ingested ${count} games.`);
    await prisma.$disconnect();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
