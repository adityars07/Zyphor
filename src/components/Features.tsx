import React from 'react';

const Features = () => {
    return (
        <section className="py-20 px-6 bg-background-light relative border-b border-border-light">
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <h1 className="font-display font-bold text-5xl md:text-[56px] leading-[1.1] text-text-main mb-6">
                            Everything you need in <span className="text-primary">Web3</span>
                        </h1>
                        <p className="text-lg text-text-muted leading-relaxed max-w-lg">
                            Securely manage your digital assets with the most trusted self-custodial wallet designed for everyone, everywhere.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 text-primary font-bold text-lg hover:gap-3 transition-all group border-b border-transparent hover:border-primary">
                        Explore all features
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="group bg-surface-light border border-border-light hover:border-primary/30 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-3xl">currency_exchange</span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-text-main mb-3">Swap Tokens</h3>
                        <p className="text-text-muted leading-relaxed">
                            Instantly swap thousands of tokens across multiple chains with the best rates and lowest slippage automatically.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group bg-surface-light border border-border-light hover:border-primary/30 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-3xl">collections</span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-text-main mb-3">NFT Management</h3>
                        <p className="text-text-muted leading-relaxed">
                            View, manage, and showcase your NFT collection in a beautiful gallery. Support for audio and video collectibles included.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group bg-surface-light border border-border-light hover:border-primary/30 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-3xl">savings</span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-text-main mb-3">Staking Rewards</h3>
                        <p className="text-text-muted leading-relaxed">
                            Earn passive income by staking your assets directly from your wallet. One-click staking for ETH, SOL, and more.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="group bg-surface-light border border-border-light hover:border-primary/30 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-3xl">security</span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-text-main mb-3">Vault Security</h3>
                        <p className="text-text-muted leading-relaxed">
                            Industry-leading security protocols including biometrics, multi-party computation, and hardware wallet support.
                        </p>
                    </div>

                    {/* Card 5 */}
                    <div className="group bg-surface-light border border-border-light hover:border-primary/30 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-3xl">public</span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-text-main mb-3">Multi-Chain Support</h3>
                        <p className="text-text-muted leading-relaxed">
                            Seamlessly connect to over 50+ blockchain networks without manual configuration. Your bridge to the decentralized web.
                        </p>
                    </div>

                    {/* Card 6 */}
                    <div className="group bg-surface-light border border-border-light hover:border-primary/30 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                        <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-3xl">monitoring</span>
                        </div>
                        <h3 className="text-xl font-display font-bold text-text-main mb-3">Portfolio Analytics</h3>
                        <p className="text-text-muted leading-relaxed">
                            Track your net worth in real-time with comprehensive charts, P&L analysis, and historical performance data.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
