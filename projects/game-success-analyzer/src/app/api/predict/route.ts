import { NextResponse } from "next/server";
import { getAllGames } from "@/lib/db";
import { predictSuccess } from "@/lib/logic";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { tags, price } = body;
        const priceUSD = parseFloat(price);

        const games = await getAllGames();
        const result = predictSuccess(games as any, tags, priceUSD);

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("Predict API Error:", error);
        return NextResponse.json({ error: error.message || "Prediction failed" }, { status: 500 });
    }
}
