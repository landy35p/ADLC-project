import { NextResponse } from "next/server";
import { getAllGames } from "@/lib/db";
import { calculateGenreStats } from "@/lib/logic";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const games = await getAllGames();
        const result = calculateGenreStats(games as any).slice(0, 10);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error("Stats API Error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch stats" }, { status: 500 });
    }
}
