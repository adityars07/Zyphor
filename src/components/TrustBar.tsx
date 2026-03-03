'use client';

import React from 'react';
import { motion } from 'framer-motion';

const chains = ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Solana', 'Binance', 'Avalanche'];

const stats = [
    { value: '$50B+', label: 'Transaction Volume' },
    { value: '50+', label: 'Chains Supported' },
    { value: '99.9%', label: 'Uptime' },
];

const TrustBar = () => {
    return (
        <section className="bg-background-dark py-16 overflow-hidden relative border-t border-white/5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-[1200px] mx-auto px-6 mb-10 text-center relative z-10"
            >
                <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-2">Trusted Ecosystem</p>
                <h2 className="text-white font-display text-2xl md:text-3xl font-bold">Powering the next generation of finance</h2>
            </motion.div>

            {/* Marquee */}
            <div className="marquee-container w-full overflow-hidden flex relative z-10 py-6">
                <div className="animate-scroll flex items-center whitespace-nowrap gap-16 min-w-full">
                    {[1, 2].map((set) => (
                        <div key={set} className="flex items-center gap-16 pl-16 first:pl-0">
                            {chains.map((chain) => (
                                <span key={`${set}-${chain}`} className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-3 hover:opacity-100 transition-opacity cursor-default">
                                    <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm shadow-primary/50" />
                                    {chain}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-[1200px] mx-auto px-6 mt-12 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-12 md:gap-20 relative z-10"
            >
                {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                        <p className="text-3xl md:text-4xl font-extrabold text-white font-display">{stat.value}</p>
                        <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default TrustBar;
