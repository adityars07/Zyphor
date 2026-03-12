import { NextResponse } from "next/server";
import { getWalletTransactions } from "@/lib/server/alchemy.server";
import { mockTransactions } from "@/lib/mockData";
import type { TransactionsResponse } from "@/lib/types";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const alchemyKey = process.env.ALCHEMY_API_KEY || process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

    // Return mock data if no address or API key
    if (!address || !alchemyKey) {
        return NextResponse.json({
            transactions: mockTransactions,
        } as TransactionsResponse);
    }

    try {
        const transactions = await getWalletTransactions(address, limit);

        // If no transactions found, return mock data
        if (transactions.length === 0) {
            return NextResponse.json({
                transactions: mockTransactions,
            } as TransactionsResponse);
        }

        return NextResponse.json({ transactions } as TransactionsResponse);
    } catch (error: any) {
        console.error("Error fetching transactions:", error.message);
        return NextResponse.json({
            transactions: mockTransactions,
        } as TransactionsResponse);
    }
}
