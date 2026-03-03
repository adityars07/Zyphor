'use client';

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { alchemy } from '@/lib/alchemy';
import { motion } from 'framer-motion';

interface NFT {
    contractAddress: string;
    tokenId: string;
    title: string;
    description: string;
    media: { gateway: string }[];
}

const MOCK_NFTS = [
    {
        contractAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        tokenId: "8817",
        title: "Zyphor Genesis #001",
        description: "The ultimate Zyphor community pass.",
        rarity: "Legendary",
        collection: "Zyphor Genesis",
        media: [{ gateway: "/assets/nfts/zyphor_genesis.png" }]
    },
    {
        contractAddress: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
        tokenId: "9998",
        title: "Zyphor Legend #42",
        description: "A symbol of pure power and prestige.",
        rarity: "Legendary",
        collection: "Zyphor Legends",
        media: [{ gateway: "/assets/nfts/zyphor_legend.png" }]
    },
    {
        contractAddress: "0x123",
        tokenId: "101",
        title: "Zyphor Vanguard #101",
        description: "The frontline of the Zyphor ecosystem.",
        rarity: "Epic",
        collection: "Zyphor Vanguards",
        media: [{ gateway: "/assets/nfts/zyphor_rare.png" }]
    },
    {
        contractAddress: "0x456",
        tokenId: "442",
        title: "Zyphor Genesis #002",
        description: "The second ever Zyphor NFT.",
        rarity: "Rare",
        collection: "Zyphor Genesis",
        media: [{ gateway: "/assets/nfts/zyphor_genesis.png" }]
    }
];

export default function NFTGalleryPage() {
    const { address } = useAccount();
    const [nfts, setNfts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterBy, setFilterBy] = useState('All');

    useEffect(() => {
        const fetchNFTs = async () => {
            if (!address || !process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
                setNfts(MOCK_NFTS);
                return;
            }

            setLoading(true);
            try {
                const response = await alchemy.nft.getNftsForOwner(address);
                setNfts(response.ownedNfts.length > 0 ? response.ownedNfts : MOCK_NFTS);
            } catch (error) {
                console.error("Error fetching NFTs:", error);
                setNfts(MOCK_NFTS);
            } finally {
                setLoading(false);
            }
        };

        fetchNFTs();
    }, [address]);

    const filteredNfts = nfts.filter(nft => {
        const matchesSearch = (nft.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (nft.collection || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterBy === 'All' || nft.rarity === filterBy;
        return matchesSearch && matchesFilter;
    });

    const rarities = ['All', 'Legendary', 'Epic', 'Rare', 'Common'];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0">
                <div>
                    <h1 className="text-4xl font-display font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>NFT Gallery</h1>
                    <p className="mt-2 text-lg" style={{ color: 'var(--text-secondary)' }}>Curating your digital legacy.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-50 group-focus-within:opacity-100 transition-opacity">search</span>
                        <input
                            type="text"
                            placeholder="Search collectibles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-3 pl-12 pr-6 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all w-full sm:w-64"
                            style={{ color: 'var(--text-primary)' }}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                        {rarities.map(r => (
                            <button
                                key={r}
                                onClick={() => setFilterBy(r)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap border transition-all ${filterBy === r ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-primary/50'}`}
                                style={{ color: filterBy === r ? 'white' : 'var(--text-secondary)' }}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-0">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="rounded-3xl h-[420px] animate-pulse border border-white/5" style={{ backgroundColor: 'var(--card-bg)' }}></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-0">
                    {filteredNfts.map((nft, idx) => (
                        <motion.div
                            key={`${nft.contractAddress}-${nft.tokenId}-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative overflow-hidden rounded-[2.5rem] p-3 transition-all backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-2xl"
                            style={{ backgroundColor: 'var(--card-bg)' }}
                        >
                            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-black/5 dark:bg-white/5">
                                <img
                                    src={nft.media?.[0]?.gateway || 'https://via.placeholder.com/600?text=Processing+Media...'}
                                    alt={nft.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {nft.rarity && (
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 shadow-xl ${nft.rarity === 'Legendary' ? 'bg-yellow-500/80 text-white' :
                                        nft.rarity === 'Epic' ? 'bg-purple-500/80 text-white' :
                                            'bg-blue-500/80 text-white'
                                        }`}>
                                        {nft.rarity}
                                    </div>
                                )}

                                <button className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all p-3 bg-white text-black rounded-full shadow-2xl hover:bg-primary hover:text-white">
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                </button>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-display font-bold text-lg truncate flex-1" style={{ color: 'var(--text-primary)' }}>
                                        {nft.title || 'Untitled'}
                                    </h3>
                                    <span className="material-symbols-outlined text-primary text-[18px] ml-2">verified</span>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10" style={{ color: 'var(--text-secondary)' }}>
                                        #{nft.tokenId}
                                    </span>
                                    <span className="text-xs opacity-50">•</span>
                                    <span className="text-xs font-medium truncate" style={{ color: 'var(--text-secondary)' }}>
                                        {nft.collection || 'Independent'}
                                    </span>
                                </div>

                                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold tracking-tighter opacity-50" style={{ color: 'var(--text-secondary)' }}>Last Sale</span>
                                        <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>0.45 ETH</span>
                                    </div>
                                    <button className="text-primary text-xs font-bold hover:underline">View on Opensea</button>
                                </div>
                            </div>

                            {/* Decorative background glow */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[100px] pointer-events-none group-hover:bg-primary/40 transition-colors"></div>
                        </motion.div>
                    ))}
                </div>
            )}

            {!loading && filteredNfts.length === 0 && (
                <div className="text-center py-32 flex flex-col items-center">
                    <div className="size-24 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-5xl opacity-20">search_off</span>
                    </div>
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>No matching results</h2>
                    <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filters to find what you're looking for.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setFilterBy('All'); }}
                        className="mt-6 text-primary font-bold hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}
