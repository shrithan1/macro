"use client";

import React from "react";

interface Block {
  id: string;
  label: string;
}

interface BlockPanelProps {
  onAddBlock: (block: Block) => void;
}

export function BlockPanel({ onAddBlock }: BlockPanelProps) {
  const blocks: Block[] = [
    { id: "block-a", label: "Block A" },
    { id: "block-b", label: "Block B" },
    { id: "block-c", label: "Block C" }
  ];

  return (
    <div className="p-4">
      <h3 className="mb-4 text-xl font-semibold">Available Blocks</h3>
      <div className="space-y-2">
        {blocks.map((block) => (
          <button
            key={block.id}
            onClick={() => onAddBlock(block)}
            className="w-full px-4 py-2 text-sm text-left bg-gray-200 rounded hover:bg-gray-300"
          >
            {block.label}
          </button>
        ))}
      </div>
    </div>
  );
} 