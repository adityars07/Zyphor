'use client';

import React from 'react';
import { useAccount, useBalance } from 'wagmi';
import PortfolioCard from '@/components/dashboard/PortfolioCard';
import TransactionItem from '@/components/dashboard/TransactionItem';
import Link from 'next/link';
import { formatUnits } from 'viem';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useTransactions } from '@/hooks/useTransactions';
import { useTokenPrices } from '@/hooks/useTokenPrices';

export default function DashboardPage() {
    const { address } = useAccount();
    const { data: ethBalance } = useBalance({ address });
    const { prices } = useTokenPrices(['ethereum']);
    const { summary, assets, loading: loadingAssets } = usePortfolio(address);
    const { transactions, loading: loadingTx } = useTransactions(address, 4);

    const ethPrice = prices?.ethereum?.usd || 3450.20;
    const ethChange = prices?.ethereum?.usd_24h_change || 2.4;

    // Calculate total balance
    const ethValue = Number(ethBalance?.value ? formatUnits(ethBalance.value, ethBalance.decimals) : 0) * ethPrice;
    const otherAssetsValue = assets.reduce((acc, asset) => acc + (asset.valueUsd || 0), 0);
    const totalBalance = summary?.totalBalanceUsd || (ethValue + otherAssetsValue);

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>Overview</h1>
                <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Welcome back! Here's your portfolio at a glance.</p>
            </header>

            {/* Top Value Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PortfolioCard
                    title="Total Balance"
                    value={`$${totalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                    change={summary?.balanceChange24hPct || ethChange}
                    icon="account_balance_wallet"
                    trend={(summary?.balanceChange24hPct || ethChange) >= 0 ? "up" : "down"}
                />
                <PortfolioCard
                    title="Native ETH"
                    value={`${ethBalance ? Number(formatUnits(ethBalance.value, ethBalance.decimals)).toFixed(4) : '0.0000'} ${ethBalance?.symbol || 'ETH'}`}
                    change={ethChange}
                    icon="currency_exchange"
                    trend={ethChange >= 0 ? "up" : "down"}
                />
                <PortfolioCard
                    title="Active Positions"
                    value={String(assets.length || 4)}
                    change={summary?.balanceChange24hPct || -1.2}
                    icon="pie_chart"
                    trend={(summary?.balanceChange24hPct || -1.2) >= 0 ? "up" : "down"}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Assets List */}
                <div className="lg:col-span-2 rounded-2xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>Your Assets</h2>
                        <Link href="/dashboard/portfolio" className="text-primary text-sm font-bold hover:underline">View All</Link>
                    </div>

                    <div className="space-y-4">
                        {(loadingAssets ? Array(3).fill(0) : assets.slice(0, 3)).map((asset, idx) => (
                            <div key={asset?.symbol || idx} className={`flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-colors ${loadingAssets ? 'animate-pulse' : ''}`}>
                                <div className="flex items-center gap-4">
                                    {loadingAssets ? (
                                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                    ) : (
                                        <img src={asset.icon} alt={asset.name} className="w-10 h-10 rounded-full bg-white p-1" />
                                    )}
                                    <div>
                                        {loadingAssets ? (
                                            <>
                                                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                                <div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded"></div>
                                            </>
                                        ) : (
                                            <>
                                                <h4 className="font-bold" style={{ color: 'var(--text-primary)' }}>{asset.name}</h4>
                                                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                                                    {asset.balance} {asset.symbol}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    {loadingAssets ? (
                                        <>
                                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2 ml-auto"></div>
                                            <div className="h-3 w-12 bg-gray-100 dark:bg-gray-800 rounded ml-auto"></div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="font-bold" style={{ color: 'var(--text-primary)' }}>${(asset.valueUsd || 0).toLocaleString()}</p>
                                            <p className={`text-sm mt-1 font-medium ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="lg:col-span-1 border-l pl-0 lg:pl-8 mt-8 lg:mt-0" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>History</h2>
                    </div>

                    <div className="space-y-2">
                        {loadingTx ? (
                            Array(4).fill(0).map((_, idx) => (
                                <div key={idx} className="h-16 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                            ))
                        ) : (
                            transactions.map((tx) => (
                                <TransactionItem key={tx.id} {...tx} />
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
