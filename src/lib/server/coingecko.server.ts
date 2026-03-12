import axios from "axios";
import type { PricesResponse, ChartDataPoint } from "../types";

// ─── In-memory cache ────────────────────────────────────────────────────────
interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

const CACHE_TTL_MS = 60_000; // 60 seconds
const priceCache = new Map<string, CacheEntry<PricesResponse>>();
const chartCache = new Map<string, CacheEntry<ChartDataPoint[]>>();

function getCached<T>(cache: Map<string, CacheEntry<T>>, key: string): T | null {
    const entry = cache.get(key);
    if (entry && Date.now() - entry.timestamp < CACHE_TTL_MS) {
        return entry.data;
    }
    cache.delete(key);
    return null;
}

function setCache<T>(cache: Map<string, CacheEntry<T>>, key: string, data: T) {
    cache.set(key, { data, timestamp: Date.now() });
}

// ─── CoinGecko base config ─────────────────────────────────────────────────
const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

function getHeaders(): Record<string, string> {
    const apiKey = process.env.COINGECKO_API_KEY;
    if (apiKey) {
        return { "x-cg-demo-api-key": apiKey };
    }
    return {};
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Fetches current prices and 24h change for given CoinGecko coin IDs.
 * Results are cached for 60 seconds.
 */
export async function getTokenPrices(coinIds: string[]): Promise<PricesResponse> {
    const sortedIds = [...coinIds].sort().join(",");
    const cacheKey = `prices:${sortedIds}`;

    const cached = getCached(priceCache, cacheKey);
    if (cached) return cached;

    const response = await axios.get(`${COINGECKO_BASE}/simple/price`, {
        params: {
            ids: sortedIds,
            vs_currencies: "usd",
            include_24hr_change: "true",
        },
        headers: getHeaders(),
        timeout: 10_000,
    });

    const result: PricesResponse = {};
    for (const [coinId, data] of Object.entries(response.data)) {
        const d = data as any;
        result[coinId] = {
            usd: d.usd || 0,
            usd_24h_change: d.usd_24h_change || 0,
        };
    }

    setCache(priceCache, cacheKey, result);
    return result;
}

/**
 * Fetches historical price data for a coin over a number of days.
 * Returns daily data points suitable for charting.
 * Results are cached for 60 seconds.
 */
export async function getTokenPriceHistory(
    coinId: string,
    days: number = 180
): Promise<ChartDataPoint[]> {
    const cacheKey = `chart:${coinId}:${days}`;

    const cached = getCached(chartCache, cacheKey);
    if (cached) return cached;

    const response = await axios.get(
        `${COINGECKO_BASE}/coins/${coinId}/market_chart`,
        {
            params: {
                vs_currency: "usd",
                days: days.toString(),
            },
            headers: getHeaders(),
            timeout: 10_000,
        }
    );

    const prices: [number, number][] = response.data.prices || [];

    // Downsample to avoid excessive data points
    const step = Math.max(1, Math.floor(prices.length / 90));
    const dataPoints: ChartDataPoint[] = [];

    for (let i = 0; i < prices.length; i += step) {
        const [timestamp, value] = prices[i];
        const date = new Date(timestamp);
        dataPoints.push({
            date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            value: parseFloat(value.toFixed(2)),
        });
    }

    setCache(chartCache, cacheKey, dataPoints);
    return dataPoints;
}
