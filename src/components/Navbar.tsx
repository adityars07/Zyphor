'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';

const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Features', href: '#features' },
    { label: 'Security', href: '#bento' },
    { label: 'Developers', href: '#developers' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { isConnected } = useAccount();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 lg:px-16 transition-all duration-500 ${scrolled
                    ? 'backdrop-blur-xl shadow-lg shadow-black/5 border-b'
                    : 'border-b border-transparent'
                    }`}
                style={{
                    backgroundColor: scrolled ? 'var(--navbar-bg)' : 'transparent',
                    borderColor: scrolled ? 'var(--border)' : 'transparent',
                }}
            >
                <a href="#" className="flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                    <div className="size-8 text-primary">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="font-display text-xl font-bold tracking-tight">Zyphor</h2>
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            className="text-sm font-semibold hover:text-primary transition-colors relative group"
                            style={{ color: 'var(--text-secondary)' }}
                            href={link.href}
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                        style={{
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-primary)',
                        }}
                        aria-label="Toggle theme"
                    >
                        <span className="material-symbols-outlined text-lg">
                            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    {/* RainbowKit ConnectButton */}
                    <div className="hidden md:block">
                        <ConnectButton
                            showBalance={false}
                            chainStatus="icon"
                            accountStatus="address"
                        />
                    </div>

                    {/* Dashboard Link */}
                    <Link href="/dashboard" className="hidden md:flex items-center justify-center rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-bold px-5 py-2 transition-all hover:scale-105 active:scale-95">
                        Dashboard
                    </Link>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-0.5 origin-center"
                            style={{ backgroundColor: 'var(--text-primary)' }}
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                            className="block w-6 h-0.5"
                            style={{ backgroundColor: 'var(--text-primary)' }}
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-0.5 origin-center"
                            style={{ backgroundColor: 'var(--text-primary)' }}
                        />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-[72px] left-0 right-0 z-40 backdrop-blur-xl shadow-xl overflow-hidden md:hidden"
                        style={{ backgroundColor: 'var(--navbar-bg)', borderBottom: '1px solid var(--border)' }}
                    >
                        <nav className="flex flex-col p-6 gap-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="text-lg font-semibold hover:text-primary py-3 px-4 rounded-xl hover:bg-primary/5 transition-all"
                                    style={{ color: 'var(--text-primary)' }}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <div className="mt-4 flex flex-col gap-3">
                                <ConnectButton.Custom>
                                    {({
                                        account,
                                        chain,
                                        openAccountModal,
                                        openChainModal,
                                        openConnectModal,
                                        mounted,
                                    }) => {
                                        const ready = mounted;
                                        const connected = ready && account && chain;
                                        return (
                                            <div
                                                {...(!ready && {
                                                    'aria-hidden': true,
                                                    style: {
                                                        opacity: 0,
                                                        pointerEvents: 'none',
                                                        userSelect: 'none',
                                                    },
                                                })}
                                            >
                                                {(() => {
                                                    if (!connected) {
                                                        return (
                                                            <button onClick={openConnectModal} type="button" className="w-full rounded-full bg-primary text-white font-bold py-4 text-lg hover:bg-primary-dark transition-all">
                                                                Connect Wallet
                                                            </button>
                                                        );
                                                    }
                                                    if (chain.unsupported) {
                                                        return (
                                                            <button onClick={openChainModal} type="button" className="w-full rounded-full bg-red-500 text-white font-bold py-4 text-lg transition-all">
                                                                Wrong network
                                                            </button>
                                                        );
                                                    }
                                                    return (
                                                        <button onClick={openAccountModal} type="button" className="w-full rounded-full bg-charcoal text-white font-bold py-4 text-lg border border-white/10 transition-all">
                                                            {account.displayName}
                                                        </button>
                                                    );
                                                })()}
                                            </div>
                                        );
                                    }}
                                </ConnectButton.Custom>
                                {isConnected && (
                                    <Link href="/dashboard" className="w-full rounded-full bg-primary/10 border border-primary text-primary font-bold py-4 text-lg hover:bg-primary/20 transition-all text-center">
                                        Go to Dashboard
                                    </Link>
                                )}
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
