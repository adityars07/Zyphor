'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
    return (
        <section id="cta" className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[1200px] mx-auto rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden"
                style={{ backgroundColor: 'var(--section-alt-bg)' }}
            >
                {/* Animated gradient background */}
                <div
                    className="absolute inset-0 opacity-20 animate-gradient-shift"
                    style={{
                        backgroundImage: "linear-gradient(135deg, #e27228, #6F4CFF, #059669, #e27228)",
                        backgroundSize: "400% 400%",
                    }}
                />

                {/* Dot pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#e27228 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

                {/* Floating orbs */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-float pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-custom/15 rounded-full blur-2xl animate-float-slow pointer-events-none" />
                <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-emerald-custom/15 rounded-full blur-xl animate-float-slower pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-primary text-sm font-bold mb-8 backdrop-blur-sm">
                            🚀 Get started in 30 seconds
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
                    >
                        Start your Web3 journey
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-white/70 text-lg mb-10 leading-relaxed"
                    >
                        Join millions of users worldwide and take full control of your financial future today.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:-translate-y-0.5 active:scale-95">
                            Download Now
                        </button>
                        <button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all hover:-translate-y-0.5 active:scale-95">
                            Read Documentation
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default CTA;
