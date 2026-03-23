import { Network, Alchemy } from "alchemy-sdk";

// Lazy singleton — only created when actually called, never at module load time
let alchemyInstance: Alchemy | null = null;

function getAlchemy(): Alchemy {
    if (!alchemyInstance) {
        alchemyInstance = new Alchemy({
            apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
            network: Network.ETH_MAINNET,
        });
    }
    return alchemyInstance;
}

// Function to get token balances for an address
export const getTokenBalances = async (address: string) => {
    if (typeof window === 'undefined') {
        console.warn("getTokenBalances called on server — skipping.");
        return [];
    }

    if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
        console.warn("Alchemy API key is missing. Real-time balances will not be available.");
        return [];
    }

    try {
        const alchemy = getAlchemy();
        const balances = await alchemy.core.getTokenBalances(address);
        // Filter out zero balances and sort if needed
        return balances.tokenBalances.filter(b => b.tokenBalance !== "0");
    } catch (error) {
        console.error("Error fetching token balances from Alchemy:", error);
        return [];
    }
};
