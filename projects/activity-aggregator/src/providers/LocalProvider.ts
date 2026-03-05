import * as fs from 'fs/promises';
import * as path from 'path';
import { GameData, IDataProvider } from '../types';

export class LocalProvider implements IDataProvider {
    private filePath: string;

    constructor(filePath?: string) {
        // 預設讀取專案根目錄 data/mock_data.json
        this.filePath = filePath || path.resolve(process.cwd(), 'data', 'mock_data.json');
    }

    async fetchData(): Promise<GameData[]> {
        try {
            console.log(`[LocalProvider] Reading data from ${this.filePath}...`);
            const fileContent = await fs.readFile(this.filePath, 'utf-8');
            const data: GameData[] = JSON.parse(fileContent);
            console.log(`[LocalProvider] Successfully loaded ${data.length} records.`);
            return data;
        } catch (error) {
            console.error(`[LocalProvider] Failed to read mock data:`, error);
            throw error;
        }
    }
}
