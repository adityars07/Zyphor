'use client';

import React from 'react';

interface TransactionItemProps {
    type: string;
    asset: string;
    amount: number;
    valueUsd: number;
    timestamp: string;
    status: string;
    address?: string;
    details?: string;
}

export default function TransactionItem({
    type, asset, amount, valueUsd, timestamp, status, address, details
}: TransactionItemProps) {

    const getIcon = () => {
        switch (type) {
            case 'receive': return { icon: 'call_received', color: 'text-green-500', bg: 'bg-green-500/10' };
            case 'send': return { icon: 'made', color: 'text-blue-500', bg: 'bg-blue-500/10' };
            case 'swap': return { icon: 'swap_horiz', color: 'text-purple-500', bg: 'bg-purple-500/10' };
            default: return { icon: 'receipt_long', color: 'text-gray-500', bg: 'bg-gray-500/10' };
        }
    };

    const { icon, color, bg } = getIcon();
    const isReceive = type === 'receive';

    const date = new Date(timestamp);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
    }).format(date);

    return (
        <div className="flex items-center justify-between p-4 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/5 dark:hover:border-white/5">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bg}`}>
                    <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                </div>

                <div>
                    <h4 className="font-bold capitalize" style={{ color: 'var(--text-primary)' }}>{type} {asset}</h4>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                        {status === 'completed' ? formattedDate : status}
                    </p>
                </div>
            </div>

            <div className="text-right">
                <p className={`font-bold ${isReceive ? 'text-green-500' : ''}`} style={{ color: !isReceive ? 'var(--text-primary)' : '' }}>
                    {isReceive ? '+' : '-'}{amount} {asset}
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    ${valueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>
        </div>
    );
}
