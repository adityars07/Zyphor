'use client';

import React from 'react';

interface PortfolioCardProps {
    title: string;
    value: string;
    change: number;
    icon: string;
    trend: 'up' | 'down' | 'neutral';
}

export default function PortfolioCard({ title, value, change, icon, trend }: PortfolioCardProps) {
    const isUp = trend === 'up';

    return (
        <div
            className="p-6 rounded-2xl transition-all hover:shadow-lg"
            style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">{icon}</span>
                    </div>
                    <h3 className="font-medium text-sm" style={{ color: 'var(--text-secondary)' }}>{title}</h3>
                </div>
            </div>

            <div className="flex items-baseline gap-3">
                <h2 className="text-3xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>{value}</h2>
                <span className={`flex items-center text-sm font-bold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                    <span className="material-symbols-outlined text-sm">
                        {isUp ? 'trending_up' : 'trending_down'}
                    </span>
                    {Math.abs(change)}%
                </span>
            </div>
        </div>
    );
}
