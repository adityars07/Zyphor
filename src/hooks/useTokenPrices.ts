import { useState, useEffect } from 'react';
import axios from 'axios';

interface TokenPrice {
    usd: number;
    usd_24h_change: number;
}

interface TokenPrices {
    [key: string]: TokenPrice;
}

const DEFAULT_COINS = ['ethereum', 'bitcoin', 'solana', 'usd-coin'];

export function useTokenPrices(coins = DEFAULT_COINS) {
    const [prices, setPrices] = useState<TokenPrices | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPrices = async () => {
        try {
            const response = await axios.get(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_24hr_change=true`
            );
            setPrices(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching token prices:', err);
            setError('Failed to fetch token prices');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrices();

        // Poll every 60 seconds
        const interval = setInterval(fetchPrices, 60000);
        return () => clearInterval(interval);
    }, [coins.join(',')]);

    return { prices, loading, error, refetch: fetchPrices };
}
