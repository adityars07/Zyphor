import React from 'react';

const CTA = () => {
    return (
        <section className="py-24 px-6 relative overflow-hidden bg-background-light">
            <div className="max-w-[1200px] mx-auto bg-text-main rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#e27228 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">Start your Web3 journey</h2>
                    <p className="text-white/70 text-lg mb-10 leading-relaxed">
                        Join millions of users worldwide and take full control of your financial future today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5">
                            Download Now
                        </button>
                        <button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all hover:-translate-y-0.5">
                            Read Documentation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
