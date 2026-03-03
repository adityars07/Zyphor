import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const sellToken = searchParams.get('sellToken');
    const buyToken = searchParams.get('buyToken');
    const sellAmount = searchParams.get('sellAmount');
    const takerAddress = searchParams.get('takerAddress');

    if (!sellToken || !buyToken || !sellAmount) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const apiKey = process.env.ZEROX_API_KEY;
    if (!apiKey) {
        // If no API key, we return a mock success for demo purposes but log it
        console.warn("ZEROX_API_KEY is missing. Returning mock swap quote.");
        // Mock quote calculation: (amount in base units) * price * (buyTokenDecimals / sellTokenDecimals)
        // For ETH (18) to USDC (6): sellAmount * 3450.2 / 10^12
        const buyAmount = sellToken === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
            ? (BigInt(sellAmount) * BigInt(Math.floor(3450.2 * 100)) / BigInt(100) / BigInt(10 ** 12)).toString()
            : (BigInt(sellAmount) / BigInt(Math.floor(3450.2 * 100)) * BigInt(100) * BigInt(10 ** 12)).toString();

        const mockQuote = {
            buyAmount: buyAmount,
            grossBuyAmount: buyAmount,
            price: "3450.20",
            gasPrice: "20000000000",
            estimatedGas: "150000"
        };
        return NextResponse.json(mockQuote);
    }

    try {
        const response = await axios.get(`https://api.0x.org/swap/v1/quote`, {
            params: {
                sellToken,
                buyToken,
                sellAmount,
                takerAddress,
            },
            headers: {
                '0x-api-key': apiKey,
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error fetching 0x quote:', error.response?.data || error.message);
        return NextResponse.json(
            { error: 'Failed to fetch swap quote', details: error.response?.data },
            { status: error.response?.status || 500 }
        );
    }
}
