'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const footerLinks = {
    Product: ['Wallet', 'Swap', 'Portfolio', 'Bridge', 'Staking'],
    Developers: ['Documentation', 'GitHub', 'APIs & SDKs', 'Grants', 'Bug Bounty'],
    Company: ['About', 'Careers', 'Press', 'Contact', 'Brand Kit'],
    Community: ['Blog', 'Help Center', 'Status', 'Governance', 'Discord'],
};

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-deep-navy text-white noise-bg">
            <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Newsletter Section */}
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-8 md:p-12 mb-16 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="max-w-md">
                                <h3 className="font-display text-2xl font-bold text-white mb-2">Stay in the loop</h3>
                                <p className="text-gray-400 text-sm">Get the latest updates on features, security, and the Web3 ecosystem delivered to your inbox.</p>
                            </div>
                            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 md:w-64 px-5 py-3 rounded-full bg-white/10 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 whitespace-nowrap"
                                >
                                    {subscribed ? '✓ Subscribed!' : 'Subscribe'}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        {/* Brand Section */}
                        <div className="space-y-8 xl:col-span-1">
                            <div className="flex items-center gap-3">
                                <div className="size-8 text-primary">
                                    <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"></path>
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold tracking-tight text-white font-display">Zyphor</span>
                            </div>
                            <p className="text-base leading-6 text-gray-300 max-w-xs">
                                The self-custodial wallet for the decentralized web. Secure, trusted, and built for everyone.
                            </p>
                            <div className="flex gap-4">
                                {[
                                    { icon: 'flutter_dash', label: 'Twitter' },
                                    { icon: 'forum', label: 'Discord' },
                                    { icon: 'code', label: 'GitHub' },
                                    { icon: 'work', label: 'LinkedIn' },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white/10 hover:border-primary/30 transition-all"
                                        href="#"
                                        aria-label={social.label}
                                    >
                                        <span className="material-symbols-outlined text-lg">{social.icon}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links Grid */}
                        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 md:grid-cols-4">
                            {Object.entries(footerLinks).map(([category, links]) => (
                                <div key={category}>
                                    <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider opacity-80">{category}</h3>
                                    <ul className="mt-6 space-y-3" role="list">
                                        {links.map((link) => (
                                            <li key={link}>
                                                <a className="text-sm leading-6 text-gray-400 hover:text-white hover:underline decoration-primary underline-offset-4 transition-colors" href="#">
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs leading-5 text-gray-400">© {new Date().getFullYear()} Zyphor Inc. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <div className="flex gap-6 text-xs text-gray-400">
                                <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
                                <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
                                <a className="hover:text-white transition-colors" href="#">Cookie Preferences</a>
                            </div>
                            <button
                                onClick={scrollToTop}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white/10 hover:border-primary/30 transition-all hover:scale-110 active:scale-95"
                                aria-label="Back to top"
                            >
                                <span className="material-symbols-outlined text-lg">arrow_upward</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
