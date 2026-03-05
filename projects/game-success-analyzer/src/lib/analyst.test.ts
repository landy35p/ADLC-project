import { describe, it, expect } from "vitest";
import { calculateComplexity, calculateBlueOceanScore, findTopBlueOceanRecipes } from "./analyst";
import { Game } from "./logic";

const mockGames: Game[] = [
    { id: 1, appId: 101, title: "Game A", releaseDate: "2023-01-01", priceUSD: 10, estimatedOwners: 5000, revenue: 50000, tags: "Action; Indie; Pixel Graphics" },
    { id: 2, appId: 102, title: "Game B", releaseDate: "2023-02-01", priceUSD: 15, estimatedOwners: 1000, revenue: 15000, tags: "Action; Indie; Pixel Graphics" },
    { id: 3, appId: 103, title: "Game C", releaseDate: "2023-03-01", priceUSD: 60, estimatedOwners: 100, revenue: 6000, tags: "MMO; Multiplayer; 3D; Realistic" },
    { id: 4, appId: 104, title: "Game D", releaseDate: "2023-04-01", priceUSD: 60, estimatedOwners: 50, revenue: 3000, tags: "MMO; Multiplayer; 3D; Realistic" },
    { id: 5, appId: 105, title: "Game E", releaseDate: "2023-05-01", priceUSD: 20, estimatedOwners: 2000, revenue: 40000, tags: "Puzzle; 2D; Minimalist" },
    { id: 6, appId: 106, title: "Game F", releaseDate: "2023-06-01", priceUSD: 20, estimatedOwners: 3000, revenue: 60000, tags: "Puzzle; 2D; Minimalist" },
];

describe("Analyst Engine", () => {
    it("should calculate correct complexity for low cost tags", () => {
        const score = calculateComplexity(["Pixel Graphics", "Singleplayer", "Roguelike"]);
        expect(score.art).toBe(1);
        expect(score.total).toBeLessThan(7);
    });

    it("should calculate correct complexity for high cost tags", () => {
        const score = calculateComplexity(["Realistic", "MMO", "Live Service"]);
        expect(score.art).toBe(10);
        expect(score.dev).toBe(10);
        expect(score.ops).toBe(10);
        expect(score.total).toBe(30);
    });

    it("should score blue ocean recipes higher for low-cost/high-revenue", () => {
        const lowCostScore = calculateBlueOceanScore(mockGames, ["Puzzle", "Minimalist"]);
        const highCostScore = calculateBlueOceanScore(mockGames, ["MMO", "3D"]);

        expect(lowCostScore).not.toBeNull();
        expect(highCostScore).not.toBeNull();
        expect(lowCostScore!.blueOceanScore).toBeGreaterThan(highCostScore!.blueOceanScore);
    });

    it("should find and sort top recipes", () => {
        const topRecipes = findTopBlueOceanRecipes(mockGames);
        expect(topRecipes.length).toBeGreaterThan(0);
        // 第一名應該要是高性價比組合 (例如包含 Puzzle / Minimalist 相關)
        const bestRecipe = topRecipes[0];
        expect(bestRecipe.blueOceanScore).toBeGreaterThan(0);
        expect(bestRecipe.tags).toBeDefined();
    });
});
