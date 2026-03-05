import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { findTopBlueOceanRecipes } from "@/lib/analyst";

// 避免靜態生成，確保每次給出最新報告
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // 取得資料庫中全部/部分遊戲進行分析
        const games = await prisma.game.findMany({
            select: {
                id: true,
                appId: true,
                title: true,
                releaseDate: true,
                priceUSD: true,
                estimatedOwners: true,
                revenue: true,
                tags: true,
            },
        });

        const recipes = findTopBlueOceanRecipes(games);

        return NextResponse.json({ recipes });
    } catch (error) {
        console.error("Recon API error:", error);
        return NextResponse.json({ error: "Failed to generate analyst report" }, { status: 500 });
    }
}
