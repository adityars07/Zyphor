import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Transaction } from '@/lib/types';

export function useTransactions(address: string | undefined, limit: number = 10) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);

        try {
            const params: Record<string, string | number> = { limit };
            if (address) params.address = address;

            const response = await axios.get('/api/transactions', { params });
            setTransactions(response.data.transactions || []);
        } catch (err: any) {
            console.error('Error fetching transactions:', err);
            setError('Failed to fetch transactions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [address, limit]);

    return { transactions, loading, error, refetch: fetchTransactions };
}
