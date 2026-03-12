import { NextResponse } from "next/server";
import { getWalletTokenBalances } from "@/lib/server/alchemy.server";
import { getTokenPrices } from "@/lib/server/coingecko.server";
import { mockAssets, mockPortfolio } from "@/lib/mockData";
import type { PortfolioResponse, TokenBalance } from "@/lib/types";

// Map of known token symbols to CoinGecko IDs
const SYMBOL_TO_COINGECKO: Record<string, string> = {
    ETH: "ethereum",
    WETH: "ethereum",
    WBTC: "wrapped-bitcoin",
    BTC: "bitcoin",
    USDC: "usd-coin",
    USDT: "tether",
    DAI: "dai",
    LINK: "chainlink",
    UNI: "uniswap",
    AAVE: "aave",
    MATIC: "matic-network",
    SOL: "solana",
    ARB: "arbitrum",
    OP: "optimism",
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    const alchemyKey = process.env.ALCHEMY_API_KEY || process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

    // If no address or no API key, return mock data
    if (!address || !alchemyKey) {
        const mockResponse: PortfolioResponse = {
            summary: mockPortfolio,
            assets: mockAssets.map((a) => ({
                ...a,
                icon: a.icon,
            })),
        };
        return NextResponse.json(mockResponse);
    }

    try {
        // 1. Fetch token balances from Alchemy
        const tokens = await getWalletTokenBalances(address);

        // 2. Determine CoinGecko IDs for price lookup
        const coinIds = new Set<string>();
        coinIds.add("ethereum"); // Always include ETH
        for (const token of tokens) {
            const cgId = SYMBOL_TO_COINGECKO[token.symbol.toUpperCase()];
            if (cgId) coinIds.add(cgId);
        }

        // 3. Fetch prices from CoinGecko
        let prices: Record<string, { usd: number; usd_24h_change: number }> = {};
        try {
            prices = await getTokenPrices(Array.from(coinIds));
        } catch {
            // If price fetch fails, continue with zero prices
            console.warn("Failed to fetch prices, continuing with zeros");
        }

        // 4. Enrich tokens with price data
        const enrichedTokens: TokenBalance[] = tokens.map((token) => {
            const cgId = SYMBOL_TO_COINGECKO[token.symbol.toUpperCase()];
            const priceData = cgId ? prices[cgId] : undefined;
            const priceUsd = priceData?.usd || 0;
            const change24h = priceData?.usd_24h_change || 0;
            const balance = typeof token.balance === "string" ? parseFloat(token.balance) : token.balance;

            return {
                ...token,
                priceUsd,
                valueUsd: parseFloat((balance * priceUsd).toFixed(2)),
                change24h: parseFloat(change24h.toFixed(2)),
            };
        });

        // Sort by USD value descending
        enrichedTokens.sort((a, b) => b.valueUsd - a.valueUsd);

        // 5. Calculate summary
        const totalBalanceUsd = enrichedTokens.reduce((sum, t) => sum + t.valueUsd, 0);

        // Weighted average 24h change
        let weightedChange = 0;
        if (totalBalanceUsd > 0) {
            for (const token of enrichedTokens) {
                weightedChange += (token.valueUsd / totalBalanceUsd) * token.change24h;
            }
        }

        const balanceChange24hUsd = parseFloat(
            ((totalBalanceUsd * weightedChange) / 100).toFixed(2)
        );

        const response: PortfolioResponse = {
            summary: {
                totalBalanceUsd: parseFloat(totalBalanceUsd.toFixed(2)),
                balanceChange24hUsd,
                balanceChange24hPct: parseFloat(weightedChange.toFixed(2)),
            },
            assets: enrichedTokens,
        };

        return NextResponse.json(response);
    } catch (error: any) {
        console.error("Error fetching portfolio:", error.message);

        // Fallback to mock data on error
        const fallback: PortfolioResponse = {
            summary: mockPortfolio,
            assets: mockAssets,
        };
        return NextResponse.json(fallback);
    }
}
