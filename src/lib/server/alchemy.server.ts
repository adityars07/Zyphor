import { Network, Alchemy, AssetTransfersCategory, SortingOrder } from "alchemy-sdk";
import type { TokenBalance, NFTItem, Transaction } from "../types";

const getAlchemy = () => {
    const apiKey = process.env.ALCHEMY_API_KEY || process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
    if (!apiKey) {
        throw new Error("ALCHEMY_API_KEY is not set");
    }
    return new Alchemy({
        apiKey,
        network: Network.ETH_MAINNET,
    });
};

/**
 * Fetches ERC-20 token balances with metadata for a wallet address
 */
export async function getWalletTokenBalances(address: string): Promise<TokenBalance[]> {
    const alchemy = getAlchemy();

    const balancesResponse = await alchemy.core.getTokenBalances(address);

    // Filter out zero balances
    const nonZeroBalances = balancesResponse.tokenBalances.filter(
        (b) => b.tokenBalance && b.tokenBalance !== "0" && b.tokenBalance !== "0x0000000000000000000000000000000000000000000000000000000000000000"
    );

    // Fetch metadata for each token (batch)
    const tokensWithMetadata: TokenBalance[] = await Promise.all(
        nonZeroBalances.slice(0, 20).map(async (token) => {
            try {
                const metadata = await alchemy.core.getTokenMetadata(token.contractAddress!);
                const decimals = metadata.decimals || 18;
                const rawBalance = BigInt(token.tokenBalance || "0");
                const balance = Number(rawBalance) / Math.pow(10, decimals);

                return {
                    symbol: metadata.symbol || "???",
                    name: metadata.name || "Unknown Token",
                    balance: parseFloat(balance.toFixed(6)),
                    priceUsd: 0,       // Will be enriched by CoinGecko in the API route
                    valueUsd: 0,
                    change24h: 0,
                    icon: metadata.logo || "https://cdn-icons-png.flaticon.com/512/7047/7047081.png",
                    contractAddress: token.contractAddress!,
                    decimals,
                };
            } catch {
                return {
                    symbol: "???",
                    name: "Unknown Token",
                    balance: 0,
                    priceUsd: 0,
                    valueUsd: 0,
                    change24h: 0,
                    icon: "https://cdn-icons-png.flaticon.com/512/7047/7047081.png",
                    contractAddress: token.contractAddress!,
                };
            }
        })
    );

    return tokensWithMetadata.filter((t) => Number(t.balance) > 0);
}

/**
 * Fetches NFTs owned by a wallet address
 */
export async function getWalletNFTs(address: string): Promise<NFTItem[]> {
    const alchemy = getAlchemy();

    const response = await alchemy.nft.getNftsForOwner(address, {
        pageSize: 50,
    });

    return response.ownedNfts.map((nft) => ({
        contractAddress: nft.contract.address,
        tokenId: nft.tokenId,
        title: nft.name || nft.raw?.metadata?.name || "Untitled",
        description: nft.description || "",
        collection: nft.contract.name || "Unknown Collection",
        rarity: undefined,
        media: [
            {
                gateway: nft.image?.cachedUrl || nft.image?.originalUrl || "",
            },
        ],
    }));
}

/**
 * Fetches recent transactions (asset transfers) for a wallet address
 */
export async function getWalletTransactions(
    address: string,
    limit: number = 10
): Promise<Transaction[]> {
    const alchemy = getAlchemy();

    // Fetch both sent and received transfers
    const [sentTransfers, receivedTransfers] = await Promise.all([
        alchemy.core.getAssetTransfers({
            fromAddress: address,
            category: [
                AssetTransfersCategory.EXTERNAL,
                AssetTransfersCategory.ERC20,
                AssetTransfersCategory.ERC721,
            ],
            maxCount: limit,
            order: SortingOrder.DESCENDING,
            withMetadata: true,
        }),
        alchemy.core.getAssetTransfers({
            toAddress: address,
            category: [
                AssetTransfersCategory.EXTERNAL,
                AssetTransfersCategory.ERC20,
                AssetTransfersCategory.ERC721,
            ],
            maxCount: limit,
            order: SortingOrder.DESCENDING,
            withMetadata: true,
        }),
    ]);

    const allTransfers = [
        ...sentTransfers.transfers.map((t) => ({ ...t, direction: "send" as const })),
        ...receivedTransfers.transfers.map((t) => ({ ...t, direction: "receive" as const })),
    ];

    // Sort by block number descending and take the limit
    allTransfers.sort((a, b) => {
        const blockA = parseInt(a.blockNum, 16);
        const blockB = parseInt(b.blockNum, 16);
        return blockB - blockA;
    });

    return allTransfers.slice(0, limit).map((t, idx) => ({
        id: t.hash || `tx-${idx}`,
        type: t.direction,
        asset: t.asset || "ETH",
        amount: t.value || 0,
        valueUsd: 0, // Would need price data to calculate
        timestamp: (t.metadata as any)?.blockTimestamp || new Date().toISOString(),
        status: "completed" as const,
        address:
            t.direction === "send"
                ? `${(t.to || "").slice(0, 5)}...${(t.to || "").slice(-4)}`
                : `${(t.from || "").slice(0, 5)}...${(t.from || "").slice(-4)}`,
        hash: t.hash || undefined,
    }));
}
