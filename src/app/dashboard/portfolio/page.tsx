'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAccount } from 'wagmi';
import { usePortfolio } from '@/hooks/usePortfolio';
import axios from 'axios';
import type { ChartDataPoint } from '@/lib/types';

export default function PortfolioPage() {
    const { address } = useAccount();
    const { summary, assets, loading: loadingPortfolio } = usePortfolio(address);
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [loadingChart, setLoadingChart] = useState(true);
    const [timeframe, setTimeframe] = useState('1Y');

    const daysMap: Record<string, number> = {
        '1D': 1,
        '1W': 7,
        '1M': 30,
        '1Y': 365,
        'ALL': 1825,
    };

    useEffect(() => {
        const fetchChart = async () => {
            setLoadingChart(true);
            try {
                const response = await axios.get('/api/portfolio/chart', {
                    params: {
                        coinId: 'ethereum',
                        days: daysMap[timeframe] || 365,
                    },
                });
                setChartData(response.data.data || []);
            } catch {
                console.error('Failed to fetch chart data');
            } finally {
                setLoadingChart(false);
            }
        };
        fetchChart();
    }, [timeframe]);

    const totalBalance = summary?.totalBalanceUsd || 0;
    const balanceChange = summary?.balanceChange24hUsd || 0;
    const balanceChangePct = summary?.balanceChange24hPct || 0;

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>Portfolio</h1>
                    <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Detailed breakdown of your digital assets.</p>
                </div>
                <div className="flex gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-lg w-fit">
                    {['1D', '1W', '1M', '1Y', 'ALL'].map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`px-4 py-1 text-sm font-medium rounded-md transition-colors ${tf === timeframe ? 'bg-white dark:bg-[#2a221d] shadow-sm text-primary' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                            style={{ color: tf === timeframe ? 'var(--primary)' : 'var(--text-secondary)' }}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </header>

            {/* Main Chart */}
            <div className="rounded-2xl p-6 h-[400px]" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                <div className="mb-6">
                    <h2 className="text-4xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                        ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h2>
                    <p className={`flex items-center gap-1 font-medium mt-1 ${balanceChangePct >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <span className="material-symbols-outlined text-sm">{balanceChangePct >= 0 ? 'trending_up' : 'trending_down'}</span>
                        {balanceChangePct >= 0 ? '+' : ''}${Math.abs(balanceChange).toLocaleString(undefined, { minimumFractionDigits: 2 })} ({balanceChangePct >= 0 ? '+' : ''}{balanceChangePct.toFixed(2)}%)
                    </p>
                </div>
                <div className="h-[250px] w-full mt-4">
                    {loadingChart ? (
                        <div className="h-full w-full flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)', borderRadius: '12px', color: 'var(--text-primary)' }}
                                    itemStyle={{ color: 'var(--color-primary)' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Asset Allocation Table */}
            <div className="rounded-2xl p-0 overflow-hidden" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                    <h2 className="text-xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>Assets</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr style={{ backgroundColor: 'var(--bg)', color: 'var(--text-secondary)' }} className="text-sm">
                                <th className="p-4 font-medium">Asset</th>
                                <th className="p-4 font-medium text-right">Balance</th>
                                <th className="p-4 font-medium text-right">Price</th>
                                <th className="p-4 font-medium text-right">Value</th>
                                <th className="p-4 font-medium text-right">24h Change</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5 dark:divide-white/5">
                            {loadingPortfolio ? (
                                Array(4).fill(0).map((_, idx) => (
                                    <tr key={idx}>
                                        <td className="p-4"><div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div></td>
                                        <td className="p-4 text-right"><div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto"></div></td>
                                        <td className="p-4 text-right"><div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto"></div></td>
                                        <td className="p-4 text-right"><div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto"></div></td>
                                        <td className="p-4 text-right"><div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : (
                                assets.map((asset) => (
                                    <tr key={asset.symbol} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={asset.icon} alt={asset.name} className="w-8 h-8 rounded-full bg-white p-[2px]" />
                                                <div>
                                                    <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{asset.name}</p>
                                                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{asset.symbol}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{asset.balance}</p>
                                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{asset.symbol}</p>
                                        </td>
                                        <td className="p-4 text-right font-medium" style={{ color: 'var(--text-primary)' }}>
                                            ${(asset.priceUsd || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="p-4 text-right font-medium" style={{ color: 'var(--text-primary)' }}>
                                            ${(asset.valueUsd || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className={`inline-flex items-center gap-1 font-bold ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
