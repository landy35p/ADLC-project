export interface Game {
    id: number;
    appId: number;
    title: string;
    releaseDate: string | Date;
    priceUSD: number;
    estimatedOwners: number;
    revenue: number;
    tags: string;
}

export const SUCCESS_THRESHOLD = 10000; // $10K USD

/**
 * Calculates game statistics by genre tag
 */
export function calculateGenreStats(games: Game[]) {
    const stats: Record<string, { count: number; successCount: number }> = {};

    games.forEach((game) => {
        const tags = game.tags.split(";").map(t => t.trim()).filter(Boolean);
        tags.forEach(tag => {
            if (!stats[tag]) {
                stats[tag] = { count: 0, successCount: 0 };
            }
            stats[tag].count++;
            if (game.revenue >= SUCCESS_THRESHOLD) {
                stats[tag].successCount++;
            }
        });
    });

    return Object.entries(stats)
        .map(([tagName, data]) => ({
            tagName,
            count: data.count,
            successRate: data.successCount / data.count,
        }))
        .sort((a, b) => b.count - a.count);
}

/**
 * Predicts success probability based on tags and price
 */
export function predictSuccess(games: Game[], selectedTags: string[], priceUSD: number) {
    const filteredGames = games.filter(game => {
        const gameTags = game.tags.split(";").map(t => t.trim());
        const hasMatchingTag = selectedTags.length === 0 || selectedTags.some(t => gameTags.includes(t));
        const inPriceRange = isNaN(priceUSD) || Math.abs(game.priceUSD - priceUSD) <= 10.0;
        return hasMatchingTag && inPriceRange;
    });

    const N = filteredGames.length;
    const S = filteredGames.filter(g => g.revenue >= SUCCESS_THRESHOLD).length;

    const successProbability = N > 0 ? S / N : 0;

    const revenues = filteredGames.map(g => g.revenue).sort((a, b) => a - b);
    const medianRevenue = revenues.length > 0 ? revenues[Math.floor(revenues.length / 2)] : 0;

    return {
        sampleSize: N,
        successProbability,
        medianRevenue,
        recommendation: successProbability > 0.5 ? "High potential" : (N > 0 ? "Risky market" : "No sufficient data"),
    };
}
