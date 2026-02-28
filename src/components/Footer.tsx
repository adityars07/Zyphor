import React from 'react';

const Footer = () => {
    return (
        <footer className="relative bg-deep-navy text-white noise-bg">
            <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Brand Section */}
                    <div className="space-y-8 xl:col-span-1">
                        <div className="flex items-center gap-3">
                            <div className="size-8 text-primary">
                                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"></path>
                                </svg>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">Web3Wallet</span>
                        </div>
                        <p className="text-base leading-6 text-gray-300 max-w-xs">
                            The self-custodial wallet for the decentralized web. Secure, trusted, and built for everyone.
                        </p>
                        <div className="flex gap-6">
                            <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                                <span className="sr-only">Twitter</span>
                                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>flutter_dash</span>
                            </a>
                            <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                                <span className="sr-only">Discord</span>
                                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>forum</span>
                            </a>
                            <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                                <span className="sr-only">GitHub</span>
                                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>code</span>
                            </a>
                            <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                                <span className="sr-only">LinkedIn</span>
                                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>work</span>
                            </a>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider opacity-80">Product</h3>
                                <ul className="mt-6 space-y-4" role="list">
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">Wallet</a></li>
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">Swap</a></li>
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">Portfolio</a></li>
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">Bridge</a></li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider opacity-80">Developers</h3>
                                <ul className="mt-6 space-y-4" role="list">
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">Documentation</a></li>
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">GitHub</a></li>
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">APIs & SDKs</a></li>
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">Grants</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider opacity-80">Company</h3>
                                <ul className="mt-6 space-y-4" role="list">
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">About</a></li>
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">Careers</a></li>
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">Press</a></li>
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">Contact</a></li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider opacity-80">Community</h3>
                                <ul className="mt-6 space-y-4" role="list">
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">Blog</a></li>
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">Help Center</a></li>
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">Status</a></li>
                                    <li><a className="text-sm leading-6 text-gray-300 hover:text-white hover:underline decoration-primary underline-offset-4" href="#">Governance</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs leading-5 text-gray-400">© 2023 CryptoWallet Inc. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-gray-400">
                        <a className="hover:text-white" href="#">Privacy Policy</a>
                        <a className="hover:text-white" href="#">Terms of Service</a>
                        <a className="hover:text-white" href="#">Cookie Preferences</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
