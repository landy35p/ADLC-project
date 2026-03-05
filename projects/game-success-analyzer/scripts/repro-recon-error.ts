import prisma from "../src/lib/prisma";
import { findTopBlueOceanRecipes } from "../src/lib/analyst";

async function testRecon() {
    try {
        console.log("Fetching games from DB...");
        const games = await prisma.game.findMany();
        console.log(`Found ${games.length} games.`);

        console.log("Analyzing...");
        const recipes = findTopBlueOceanRecipes(games as any);
        console.log("Analysis successful!");
        console.log("Top 3 Recipes:", JSON.stringify(recipes, null, 2));
    } catch (error) {
        console.error("TEST FAILED:", error);
    } finally {
        await prisma.$disconnect();
    }
}

testRecon();
