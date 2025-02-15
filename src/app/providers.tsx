'use client'

import { WagmiProvider } from "wagmi";
import { config } from '../../config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
    getDefaultConfig,
    RainbowKitProvider,
  } from '@rainbow-me/rainbowkit';
import { ThemeProvider } from 'next-themes'

const queryClient = new QueryClient()

export function Providers({ children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider>{children}</RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </ThemeProvider>
    )
}