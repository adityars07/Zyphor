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
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
};

const Hero = () => {
    return (
        <section className="relative flex flex-col items-center justify-center text-center gap-8 mb-20 pt-32 pb-10 overflow-hidden min-h-[90vh]">
            {/* Animated background orbs */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-orange-300/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-purple-custom/10 to-blue-400/10 rounded-full blur-[100px] animate-float-slow" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-primary/5 to-transparent rounded-full blur-[80px] animate-pulse-glow" />
            </div>

            {/* Dot pattern overlay */}
            <div className="absolute inset-0 dot-pattern opacity-30 -z-10 pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center gap-8 px-4"
            >
                {/* Badge */}
                <motion.div variants={itemVariants}>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                        Now live on 50+ chains
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[0.9] tracking-tight"
                    style={{ color: 'var(--hero-heading)' }}
                >
                    YOUR KEYS.<br />
                    <span className="gradient-text">YOUR CRYPTO.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="font-sans text-lg md:text-xl max-w-2xl font-medium leading-relaxed"
                    style={{ color: 'var(--hero-sub)' }}
                >
                    The world&apos;s most trusted self-custodial wallet for Web3. Secure, global,
                    and ready for the future of decentralized finance.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button className="group flex items-center gap-2 justify-center rounded-full bg-primary hover:bg-primary-dark text-white text-base font-bold px-8 py-4 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-95">
                        <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">download</span>
                        Download Extension
                    </button>
                    <button
                        className="group flex items-center gap-2 justify-center rounded-full text-base font-bold px-8 py-4 transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95"
                        style={{
                            backgroundColor: 'var(--card-bg)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border)',
                        }}
                    >
                        Explore Features
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </motion.div>

                {/* Animated Stats */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 pt-8"
                    style={{ borderTop: '1px solid var(--border)' }}
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl md:text-4xl font-extrabold font-display" style={{ color: 'var(--text-primary)' }}>
                                <AnimatedCounter target={stat.target} suffix={stat.suffix} prefix={stat.prefix || ''} />
                            </p>
                            <p className="text-sm font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
