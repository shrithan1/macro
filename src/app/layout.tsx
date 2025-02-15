import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from '@/components/navbar'

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trade Stocks on Chain",
  description: "Use A I agents to create advanced trading strategies for both stocks and crypto. Get the best of both worlds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable}`} suppressHydrationWarning>
      <body className={`font-inter-tight antialiased min-h-screen bg-background`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
