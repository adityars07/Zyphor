import { NextResponse } from "next/server";
import { getWalletNFTs } from "@/lib/server/alchemy.server";
import type { NFTsResponse } from "@/lib/types";

const MOCK_NFTS = [
    {
        contractAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        tokenId: "8817",
        title: "Zyphor Genesis #001",
        description: "The ultimate Zyphor community pass.",
        rarity: "Legendary",
        collection: "Zyphor Genesis",
        media: [{ gateway: "/assets/nfts/zyphor_genesis.png" }],
    },
    {
        contractAddress: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
        tokenId: "9998",
        title: "Zyphor Legend #42",
        description: "A symbol of pure power and prestige.",
        rarity: "Legendary",
        collection: "Zyphor Legends",
        media: [{ gateway: "/assets/nfts/zyphor_legend.png" }],
    },
    {
        contractAddress: "0x123",
        tokenId: "101",
        title: "Zyphor Vanguard #101",
        description: "The frontline of the Zyphor ecosystem.",
        rarity: "Epic",
        collection: "Zyphor Vanguards",
        media: [{ gateway: "/assets/nfts/zyphor_rare.png" }],
    },
    {
        contractAddress: "0x456",
        tokenId: "442",
        title: "Zyphor Genesis #002",
        description: "The second ever Zyphor NFT.",
        rarity: "Rare",
        collection: "Zyphor Genesis",
        media: [{ gateway: "/assets/nfts/zyphor_genesis.png" }],
    },
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    const alchemyKey = process.env.ALCHEMY_API_KEY || process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

    // Return mock data if no address or API key
    if (!address || !alchemyKey) {
        return NextResponse.json({ nfts: MOCK_NFTS } as NFTsResponse);
    }

    try {
        const nfts = await getWalletNFTs(address);

        // If no NFTs found, return mock data for demo
        if (nfts.length === 0) {
            return NextResponse.json({ nfts: MOCK_NFTS } as NFTsResponse);
        }

        return NextResponse.json({ nfts } as NFTsResponse);
    } catch (error: any) {
        console.error("Error fetching NFTs:", error.message);
        return NextResponse.json({ nfts: MOCK_NFTS } as NFTsResponse);
    }
}
