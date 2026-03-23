'use client';

import * as React from 'react';
import {
    RainbowKitProvider,
    getDefaultConfig,
    darkTheme,
    lightTheme
} from '@rainbow-me/rainbowkit';
import {
    arbitrum,
    base,
    mainnet,
    optimism,
    polygon,
    sepolia,
} from 'wagmi/chains';
import { WagmiProvider } from 'wagmi';
import {
    QueryClientProvider,
    QueryClient,
} from '@tanstack/react-query';
import { useTheme } from './ThemeProvider';
import '@rainbow-me/rainbowkit/styles.css';

function makeWagmiConfig() {
    const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

    return getDefaultConfig({
        appName: 'Zyphor',
        projectId,
        chains: [mainnet, polygon, optimism, arbitrum, base, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : [])],
        ssr: true,
    });
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    // Lazy-init: only called once per component lifecycle, safe for SSR with ssr:true
    const [config] = React.useState(() => makeWagmiConfig());
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={theme === 'dark' ? darkTheme({
                        accentColor: '#e27228',
                        accentColorForeground: 'white',
                    }) : lightTheme({
                        accentColor: '#e27228',
                        accentColorForeground: 'white',
                    })}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
