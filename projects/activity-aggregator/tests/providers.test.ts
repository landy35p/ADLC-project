import { describe, it, expect } from 'vitest';
import { LocalProvider } from '../src/providers/LocalProvider';
import { KaggleProvider } from '../src/providers/KaggleProvider';
import { GameData } from '../src/types';

describe('Data Providers Validation', () => {

    const validateGameData = (game: GameData) => {
        expect(game).toHaveProperty('title');
        expect(typeof game.title).toBe('string');

        expect(game).toHaveProperty('priceUSD');
        expect(typeof game.priceUSD).toBe('number');

        expect(game).toHaveProperty('estimatedOwners');
        expect(typeof game.estimatedOwners).toBe('number');

        expect(game).toHaveProperty('revenue');
        expect(typeof game.revenue).toBe('number');

        expect(game).toHaveProperty('tags');
        expect(Array.isArray(game.tags)).toBe(true);
    };

    it('LocalProvider should return valid GameData[]', async () => {
        const provider = new LocalProvider();
        const data = await provider.fetchData();
        expect(data.length).toBeGreaterThan(0);
        // Validate schema
        data.forEach(validateGameData);
    });

    it('KaggleProvider should return valid GameData[] (mock network)', async () => {
        const provider = new KaggleProvider();
        const data = await provider.fetchData();
        expect(data.length).toBeGreaterThan(0);
        // Validate schema
        data.forEach(validateGameData);
    });

});
