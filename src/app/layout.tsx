import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${interTight.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
