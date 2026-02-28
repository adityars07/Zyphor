import React from 'react';

const Hero = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center gap-8 mb-20 relative pt-32 pb-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/10 to-purple-custom/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[0.9] tracking-tight text-slate-900">
                YOUR KEYS.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">YOUR CRYPTO.</span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-slate-600 max-w-2xl font-medium leading-relaxed">
                The world's most trusted self-custodial wallet for Web3. Secure, global, and ready for the future of decentralized finance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button className="flex items-center gap-2 justify-center rounded-full bg-primary hover:bg-primary/90 text-white text-base font-bold px-8 py-4 transition-all shadow-lg shadow-primary/25 hover:-translate-y-1">
                    <span className="material-symbols-outlined text-[20px]">download</span>
                    Download Extension
                </button>
                <button className="flex items-center gap-2 justify-center rounded-full bg-white text-slate-900 border border-slate-200 hover:border-primary text-base font-bold px-8 py-4 transition-all hover:-translate-y-1">
                    Explore Features
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
            </div>
        </section>
    );
};

export default Hero;
