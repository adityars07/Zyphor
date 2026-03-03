import { Network, Alchemy } from "alchemy-sdk";

const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET, // Default to Ethereum Mainnet
};

export const alchemy = new Alchemy(settings);

// Function to get token balances for an address
export const getTokenBalances = async (address: string) => {
    if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
        console.warn("Alchemy API key is missing. Real-time balances will not be available.");
        return [];
    }

    try {
        const balances = await alchemy.core.getTokenBalances(address);
        // Filter out zero balances and sort if needed
        return balances.tokenBalances.filter(b => b.tokenBalance !== "0");
    } catch (error) {
        console.error("Error fetching token balances from Alchemy:", error);
        return [];
    }
};
