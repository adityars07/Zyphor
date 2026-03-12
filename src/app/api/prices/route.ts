import { NextResponse } from "next/server";
import { getTokenPrices } from "@/lib/server/coingecko.server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids");

    if (!idsParam) {
        return NextResponse.json(
            { error: 'Missing required parameter: ids (comma-separated CoinGecko coin IDs)' },
            { status: 400 }
        );
    }

    const coinIds = idsParam.split(",").map((id) => id.trim()).filter(Boolean);

    if (coinIds.length === 0) {
        return NextResponse.json(
            { error: 'No valid coin IDs provided' },
            { status: 400 }
        );
    }

    try {
        const prices = await getTokenPrices(coinIds);
        return NextResponse.json(prices);
    } catch (error: any) {
        console.error("Error fetching prices:", error.message);
        return NextResponse.json(
            { error: "Failed to fetch token prices" },
            { status: 500 }
        );
    }
}
