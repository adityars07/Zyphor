// Shared TypeScript interfaces for Zyphor backend API responses

export interface TokenBalance {
    symbol: string;
    name: string;
    balance: number | string;
    priceUsd: number;
    valueUsd: number;
    change24h: number;
    icon: string;
    contractAddress?: string;
    decimals?: number;
}

export interface PortfolioSummary {
    totalBalanceUsd: number;
    balanceChange24hUsd: number;
    balanceChange24hPct: number;
}

export interface PortfolioResponse {
    summary: PortfolioSummary;
    assets: TokenBalance[];
}

export interface NFTItem {
    contractAddress: string;
    tokenId: string;
    title: string;
    description: string;
    rarity?: string;
    collection?: string;
    media: { gateway: string }[];
    lastSalePrice?: string;
}

export interface Transaction {
    id: string;
    type: 'receive' | 'send' | 'swap' | 'approve' | 'unknown';
    asset: string;
    amount: number;
    valueUsd: number;
    timestamp: string;
    status: 'completed' | 'pending' | 'failed';
    address?: string;
    details?: string;
    hash?: string;
}

export interface PriceData {
    usd: number;
    usd_24h_change: number;
}

export interface PricesResponse {
    [coinId: string]: PriceData;
}

export interface ChartDataPoint {
    date: string;
    value: number;
}

export interface ChartResponse {
    data: ChartDataPoint[];
}

export interface NFTsResponse {
    nfts: NFTItem[];
}

export interface TransactionsResponse {
    transactions: Transaction[];
}
