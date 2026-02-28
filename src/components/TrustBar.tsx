import React from 'react';

const TrustBar = () => {
    return (
        <section className="bg-background-dark py-12 overflow-hidden relative border-t border-white/5">
            <div className="max-w-[1200px] mx-auto px-6 mb-8 text-center relative z-10">
                <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-2">Trusted Ecosystem</p>
                <h2 className="text-white font-display text-2xl md:text-3xl font-bold">Powering the next generation of finance</h2>
            </div>

            {/* Marquee */}
            <div className="marquee-container w-full overflow-hidden flex relative z-10 py-6">
                <div className="animate-scroll flex items-center whitespace-nowrap gap-16 min-w-full">
                    {/* Logo Set 1 */}
                    <div className="flex items-center gap-16">
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Ethereum</span>
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Polygon</span>
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Arbitrum</span>
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Optimism</span>
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Solana</span>
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Binance</span>
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Avalanche</span>
                    </div>
                    {/* Logo Set 2 (Duplicate for seamless loop) */}
                    <div className="flex items-center gap-16 pl-16">
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Ethereum</span>
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Polygon</span>
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Arbitrum</span>
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Optimism</span>
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Solana</span>
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Binance</span>
                        <span className="text-white font-display text-xl font-bold opacity-80 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Avalanche</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustBar;
