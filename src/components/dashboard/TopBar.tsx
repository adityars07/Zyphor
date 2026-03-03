'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTheme } from '../ThemeProvider';

export default function TopBar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header
            className="h-20 border-b flex items-center justify-between px-6 sticky top-0 z-30 transition-colors backdrop-blur-md"
            style={{
                backgroundColor: 'var(--navbar-bg)',
                borderColor: 'var(--border)'
            }}
        >
            <div className="flex items-center gap-4">
                {/* Mobile menu button could go here */}
                <h1 className="text-xl font-display font-bold md:hidden" style={{ color: 'var(--text-primary)' }}>Zyphor</h1>
                <div className="hidden md:flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-400">search</span>
                    <input
                        type="text"
                        placeholder="Search tokens, transactions..."
                        className="bg-transparent border-none outline-none text-sm w-64"
                        style={{ color: 'var(--text-primary)' }}
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-black/5 dark:hover:bg-white/5"
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label="Toggle theme"
                >
                    <span className="material-symbols-outlined text-xl">
                        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>

                {/* Notifications */}
                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-black/5 dark:hover:bg-white/5 relative"
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label="Notifications"
                >
                    <span className="material-symbols-outlined text-xl">notifications</span>
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary border-2 border-white dark:border-[#121212]"></span>
                </button>

                {/* RainbowKit Wallet Connect */}
                <div className="hidden sm:block pl-2 border-l" style={{ borderColor: 'var(--border)' }}>
                    <ConnectButton
                        chainStatus="icon"
                        showBalance={true}
                        accountStatus={{
                            smallScreen: 'avatar',
                            largeScreen: 'full',
                        }}
                    />
                </div>
                <div className="sm:hidden">
                    <ConnectButton showBalance={false} chainStatus="none" accountStatus="avatar" />
                </div>
            </div>
        </header>
    );
}
