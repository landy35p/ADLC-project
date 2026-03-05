import { describe, it, expect } from "vitest";
import { calculateGenreStats, predictSuccess, Game } from "./logic";

const mockGames: Game[] = [
    { id: 1, appId: 10, title: "Game 1", releaseDate: "2023-01-01", priceUSD: 10, estimatedOwners: 2000, revenue: 20000, tags: "Action; RPG" },
    { id: 2, appId: 20, title: "Game 2", releaseDate: "2023-01-01", priceUSD: 20, estimatedOwners: 100, revenue: 2000, tags: "Casual" },
    { id: 3, appId: 30, title: "Game 3", releaseDate: "2023-01-01", priceUSD: 15, estimatedOwners: 1000, revenue: 15000, tags: "Action; Indie" },
    { id: 4, appId: 40, title: "Game 4", releaseDate: "2023-01-01", priceUSD: 5, estimatedOwners: 500, revenue: 2500, tags: "Indie" },
];

describe("Game Success Logic", () => {
    describe("calculateGenreStats", () => {
        it("should correctly count and calculate success rate per tag", () => {
            const stats = calculateGenreStats(mockGames);
            const actionStats = stats.find(s => s.tagName === "Action");
            const indieStats = stats.find(s => s.tagName === "Indie");

            expect(actionStats).toBeDefined();
            expect(actionStats?.count).toBe(2);
            expect(actionStats?.successRate).toBe(1); // Both Action games > 10000

            expect(indieStats).toBeDefined();
            expect(indieStats?.count).toBe(2);
            expect(indieStats?.successRate).toBe(0.5); // One Indie game successful, one not
        });

        it("should return sorted tags by popularity", () => {
            const stats = calculateGenreStats(mockGames);
            expect(stats[0].count).toBeGreaterThanOrEqual(stats[1].count);
        });
    });

    describe("predictSuccess", () => {
        it("should predict 100% success for tags with high success history", () => {
            const result = predictSuccess(mockGames, ["Action"], 10);
            expect(result.successProbability).toBe(1);
            expect(result.sampleSize).toBe(2);
        });

        it("should predict 50% success for mixed performance tags", () => {
            const result = predictSuccess(mockGames, ["Indie"], 10);
            expect(result.successProbability).toBe(0.5);
        });

        it("should return median revenue", () => {
            const result = predictSuccess(mockGames, ["Action"], 10);
            // Action revenues: 20000, 15000 -> Sorted: 15000, 20000 -> Median index 1: 20000
            expect(result.medianRevenue).toBe(20000);
        });

        it("should handle empty matches gracefully", () => {
            const result = predictSuccess(mockGames, ["Sci-Fi"], 10);
            expect(result.sampleSize).toBe(0);
            expect(result.successProbability).toBe(0);
            expect(result.recommendation).toBe("數據不足");
        });
    });
});
