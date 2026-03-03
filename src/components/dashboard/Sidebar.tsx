'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const sidebarLinks = [
    { name: 'Overview', href: '/dashboard', icon: 'grid_view' },
    { name: 'Assets', href: '/dashboard/portfolio', icon: 'account_balance_wallet' },
    { name: 'Swap', href: '/dashboard/swap', icon: 'swap_horiz' },
    { name: 'NFTs', href: '/dashboard/nfts', icon: 'token' },
    { name: 'Settings', href: '/dashboard/settings', icon: 'settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed top-0 left-0 w-64 h-screen border-r hidden md:flex flex-col z-40 transition-colors"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>

            {/* Brand logo */}
            <div className="h-20 flex items-center px-8 border-b" style={{ borderColor: 'var(--border)' }}>
                <Link href="/" className="flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                    <div className="size-8 text-primary">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="font-display text-xl font-bold tracking-tight">Zyphor</h2>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? 'text-primary bg-primary/10'
                                : 'hover:bg-black/5 dark:hover:bg-white/5'
                                }`}
                            style={{ color: isActive ? '' : 'var(--text-secondary)' }}
                        >
                            <span className={`material-symbols-outlined ${isActive ? 'text-primary' : ''}`}>
                                {link.icon}
                            </span>
                            {link.name}

                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20 pointer-events-none"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Area inside sidebar */}
            <div className="p-6 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="rounded-xl p-4 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                    <p className="text-xs font-bold text-primary mb-1">Zyphor Pro</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Unlock advanced analytics and zero-fee swaps.</p>
                    <button className="mt-3 w-full rounded-lg bg-primary text-white text-xs font-bold py-2 hover:bg-primary-dark transition-colors">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </aside>
    );
}
