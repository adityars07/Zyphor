import { useState, useEffect } from 'react';
import axios from 'axios';
import type { PortfolioResponse, TokenBalance, PortfolioSummary } from '@/lib/types';

export function usePortfolio(address: string | undefined) {
    const [summary, setSummary] = useState<PortfolioSummary | null>(null);
    const [assets, setAssets] = useState<TokenBalance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPortfolio = async () => {
        setLoading(true);
        setError(null);

        try {
            const params: Record<string, string> = {};
            if (address) params.address = address;

            const response = await axios.get<PortfolioResponse>('/api/portfolio', { params });
            setSummary(response.data.summary);
            setAssets(response.data.assets);
        } catch (err: any) {
            console.error('Error fetching portfolio:', err);
            setError('Failed to fetch portfolio data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, [address]);

    return { summary, assets, loading, error, refetch: fetchPortfolio };
}
