"use client"

import { Command, CommandIcon, ArrowUpFromLine } from "lucide-react"

interface TooltipDisplayProps {
  variant?: 1 | 2 | 3 | 4
}

export function TooltipDisplay({ variant = 1 }: TooltipDisplayProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-black/90 px-3 py-1.5 text-white">
      <span>Tooltip</span>
      {variant >= 2 && (
        <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-neutral-800">
          <Command className="h-3.5 w-3.5" />
        </div>
      )}
      {variant >= 3 && (
        <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-neutral-800">
          <CommandIcon className="h-3.5 w-3.5" />
        </div>
      )}
      {variant >= 4 && (
        <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-neutral-800">
          <ArrowUpFromLine className="h-3.5 w-3.5" />
        </div>
      )}
    </div>
  )
}