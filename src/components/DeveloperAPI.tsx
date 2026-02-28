import React from 'react';

const DeveloperAPI = () => {
    return (
        <section className="relative w-full bg-charcoal py-20 lg:py-32 px-6 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]"></div>

            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content Left */}
                    <div className="flex flex-col gap-8 relative z-10">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            v2.0 SDK Live
                        </div>

                        <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Build on Web3's most <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">trusted platform</span>
                        </h1>

                        <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                            Join the ecosystem of over 50,000 decentralized applications. Access open source tools, comprehensive documentation, and a global community.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-white transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/25">
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
                                <p className="text-3xl font-bold text-white">50K+</p>
                                <p className="text-sm text-gray-500">Dapps Integrated</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">10M+</p>
                                <p className="text-sm text-gray-500">Daily Requests</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">99.9%</p>
                                <p className="text-sm text-gray-500">Uptime</p>
                            </div>
                        </div>
                    </div>

                    {/* Code Block Right */}
                    <div className="relative">
                        {/* Floating Badges */}
                        <div className="absolute -top-6 -right-4 z-20 animate-[bounce_3s_infinite] hidden lg:block">
                            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-charcoal/80 p-3 shadow-2xl backdrop-blur-md">
                                <div className="flex -space-x-2">
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 ring-2 ring-charcoal"></div>
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 ring-2 ring-charcoal"></div>
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 ring-2 ring-charcoal"></div>
                                </div>
                                <span className="text-xs font-bold text-white">50K+ Dapps</span>
                            </div>
                        </div>

                        <div className="absolute bottom-10 -left-10 z-20 animate-[bounce_4s_infinite] hidden lg:block">
                            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-charcoal/80 p-3 shadow-2xl backdrop-blur-md">
                                <span className="material-symbols-outlined text-primary text-xl">lock_open</span>
                                <span className="text-xs font-bold text-white">100% Open Source</span>
                            </div>
                        </div>

                        {/* Terminal Window */}
                        <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e] shadow-2xl">
                            {/* Window Controls */}
                            <div className="flex items-center gap-2 border-b border-white/5 bg-[#252526] px-4 py-3">
                                <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                                <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                                <div className="ml-2 text-xs text-gray-500 font-mono">connect-wallet.ts</div>
                            </div>

                            {/* Code Content */}
                            <div className="p-6 overflow-x-auto text-left">
                                <pre className="font-mono text-sm leading-relaxed"><span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">{"{"}</span> <span className="text-[#dcdcaa]">CryptoWallet</span> <span className="text-[#9cdcfe]">{"}"}</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'@wallet/sdk'</span><span className="text-[#d4d4d4]">;</span>

                                    <span className="text-[#569cd6]">const</span> <span className="text-[#dcdcaa]">connect</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#569cd6]">async</span> <span className="text-[#9cdcfe]">()</span> <span className="text-[#569cd6]">=&gt;</span> <span className="text-[#9cdcfe]">{"{"}</span>
                                    <span className="text-[#569cd6]">try</span> <span className="text-[#9cdcfe]">{"{"}</span>
                                    <span className="text-[#6a9955]">// Initialize provider</span>
                                    <span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">provider</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#c586c0]">new</span> <span className="text-[#dcdcaa]">CryptoWallet</span><span className="text-[#9cdcfe]">();</span>

                                    <span className="text-[#6a9955]">// Request accounts</span>
                                    <span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">accounts</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#c586c0]">await</span> <span className="text-[#9cdcfe]">provider.</span><span className="text-[#dcdcaa]">request</span><span className="text-[#9cdcfe]">({"{"}</span>
                                    <span className="text-[#9cdcfe]">method:</span> <span className="text-[#ce9178]">'eth_requestAccounts'</span>
                                    <span className="text-[#9cdcfe]">{"}"});</span>

                                    <span className="text-[#569cd6]">return</span> <span className="text-[#9cdcfe]">accounts[</span><span className="text-[#b5cea8]">0</span><span className="text-[#9cdcfe]">];</span>
                                    <span className="text-[#9cdcfe]">{"}"}</span> <span className="text-[#569cd6]">catch</span> <span className="text-[#9cdcfe]">(</span><span className="text-[#9cdcfe]">error</span><span className="text-[#9cdcfe]">)</span> <span className="text-[#9cdcfe]">{"{"}</span>
                                    <span className="text-[#9cdcfe]">console.</span><span className="text-[#dcdcaa]">error</span><span className="text-[#9cdcfe]">(</span><span className="text-[#ce9178]">'User rejected request'</span><span className="text-[#9cdcfe]">);</span>
                                    <span className="text-[#9cdcfe]">{"}"}</span>
                                    <span className="text-[#9cdcfe]">{"}"};</span>
                                </pre>
                            </div>

                            {/* Glow effect */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DeveloperAPI;
