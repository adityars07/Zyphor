'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';

const codeLines = [
    { text: "import", color: "#c586c0" },
    { text: " { Zyphor }", color: "#dcdcaa" },
    { text: " from", color: "#c586c0" },
    { text: " '@zyphor/sdk'", color: "#ce9178" },
    { text: ";", color: "#d4d4d4" },
    { text: "\n", color: "" },
    { text: "const", color: "#569cd6" },
    { text: " connect", color: "#dcdcaa" },
    { text: " = ", color: "#d4d4d4" },
    { text: "async", color: "#569cd6" },
    { text: " () ", color: "#9cdcfe" },
    { text: "=>", color: "#569cd6" },
    { text: " {", color: "#9cdcfe" },
    { text: "\n  ", color: "" },
    { text: "try", color: "#569cd6" },
    { text: " {", color: "#9cdcfe" },
    { text: "\n    ", color: "" },
    { text: "// Initialize provider", color: "#6a9955" },
    { text: "\n    ", color: "" },
    { text: "const", color: "#569cd6" },
    { text: " provider", color: "#9cdcfe" },
    { text: " = ", color: "#d4d4d4" },
    { text: "new", color: "#c586c0" },
    { text: " Zyphor", color: "#dcdcaa" },
    { text: "();", color: "#9cdcfe" },
    { text: "\n\n    ", color: "" },
    { text: "// Request accounts", color: "#6a9955" },
    { text: "\n    ", color: "" },
    { text: "const", color: "#569cd6" },
    { text: " accounts", color: "#9cdcfe" },
    { text: " = ", color: "#d4d4d4" },
    { text: "await", color: "#c586c0" },
    { text: " provider.", color: "#9cdcfe" },
    { text: "request", color: "#dcdcaa" },
    { text: "({", color: "#9cdcfe" },
    { text: "\n      ", color: "" },
    { text: "method:", color: "#9cdcfe" },
    { text: " 'eth_requestAccounts'", color: "#ce9178" },
    { text: "\n    ", color: "" },
    { text: "});", color: "#9cdcfe" },
    { text: "\n\n    ", color: "" },
    { text: "return", color: "#569cd6" },
    { text: " accounts[", color: "#9cdcfe" },
    { text: "0", color: "#b5cea8" },
    { text: "];", color: "#9cdcfe" },
    { text: "\n  ", color: "" },
    { text: "}", color: "#9cdcfe" },
    { text: " catch", color: "#569cd6" },
    { text: " (error) {", color: "#9cdcfe" },
    { text: "\n    ", color: "" },
    { text: "console.", color: "#9cdcfe" },
    { text: "error", color: "#dcdcaa" },
    { text: "(", color: "#9cdcfe" },
    { text: "'Connection failed'", color: "#ce9178" },
    { text: ");", color: "#9cdcfe" },
    { text: "\n  ", color: "" },
    { text: "}", color: "#9cdcfe" },
    { text: "\n", color: "" },
    { text: "};", color: "#9cdcfe" },
];

function TypingCode() {
    const [visibleChars, setVisibleChars] = useState(0);
    const ref = useRef<HTMLPreElement>(null);
    const hasAnimated = useRef(false);

    const totalChars = codeLines.reduce((acc, line) => acc + line.text.length, 0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let current = 0;
                    const timer = setInterval(() => {
                        current += 2;
                        if (current >= totalChars) {
                            setVisibleChars(totalChars);
                            clearInterval(timer);
                        } else {
                            setVisibleChars(current);
                        }
                    }, 20);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [totalChars]);

    let charCount = 0;
    return (
        <pre ref={ref} className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
            {codeLines.map((segment, i) => {
                const start = charCount;
                charCount += segment.text.length;
                const visible = Math.max(0, Math.min(segment.text.length, visibleChars - start));
                const text = segment.text.substring(0, visible);
                if (!text) return null;
                return (
                    <span key={i} style={{ color: segment.color || 'inherit' }}>
                        {text}
                    </span>
                );
            })}
            <span className="animate-pulse text-primary">|</span>
        </pre>
    );
}

const DeveloperAPI = () => {
    const { address, isConnected } = useAccount();
    const [isRunning, setIsRunning] = useState(false);
    const [showTerminal, setShowTerminal] = useState(false);
    const [outputs, setOutputs] = useState<string[]>([]);

    const runCode = () => {
        setIsRunning(true);
        setOutputs(["Initializing Zyphor SDK...", "Requesting accounts..."]);

        setTimeout(() => {
            if (isConnected && address) {
                setOutputs(prev => [...prev, `Connected: ${address.substring(0, 6)}...${address.substring(address.length - 4)}`, "Ready to build!"]);
            } else {
                setOutputs(prev => [...prev, "Error: Wallet not connected", "Please connect your wallet to test the SDK."]);
            }
            setIsRunning(false);
            setShowTerminal(true);
        }, 1500);
    };

    return (
        <section id="developers" className="relative w-full bg-charcoal py-20 lg:py-32 px-6 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]"></div>

            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-8 relative z-10"
                    >
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            v2.0 SDK Live
                        </div>

                        <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl font-display">
                            Build on Web3&apos;s most <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">trusted platform</span>
                        </h2>

                        <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                            Join the ecosystem of over 50,000 decentralized applications. Access open source tools, comprehensive documentation, and a global community.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-white transition-all hover:bg-primary-dark hover:scale-105 active:scale-95 shadow-lg shadow-primary/25">
                                View Docs
                            </button>
                            <button className="flex h-12 items-center justify-center gap-2 rounded-full bg-white/10 px-8 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105 active:scale-95 border border-white/5">
                                <span className="material-symbols-outlined text-lg">code</span>
                                GitHub
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="mt-8 flex gap-8 border-t border-white/10 pt-8">
                            <div>
                                <p className="text-3xl font-bold text-white font-display">50K+</p>
                                <p className="text-sm text-gray-500">Dapps Integrated</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white font-display">10M+</p>
                                <p className="text-sm text-gray-500">Daily Requests</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white font-display">99.9%</p>
                                <p className="text-sm text-gray-500">Uptime</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Code Block Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        {/* Floating Badges */}
                        <div className="absolute -top-6 -right-4 z-20 animate-float hidden lg:block">
                            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-charcoal/80 p-3 shadow-2xl backdrop-blur-md">
                                <div className="flex -space-x-2">
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 ring-2 ring-charcoal"></div>
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 ring-2 ring-charcoal"></div>
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 ring-2 ring-charcoal"></div>
                                </div>
                                <span className="text-xs font-bold text-white">50K+ Dapps</span>
                            </div>
                        </div>

                        <div className="absolute bottom-10 -left-10 z-20 animate-float-slow hidden lg:block">
                            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-charcoal/80 p-3 shadow-2xl backdrop-blur-md">
                                <span className="material-symbols-outlined text-primary text-xl">lock_open</span>
                                <span className="text-xs font-bold text-white">100% Open Source</span>
                            </div>
                        </div>

                        {/* Terminal Window */}
                        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] shadow-2xl">
                            {/* Window Controls */}
                            <div className="flex items-center justify-between border-b border-white/5 bg-[#252526] px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                                    <div className="ml-2 text-xs text-gray-500 font-mono">connect-wallet.ts</div>
                                </div>
                                <button
                                    onClick={runCode}
                                    disabled={isRunning}
                                    className="flex items-center gap-1.5 px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary text-[11px] font-bold rounded-md transition-colors border border-primary/30 disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[14px]">{isRunning ? 'sync' : 'play_arrow'}</span>
                                    {isRunning ? 'RUNNING...' : 'RUN CODE'}
                                </button>
                            </div>

                            {/* Code Content with typing animation */}
                            <div className="p-6 overflow-x-auto text-left min-h-[300px] relative">
                                <TypingCode />

                                {/* Console Output Overlay */}
                                <AnimatePresence>
                                    {showTerminal && (
                                        <motion.div
                                            initial={{ y: 200, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: 200, opacity: 0 }}
                                            className="absolute bottom-0 left-0 right-0 bg-[#0c0c0c] border-t border-white/10 p-4 font-mono text-[12px] h-[140px] overflow-y-auto z-10"
                                        >
                                            <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-1">
                                                <span className="text-gray-500 uppercase font-bold tracking-wider text-[10px]">Console Output</span>
                                                <button onClick={() => setShowTerminal(false)} className="text-gray-500 hover:text-white">
                                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                                </button>
                                            </div>
                                            {outputs.map((line, idx) => (
                                                <div key={idx} className={`mb-1 ${line.startsWith('Error') ? 'text-red-400' : line.startsWith('Connected') ? 'text-green-400' : 'text-gray-300'}`}>
                                                    <span className="text-primary mr-2">›</span>
                                                    {line}
                                                </div>
                                            ))}
                                            {isRunning && (
                                                <div className="text-primary animate-pulse">
                                                    <span className="text-primary mr-2">›</span>
                                                    Processing...
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Hover glow */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DeveloperAPI;
