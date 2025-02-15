"use client";
"use strict";
// const demoPrice = await fetch(
//   "https:/www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo"
// );
// const assetPrice = demoPrice["Global Quote"]["05. price"];
// const url =
//   "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=0U1V6CTCAP296DBD";

import Image from "next/image";
import React, { useState } from "react";
interface Block {
  id: string;
  logo: string;
  label: string;
  price: string;
  category: string;
}

interface Category {
  name: string;
  change: string;
  blocks: Block[];
}

interface BlockPanelProps {
  onAddBlock: (block: Block) => void;
}

const categories: Category[] = [
  {
    name: "Stocks",
    change: "+2.2%",
    blocks: [
      {
        id: "1",
        logo: "/block_logos/MSFT.png",
        label: "MSFT",
        price: "100",
        category: "Stocks",
      },
      {
        id: "2",
        logo: "/block_logos/apple.png",
        label: "AAPL",
        price: "150",
        category: "Stocks",
      },
      {
        id: "3",
        logo: "/block_logos/nvidia.png",
        label: "NVDA",
        price: "300",
        category: "Stocks",
      },
    ],
  },
  {
    name: "S&P",
    change: "+2.4%",
    blocks: [
      {
        id: "4",
        logo: "/block_logos/voo1.png",
        label: "VOO",
        price: "400",
        category: "S&P",
      },
    ],
  },
  {
    name: "Crypto",
    change: "+2.2%",
    blocks: [
      {
        id: "5",
        logo: "/block_logos/ethereum.png",
        label: "ETH",
        price: "3500",
        category: "BigCrypto",
      },
      {
        id: "6",
        logo: "/block_logos/bitcoin1.png",
        label: "BTC",
        price: "100000",
        category: "BigCrypto",
      },
      {
        id: "7",
        logo: "/block_logos/usdc.png",
        label: "USDC",
        price: "1",
        category: "BigCrypto",
      },
    ],
  },
];

export function BlockPanel({ onAddBlock }: BlockPanelProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="p-4 bg-white">
      <h3 className="mb-4 text-xl font-semibold">Available Assets</h3>
      {loading && <div className="loader">Loading...</div>}
      {categories.map((category) => (
        <div key={category.name} className="space-y-2">
          <div className="flex items-center mb-2 mt-2">
            <h4 className="text-sm text-gray-500 mr-2">{category.name}</h4>
            <span className="text-sm bg-green-100 px-1 text-green-500">
              {category.change}
            </span>
          </div>
          {category.blocks.map((block) => (
            <button
              key={block.id}
              onClick={() => onAddBlock(block)}
              className="w-full flex justify-between items-center px-2 border border-gray-200 py-2 text-sm text-left rounded-0 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <Image
                  src={block.logo}
                  alt={`${block.label} logo`}
                  className="w-6 h-6 mr-2"
                  width={20}
                  height={20}
                  onLoad={() => setLoading(false)}
                />
                <span>{block.label}</span>
              </div>
              <div className="ml-auto">
                <span className="font-normal">${block.price}</span>
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
