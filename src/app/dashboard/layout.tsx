'use client';

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isConnected, isConnecting, isReconnecting } = useAccount();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // The redirect logic is removed as per the instruction.
    // useEffect(() => {
    //     if (mounted && !isConnecting && !isReconnecting && !isConnected) {
    //         router.push('/');
    //     }
    // }, [isConnected, isConnecting, isReconnecting, mounted, router]);

    if (!mounted) {
        return null; // Prevents hydration mismatch
    }

    // If not connected, show a banner but allow viewing the layout
    return (
        <div className="min-h-screen flex transition-colors" style={{ backgroundColor: 'var(--bg)' }}>
            <Sidebar />
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <TopBar />
                {!isConnected && (
                    <div className="bg-primary/10 border-b border-primary/20 px-6 py-2 text-center text-sm font-medium text-primary">
                        You are currently in <strong>Demo Mode</strong>. <button onClick={() => { }} className="underline font-bold">Connect Wallet</button> to see your real assets.
                    </div>
                )}
                <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
