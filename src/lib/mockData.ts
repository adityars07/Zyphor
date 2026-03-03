export const mockPortfolio = {
    totalBalanceUsd: 14523.87,
    balanceChange24hUsd: 842.15,
    balanceChange24hPct: 6.15,
};

export const mockAssets = [
    {
        symbol: 'ETH',
        name: 'Ethereum',
        balance: 2.45,
        priceUsd: 3450.20,
        valueUsd: 8452.99,
        change24h: 4.2,
        icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    {
        symbol: 'BTC',
        name: 'Wrapped Bitcoin',
        balance: 0.045,
        priceUsd: 65200.00,
        valueUsd: 2934.00,
        change24h: -1.5,
        icon: 'https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png',
    },
    {
        symbol: 'SOL',
        name: 'Solana',
        balance: 45.2,
        priceUsd: 145.30,
        valueUsd: 6567.56,
        change24h: 12.4,
        icon: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    },
    {
        symbol: 'USDC',
        name: 'USD Coin',
        balance: 1540.32,
        priceUsd: 1.00,
        valueUsd: 1540.32,
        change24h: 0.01,
        icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    },
];

export const mockTransactions = [
    {
        id: 'tx1',
        type: 'receive',
        asset: 'ETH',
        amount: 0.5,
        valueUsd: 1725.10,
        timestamp: '2024-05-15T14:30:00Z',
        status: 'completed',
        address: '0x1a2...3b4c',
    },
    {
        id: 'tx2',
        type: 'swap',
        asset: 'USDC',
        amount: 500,
        valueUsd: 500.00,
        timestamp: '2024-05-14T09:15:00Z',
        status: 'completed',
        details: 'Swapped 0.15 ETH for 500 USDC',
    },
    {
        id: 'tx3',
        type: 'send',
        asset: 'SOL',
        amount: 10,
        valueUsd: 1453.00,
        timestamp: '2024-05-12T18:45:00Z',
        status: 'completed',
        address: '0x9d8...7e6f',
    },
    {
        id: 'tx4',
        type: 'receive',
        asset: 'BTC',
        amount: 0.01,
        valueUsd: 652.00,
        timestamp: '2024-05-10T11:20:00Z',
        status: 'completed',
        address: '0x4f5...2a1b',
    },
];

export const mockChartData = [
    { date: 'Jan', value: 9500 },
    { date: 'Feb', value: 10200 },
    { date: 'Mar', value: 11500 },
    { date: 'Apr', value: 10800 },
    { date: 'May', value: 13200 },
    { date: 'Jun', value: 14523.87 },
];
