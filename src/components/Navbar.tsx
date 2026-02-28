import React from 'react';

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/20 bg-background-light/95 backdrop-blur-md px-6 py-4 md:px-10 lg:px-16 transition-all duration-300">
            <div className="flex items-center gap-3 text-slate-900 border-border-light text-text-main">
                <div className="size-8 text-primary shadow-lg shadow-primary/20">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
                    </svg>
                </div>
                <h2 className="font-display text-xl font-bold tracking-tight">Web3Wallet</h2>
            </div>
            <nav className="hidden md:flex items-center gap-8">
                <a className="text-sm font-semibold text-text-main hover:text-primary transition-colors" href="#">Features</a>
                <a className="text-sm font-semibold text-text-muted hover:text-primary transition-colors" href="#">Security</a>
                <a className="text-sm font-semibold text-text-muted hover:text-primary transition-colors" href="#">Support</a>
                <a className="text-sm font-semibold text-text-muted hover:text-primary transition-colors" href="#">Download</a>
            </nav>
            <div className="flex items-center gap-4">
                <button className="flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-bold px-6 py-3 transition-transform hover:scale-105 shadow-lg shadow-primary/20">
                    Connect Wallet
                </button>
            </div>
        </header>
    );
};

export default Navbar;
