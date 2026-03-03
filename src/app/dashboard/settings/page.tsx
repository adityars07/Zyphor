'use client';

import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useTheme } from '@/components/ThemeProvider';

export default function SettingsPage() {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
                <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Manage your account preferences and connected wallets.</p>
            </header>

            <div className="space-y-6">
                {/* Wallet Section */}
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                    <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                        <h2 className="text-xl font-bold font-display flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                            <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                            Connected Wallet
                        </h2>
                    </div>
                    <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Address</p>
                            <p className="font-mono bg-black/5 dark:bg-white/5 py-2 px-4 rounded-lg text-sm" style={{ color: 'var(--text-primary)' }}>
                                {address || 'Not connected'}
                            </p>
                        </div>
                        <button
                            onClick={() => disconnect()}
                            className="px-6 py-2 rounded-xl text-red-500 font-bold hover:bg-red-500/10 transition-colors border border-red-500/20"
                        >
                            Disconnect
                        </button>
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                    <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                        <h2 className="text-xl font-bold font-display flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                            <span className="material-symbols-outlined text-primary">tune</span>
                            Preferences
                        </h2>
                    </div>

                    <div className="divide-y divide-black/5 dark:divide-white/5">

                        {/* Theme Toggle Row */}
                        <div className="p-6 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <div>
                                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Appearance</p>
                                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Toggle between light and dark mode</p>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium border"
                                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                            >
                                <span className="material-symbols-outlined text-lg">
                                    {theme === 'dark' ? 'dark_mode' : 'light_mode'}
                                </span>
                                {theme === 'dark' ? 'Dark' : 'Light'} Mode
                            </button>
                        </div>

                        {/* Currency Row */}
                        <div className="p-6 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <div>
                                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Native Currency</p>
                                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Display fiat values in this currency</p>
                            </div>
                            <select
                                className="px-4 py-2 rounded-xl font-medium border outline-none cursor-pointer"
                                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                            >
                                <option value="USD">USD - United States Dollar</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="GBP">GBP - British Pound</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* Security Section */}
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                    <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                        <h2 className="text-xl font-bold font-display flex items-center gap-2 text-red-500">
                            <span className="material-symbols-outlined">security</span>
                            Security
                        </h2>
                    </div>
                    <div className="p-6">
                        <button className="flex items-center gap-2 text-red-500 font-bold hover:underline transition-all">
                            <span className="material-symbols-outlined text-[20px]">delete_forever</span>
                            Clear App Cache and Data
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
