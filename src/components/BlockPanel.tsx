"use client";
"use strict";

async function fetchStockPrice(symbol: string) {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=BW94SPC39ZMD606D`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    const assetPrice = data["Global Quote"]?.["05. price"];

    if (assetPrice) {
      console.log(`IBM Stock Price: $${assetPrice}`);
      return assetPrice;
    } else {
      console.error("Price not found in response");
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// Usage
const msftPrice = fetchStockPrice("MSFT");
const aaplPrice = fetchStockPrice("AAPL");
const nvdaPrice = fetchStockPrice("NVDA");

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
        price: msftPrice,
        category: "Stocks",
      },
      {
        id: "2",
        logo: "/block_logos/apple.png",
        label: "AAPL",
        price: aaplPrice,
        category: "Stocks",
      },
      {
        id: "3",
        logo: "/block_logos/nvidia.png",
        label: "NVDA",
        price: nvdaPrice,
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
        price: "100",
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
  // const blocks: Block[] = [
  //   {
  //     id: "1",
  return (
    <div className="p-4 bg-white">
      <h3 className="mb-4 text-xl font-semibold">Available Assets</h3>
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
