'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import axios from 'axios';

// Token metadata map
const TOKENS: Record<string, { symbol: string, name: string, icon: string, address: string, decimals: number }> = {
    ETH: {
        symbol: 'ETH',
        name: 'Ethereum',
        icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        decimals: 18
    },
    USDC: {
        symbol: 'USDC',
        name: 'USD Coin',
        icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // Mainnet USDC
        decimals: 6
    }
};

export default function SwapPage() {
    const { address } = useAccount();
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [fromToken, setFromToken] = useState(TOKENS.ETH);
    const [toToken, setToToken] = useState(TOKENS.USDC);
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch quote from 0x API proxy
    const fetchQuote = useCallback(async (amount: string) => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setQuote(null);
            setToAmount('');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Convert amount to base units (wei)
            const sellAmountBase = (Number(amount) * Math.pow(10, fromToken.decimals)).toString();

            const response = await axios.get('/api/swap/quote', {
                params: {
                    sellToken: fromToken.address,
                    buyToken: toToken.address,
                    sellAmount: sellAmountBase,
                    takerAddress: address || '0x0000000000000000000000000000000000000000'
                }
            });

            const data = response.data;
            setQuote(data);

            // Convert buyAmount back from base units
            const buyAmountFormatted = (Number(data.buyAmount) / Math.pow(10, toToken.decimals)).toFixed(4);
            setToAmount(buyAmountFormatted);
        } catch (err: any) {
            console.error('Swap quote error:', err);
            setError('Failed to get quote. Try a different amount.');
        } finally {
            setLoading(false);
        }
    }, [fromToken, toToken, address]);

    // Debounce effect
    useEffect(() => {
        const timer = setTimeout(() => {
            if (fromAmount) fetchQuote(fromAmount);
        }, 600);
        return () => clearTimeout(timer);
    }, [fromAmount, fetchQuote]);

    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFromAmount(e.target.value);
        if (!e.target.value) setToAmount('');
    };

    const switchTokens = () => {
        setFromToken(toToken);
        setToToken(fromToken);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
    };

    return (
        <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-10">

            <header className="mb-8 text-center">
                <h1 className="text-4xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>Swap</h1>
                <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Exchange tokens instantly with zero hidden fees.</p>
            </header>

            <div className="rounded-3xl p-6 shadow-2xl relative" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>

                {/* Settings / Slippage icon */}
                <div className="absolute top-6 right-6 flex items-center gap-4">
                    <button className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                        1% Slippage <span className="material-symbols-outlined text-[16px]">tune</span>
                    </button>
                </div>

                <div className="mt-8 space-y-2">

                    {/* From Token */}
                    <div className="rounded-2xl p-4 transition-colors" style={{ backgroundColor: 'var(--bg)' }}>
                        <p className="text-sm mb-2 font-medium" style={{ color: 'var(--text-secondary)' }}>You pay</p>
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                placeholder="0.0"
                                value={fromAmount}
                                onChange={handleFromChange}
                                className="text-4xl font-display font-bold bg-transparent border-none outline-none w-1/2"
                                style={{ color: 'var(--text-primary)' }}
                            />
                            <button className="flex items-center gap-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 py-2 px-4 rounded-full transition-colors">
                                <img src={fromToken.icon} alt={fromToken.symbol} className="w-6 h-6 rounded-full bg-white p-0.5" />
                                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{fromToken.symbol}</span>
                                <span className="material-symbols-outlined text-[18px]">expand_more</span>
                            </button>
                        </div>
                        <div className="mt-2 text-sm flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                            <span>{quote ? `$ ${(Number(fromAmount || 0) * Number(quote.price || 0)).toFixed(2)}` : '--'}</span>
                            <p>Balance: 2.45 <button className="text-primary font-bold hover:underline ml-1">Max</button></p>
                        </div>
                    </div>

                    {/* Swap Direction Button */}
                    <div className="relative h-2 flex items-center justify-center z-10 my-2">
                        <button
                            onClick={switchTokens}
                            className="absolute w-12 h-12 rounded-2xl flex items-center justify-center border-4 hover:scale-110 hover:text-primary transition-all shadow-md group border-background"
                            style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                        >
                            <span className="material-symbols-outlined group-hover:rotate-180 transition-transform duration-500">sync_alt</span>
                        </button>
                    </div>

                    {/* To Token */}
                    <div className="rounded-2xl p-4 transition-colors" style={{ backgroundColor: 'var(--bg)' }}>
                        <p className="text-sm mb-2 font-medium" style={{ color: 'var(--text-secondary)' }}>You receive</p>
                        <div className="flex items-center justify-between">
                            <div className="relative w-1/2">
                                <input
                                    type="text"
                                    placeholder="0.0"
                                    value={toAmount}
                                    readOnly
                                    className={`text-4xl font-display font-bold bg-transparent border-none outline-none w-full ${loading ? 'opacity-50' : ''}`}
                                    style={{ color: 'var(--text-primary)' }}
                                />
                                {loading && (
                                    <div className="absolute left-0 bottom-0 h-1 w-full overflow-hidden bg-primary/10 rounded-full">
                                        <div className="h-full w-full bg-primary animate-progress"></div>
                                    </div>
                                )}
                            </div>
                            <button className="flex items-center gap-2 bg-primary text-white hover:bg-primary-dark py-2 px-4 rounded-full transition-colors shadow-lg shadow-primary/20">
                                <img src={toToken.icon} alt={toToken.symbol} className="w-6 h-6 rounded-full bg-white p-0.5" />
                                <span className="font-bold">{toToken.symbol}</span>
                                <span className="material-symbols-outlined text-[18px]">expand_more</span>
                            </button>
                        </div>
                        <div className="mt-2 text-sm flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                            <span>$ {(Number(toAmount || 0) * (toToken.symbol === 'USDC' ? 1 : Number(quote?.price || 0))).toFixed(2)}</span>
                            <p>Balance: 1,540.32</p>
                        </div>
                    </div>

                </div>

                {/* Swap Stats / Review */}
                <AnimatePresence>
                    {(quote || error) && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 overflow-hidden"
                        >
                            <div
                                className="p-4 rounded-xl border space-y-2 text-sm"
                                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                            >
                                {error ? (
                                    <p className="text-red-500 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[16px]">error</span>
                                        {error}
                                    </p>
                                ) : (
                                    <>
                                        <div className="flex justify-between">
                                            <span style={{ color: 'var(--text-secondary)' }}>Rate</span>
                                            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>1 {fromToken.symbol} = {Number(quote.price).toFixed(4)} {toToken.symbol}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span style={{ color: 'var(--text-secondary)' }}>Network Fee</span>
                                            <span className="font-medium flex items-center gap-1 text-yellow-600 dark:text-yellow-500">
                                                <span className="material-symbols-outlined text-[14px]">local_gas_station</span>
                                                ~${(Number(quote.estimatedGas) * Number(quote.gasPrice) / 1e18 * 3500).toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between pt-1 border-t border-white/5 mt-1">
                                            <span style={{ color: 'var(--text-secondary)' }}>Price Impact</span>
                                            <span className="text-green-500">{'< 0.01%'}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    className={`w-full mt-6 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl disabled:opacity-50 disabled:pointer-events-none ${error ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-dark hover:-translate-y-1 shadow-primary/25'} text-white`}
                    disabled={!fromAmount || Number(fromAmount) <= 0 || !!error || loading}
                >
                    {loading ? 'Fetching quote...' : error ? 'Insufficient Liquidity' : fromAmount ? 'Review Swap' : 'Enter an amount'}
                </button>
            </div>

        </div>
    );
}
