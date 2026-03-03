'use client';

import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    }),
};

const BentoGrid = () => {
    return (
        <section id="bento" className="relative mb-24 px-4 md:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
            <div className="absolute inset-0 dot-pattern opacity-20 -z-10 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(280px,auto)]">
                {/* 1. Large Purple Card (Mobile Mockup) */}
                <motion.div
                    custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    className="md:col-span-7 bg-purple-custom rounded-2xl p-8 md:p-12 relative overflow-hidden group hover:shadow-2xl hover:shadow-purple-custom/20 transition-all duration-500"
                >
                    <div className="relative z-10 max-w-sm">
                        <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-xs font-bold mb-4 backdrop-blur-sm">MOBILE APP</span>
                        <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">Your assets, anywhere you go.</h3>
                        <p className="text-purple-100/90 text-lg">Manage your digital assets with complete freedom on iOS and Android.</p>
                    </div>
                    <div className="absolute right-[-20px] bottom-[-40px] md:right-0 md:bottom-[-20px] w-64 md:w-80 aspect-[9/16] bg-slate-900 rounded-[2.5rem] border-8 border-slate-800 shadow-2xl rotate-[-12deg] group-hover:rotate-[-8deg] group-hover:translate-y-[-10px] transition-transform duration-500 overflow-hidden" style={{ backgroundImage: "linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)" }}>
                        <div className="p-4 space-y-3">
                            <div className="w-full h-8 bg-white/10 rounded-lg"></div>
                            <div className="flex gap-2">
                                <div className="w-1/2 h-24 bg-primary/20 rounded-xl"></div>
                                <div className="w-1/2 h-24 bg-emerald-custom/20 rounded-xl"></div>
                            </div>
                            <div className="w-full h-40 bg-white/5 rounded-xl"></div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. Navy Card (Globe) */}
                <motion.div
                    custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    className="md:col-span-5 bg-navy-custom rounded-2xl p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col justify-between text-white"
                >
                    <div className="relative z-10">
                        <span className="material-symbols-outlined text-4xl mb-4 text-blue-400">public</span>
                        <h3 className="font-display text-3xl font-bold mb-2">Global Access</h3>
                        <p className="text-blue-100/80">Connect to Web3 from over 190 countries worldwide.</p>
                    </div>
                    <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.5), transparent 70%)" }}></div>
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full border border-white/10 opacity-60 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                        <div className="w-[90%] h-[90%] rounded-full border border-white/10 animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute w-[120%] h-[1px] bg-white/10 rotate-45"></div>
                        <div className="absolute w-[120%] h-[1px] bg-white/10 -rotate-45"></div>
                    </div>
                </motion.div>

                {/* 3. Emerald Card (Multi-chain) */}
                <motion.div
                    custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    className="md:col-span-4 bg-emerald-custom rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all"
                >
                    <div className="z-10">
                        <h3 className="font-display text-2xl font-bold text-white mb-2">Multi-Chain</h3>
                        <p className="text-emerald-100 text-sm">Seamlessly bridge across networks.</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-8 z-10">
                        {['Ethereum', 'Polygon', 'BNB Chain', 'Arbitrum'].map((chain, i) => (
                            <div key={chain} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold border border-white/10 group-hover:scale-105 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>{chain}</div>
                        ))}
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-emerald-400/30 rounded-full blur-2xl"></div>
                </motion.div>

                {/* 4. Orange Card (Credit Card) */}
                <motion.div
                    custom={3} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    className="md:col-span-4 bg-primary rounded-2xl p-8 relative overflow-hidden flex flex-col justify-end min-h-[280px] group hover:shadow-xl hover:shadow-orange-500/20 transition-all"
                >
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-32 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-xl border border-white/20 shadow-lg rotate-[-12deg] group-hover:rotate-[-5deg] group-hover:scale-105 transition-all duration-500 z-0">
                        <div className="absolute bottom-4 left-4 w-8 h-5 bg-yellow-400/80 rounded-sm"></div>
                        <div className="absolute top-4 right-4 text-white/40 text-xs font-mono">**** 4242</div>
                    </div>
                    <div className="relative z-10 mt-auto">
                        <h3 className="font-display text-2xl font-bold text-white mb-1">Buy Crypto</h3>
                        <p className="text-orange-100 text-sm">Purchase instantly with your card.</p>
                    </div>
                </motion.div>

                {/* 5. Charcoal Card (Browser Extension) */}
                <motion.div
                    custom={4} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    className="md:col-span-4 bg-charcoal-custom rounded-2xl p-6 relative overflow-hidden group hover:shadow-xl transition-all"
                >
                    <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-6 opacity-50">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-grow flex items-center justify-center">
                            <span className="material-symbols-outlined text-6xl text-slate-300 group-hover:text-primary transition-colors duration-300">extension</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-display text-2xl font-bold text-white">Browser Ready</h3>
                            <p className="text-slate-400 text-sm">Connect to thousands of dApps.</p>
                        </div>
                    </div>
                </motion.div>

                {/* 6. Dark Purple Card (Stats) */}
                <motion.div
                    custom={5} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    className="md:col-span-5 bg-dark-purple-custom rounded-2xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:shadow-xl transition-all"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-800/50 via-dark-purple-custom to-dark-purple-custom"></div>
                    <div className="relative z-10">
                        <h3 className="font-display text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-purple-200 to-purple-500 mb-2">10M+</h3>
                        <p className="text-purple-200 font-medium text-lg">Active Users Worldwide</p>
                        <p className="text-purple-400/60 text-sm mt-2">Trusting us with their journey</p>
                    </div>
                </motion.div>

                {/* 7. Community Card */}
                <motion.div
                    custom={6} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    className="md:col-span-7 rounded-2xl p-8 md:p-12 relative overflow-hidden group hover:shadow-xl transition-all theme-transition"
                    style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                >
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div>
                            <h3 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Community Driven</h3>
                            <p className="max-w-md" style={{ color: 'var(--text-secondary)' }}>Join a thriving ecosystem of developers, creators, and explorers building the future of the internet.</p>
                        </div>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex -space-x-3">
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600"></div>
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-emerald-600"></div>
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-rose-600"></div>
                                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>+2k</div>
                            </div>
                            <button className="text-primary font-bold text-sm hover:underline underline-offset-4 transition-all">Join Discord →</button>
                        </div>
                    </div>
                    <div className="absolute right-[-50px] top-[-50px] w-64 h-64 bg-gradient-to-bl from-pink-200 to-orange-100 rounded-full blur-3xl opacity-60 pointer-events-none group-hover:opacity-80 transition-opacity duration-500"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default BentoGrid;
