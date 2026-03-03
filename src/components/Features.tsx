'use client';

import React from 'react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: 'currency_exchange',
        title: 'Swap Tokens',
        desc: 'Instantly swap thousands of tokens across multiple chains with the best rates and lowest slippage automatically.',
        color: 'bg-blue-50 text-blue-600',
        colorDark: 'bg-blue-500/10 text-blue-400',
    },
    {
        icon: 'collections',
        title: 'NFT Management',
        desc: 'View, manage, and showcase your NFT collection in a beautiful gallery. Support for audio and video collectibles included.',
        color: 'bg-purple-50 text-purple-600',
        colorDark: 'bg-purple-500/10 text-purple-400',
    },
    {
        icon: 'savings',
        title: 'Staking Rewards',
        desc: 'Earn passive income by staking your assets directly from your wallet. One-click staking for ETH, SOL, and more.',
        color: 'bg-green-50 text-green-600',
        colorDark: 'bg-green-500/10 text-green-400',
    },
    {
        icon: 'security',
        title: 'Vault Security',
        desc: 'Industry-leading security protocols including biometrics, multi-party computation, and hardware wallet support.',
        color: 'bg-orange-50 text-orange-600',
        colorDark: 'bg-orange-500/10 text-orange-400',
    },
    {
        icon: 'public',
        title: 'Multi-Chain Support',
        desc: 'Seamlessly connect to over 50+ blockchain networks without manual configuration. Your bridge to the decentralized web.',
        color: 'bg-pink-50 text-pink-600',
        colorDark: 'bg-pink-500/10 text-pink-400',
    },
    {
        icon: 'monitoring',
        title: 'Portfolio Analytics',
        desc: 'Track your net worth in real-time with comprehensive charts, P&L analysis, and historical performance data.',
        color: 'bg-teal-50 text-teal-600',
        colorDark: 'bg-teal-500/10 text-teal-400',
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.08,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    }),
};

const Features = () => {
    return (
        <section id="features" className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16"
                >
                    <div className="max-w-2xl">
                        <h2 className="font-display font-bold text-5xl md:text-[56px] leading-[1.1] mb-6" style={{ color: 'var(--text-primary)' }}>
                            Everything you need in <span className="text-primary">Web3</span>
                        </h2>
                        <p className="text-lg leading-relaxed max-w-lg" style={{ color: 'var(--text-secondary)' }}>
                            Securely manage your digital assets with the most trusted self-custodial wallet designed for everyone, everywhere.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 text-primary font-bold text-lg hover:gap-3 transition-all group border-b border-transparent hover:border-primary">
                        Explore all features
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </motion.div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-30px" }}
                            className="group rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 relative overflow-hidden theme-transition"
                            style={{
                                backgroundColor: 'var(--card-bg)',
                                border: '1px solid var(--card-border)',
                            }}
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color} [data-theme=dark]_&:hidden`}>
                                    <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-display font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
                                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
