'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const stats = [
    { label: 'Active Users', target: 10, suffix: 'M+' },
    { label: 'Total Volume', prefix: '$', target: 50, suffix: 'B+' },
    { label: 'Chains Supported', target: 50, suffix: '+' },
];

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 2000;
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, duration / steps);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
};

const Hero = () => {
    return (
        <section className="relative flex flex-col items-center justify-center text-center overflow-hidden min-h-screen">
            {/* === ANIMATED BACKGROUND === */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                {/* Large gradient orbs */}
                <div className="absolute top-[15%] left-[10%] w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-orange-400/10 rounded-full blur-[150px] animate-float" />
                <div className="absolute top-[30%] right-[5%] w-[500px] h-[500px] bg-gradient-to-tl from-purple-custom/15 to-blue-500/10 rounded-full blur-[130px] animate-float-slow" />
                <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[400px] bg-gradient-to-t from-primary/10 to-amber-500/5 rounded-full blur-[120px] animate-pulse-glow" />

                {/* Radial spotlight behind heading */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-radial from-primary/8 via-transparent to-transparent rounded-full blur-[60px]" />
            </div>

            {/* Dot pattern overlay */}
            <div className="absolute inset-0 dot-pattern opacity-20 -z-10 pointer-events-none" />

            {/* Grid lines overlay (subtle) */}
            <div
                className="absolute inset-0 -z-10 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage:
                        'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />

            {/* === MAIN CONTENT === */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative flex flex-col items-center gap-6 px-6 pt-32 pb-20 md:pt-40 md:pb-24 max-w-6xl mx-auto"
            >
                {/* Badge */}
                <motion.div variants={itemVariants}>
                    <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide"
                        style={{
                            background: 'linear-gradient(135deg, rgba(226,114,40,0.12), rgba(226,114,40,0.05))',
                            border: '1px solid rgba(226,114,40,0.2)',
                            color: '#e27228',
                        }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                        Now live on 50+ chains
                        <span className="material-symbols-outlined text-[16px] opacity-60">arrow_outward</span>
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight"
                    style={{ color: 'var(--hero-heading)' }}
                >
                    YOUR KEYS.
                    <br />
                    <span className="gradient-text">YOUR CRYPTO.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="font-sans text-base sm:text-lg md:text-xl max-w-xl font-medium leading-relaxed mt-2"
                    style={{ color: 'var(--hero-sub)' }}
                >
                    The world&apos;s most trusted self-custodial wallet for Web3.
                    <br className="hidden sm:block" />
                    Secure, global, and ready for the future of DeFi.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button className="group relative flex items-center gap-2.5 justify-center rounded-full bg-primary hover:bg-primary-dark text-white text-base font-bold px-8 py-4 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 overflow-hidden">
                        {/* Shimmer effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform relative z-10">download</span>
                        <span className="relative z-10">Download Extension</span>
                    </button>
                    <button
                        className="group flex items-center gap-2.5 justify-center rounded-full text-base font-bold px-8 py-4 transition-all duration-300 hover:-translate-y-1 active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, var(--card-bg), var(--surface))',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border)',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                        }}
                    >
                        Explore Features
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform text-primary">arrow_forward</span>
                    </button>
                </motion.div>

                {/* Animated Stats */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-8 md:gap-16 mt-14 pt-8 w-full max-w-2xl"
                    style={{ borderTop: '1px solid var(--border)' }}
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center min-w-[100px]">
                            <p className="text-3xl md:text-4xl font-extrabold font-display" style={{ color: 'var(--text-primary)' }}>
                                <AnimatedCounter target={stat.target} suffix={stat.suffix} prefix={stat.prefix || ''} />
                            </p>
                            <p className="text-xs md:text-sm font-medium mt-1.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    variants={itemVariants}
                    className="mt-10 flex flex-col items-center gap-2 opacity-50"
                >
                    <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                        Scroll to explore
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <span className="material-symbols-outlined text-[20px]" style={{ color: 'var(--text-secondary)' }}>expand_more</span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
