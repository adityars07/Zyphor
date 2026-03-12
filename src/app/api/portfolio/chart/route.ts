import { NextResponse } from "next/server";
import { getTokenPriceHistory } from "@/lib/server/coingecko.server";
import { mockChartData } from "@/lib/mockData";
import type { ChartResponse } from "@/lib/types";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const coinId = searchParams.get("coinId") || "ethereum";
    const days = parseInt(searchParams.get("days") || "180", 10);

    try {
        const data = await getTokenPriceHistory(coinId, days);

        if (data.length === 0) {
            // Fallback to mock
            return NextResponse.json({ data: mockChartData } as ChartResponse);
        }

        return NextResponse.json({ data } as ChartResponse);
    } catch (error: any) {
        console.error("Error fetching chart data:", error.message);
        // Fallback to mock chart data
        return NextResponse.json({ data: mockChartData } as ChartResponse);
    }
}
