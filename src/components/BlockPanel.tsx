"use client";
"use strict";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import ScrambleHover from "@/components/ScrambleHover";

export interface Block {
  id: string;
  logo: string;
  label: string;
  price: string;
  category: string;
}

export interface Category {
  name: string;
  change: string;
  blocks: Block[];
}

export interface BlockPanelProps {
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
        price: "408.43",
        category: "Stocks",
      },
      {
        id: "2",
        logo: "/block_logos/apple.png",
        label: "AAPL",
        price: "244.60",
        category: "Stocks",
      },
      {
        id: "3",
        logo: "/block_logos/nvidia.png",
        label: "NVDA",
        price: "138.35",
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
        price: "560.69",
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
        price: "2713.19",
        category: "BigCrypto",
      },
      {
        id: "6",
        logo: "/block_logos/bitcoin1.png",
        label: "BTC",
        price: "97349.81",
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

const SimulatedPrice: React.FC<{ basePrice: number }> = ({ basePrice }) => {
  const [price, setPrice] = useState(basePrice);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const updatePrice = () => {
      setPrice((prevPrice) => {
        const randomFactor = Math.random() * 0.01; // up to 1%
        const sign = Math.random() < 0.5 ? 1 : -1;
        const updatedPrice = prevPrice * (1 + sign * randomFactor);
        return Math.round(updatedPrice * 100) / 100;
      });
      const nextDelay = Math.random() * 4000 + 1000; // random delay between 1-5 seconds
      timeout = setTimeout(updatePrice, nextDelay);
    };

    timeout = setTimeout(updatePrice, Math.random() * 4000 + 1000);
    return () => clearTimeout(timeout);
  }, []);

  return <ScrambleHover text={price.toFixed(2)} />;
};

export function BlockPanel({ onAddBlock }: BlockPanelProps) {
  return (
    <div className="p-4 bg-white space-y-4">
      <h3 className="mb-2 text-xl font-normal">Available Assets</h3>
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
              className="w-full flex justify-between items-center px-2 border border-gray-200 py-2 text-sm text-left rounded hover:bg-gray-100"
            >
              <div className="flex items-center">
                <Image
                  src={block.logo}
                  alt={`${block.label} logo`}
                  className="w-6 h-6 mr-2"
                  width={20}
                  height={20}
                />
                <span>{block.label}</span>
              </div>
              <div className="ml-auto">
                <span className="font-normal">
                  $<SimulatedPrice basePrice={parseFloat(block.price)} />
                </span>
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
