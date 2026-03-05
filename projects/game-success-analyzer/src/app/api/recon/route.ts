import { NextResponse } from "next/server";
import { getAllGames } from "@/lib/db";
import { findTopBlueOceanRecipes } from "@/lib/analyst";

// 避免靜態生成，確保每次給出最新報告
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // 取得資料庫中全部/部分遊戲進行分析
        const games = await getAllGames();

        const recipes = findTopBlueOceanRecipes(games as any);

        return NextResponse.json({ recipes });
    } catch (error: any) {
        console.error("Recon API error:", error);
        return NextResponse.json({ error: error.message || "Failed to generate analyst report" }, { status: 500 });
    }
}
