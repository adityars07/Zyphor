import { useState, useEffect } from 'react';
import axios from 'axios';
import type { NFTItem } from '@/lib/types';

export function useNFTs(address: string | undefined) {
    const [nfts, setNfts] = useState<NFTItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNFTs = async () => {
        setLoading(true);
        setError(null);

        try {
            const params: Record<string, string> = {};
            if (address) params.address = address;

            const response = await axios.get('/api/nfts', { params });
            setNfts(response.data.nfts || []);
        } catch (err: any) {
            console.error('Error fetching NFTs:', err);
            setError('Failed to fetch NFTs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNFTs();
    }, [address]);

    return { nfts, loading, error, refetch: fetchNFTs };
}
