import * as dotenv from 'dotenv';
import * as fs from 'fs/promises';
import * as path from 'path';
import { IDataProvider } from './types';
import { LocalProvider } from './providers/LocalProvider';
import { KaggleProvider } from './providers/KaggleProvider';

dotenv.config();

async function main() {
    console.log("=== Activity Aggregator Starting ===");

    const mode = process.env.DATA_SOURCE || 'LOCAL';
    console.log(`[Config] Operating Mode: ${mode}`);

    let provider: IDataProvider;

    if (mode === 'KAGGLE') {
        provider = new KaggleProvider();
    } else {
        provider = new LocalProvider();
    }

    try {
        const data = await provider.fetchData();

        // 將結果輸出到 data/output.json
        const outputPath = path.resolve(process.cwd(), 'data', 'output.json');
        await fs.writeFile(outputPath, JSON.stringify(data, null, 2), 'utf-8');

        console.log(`[Success] Aggregated ${data.length} records successfully.`);
        console.log(`[Success] Data written to ${outputPath}`);
    } catch (error) {
        console.error("[Fatal Error] Aggregation failed:", error);
        process.exit(1);
    }
}

main();
