"use client"

import type * as React from "react"
import { Command, CommandIcon as CommandShortcut, ArrowUp } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CustomTooltipProps {
  variant?: "basic" | "command" | "command-palette" | "full"
  children?: React.ReactNode
}

export function CustomTooltip({ variant = "basic", children }: CustomTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children || <div className="h-8 w-8 rounded-md bg-zinc-800" />}</TooltipTrigger>
        <TooltipContent className="flex items-center gap-1.5 rounded-lg bg-[#1C1C1C] px-3 py-2 text-white border-none">
          <span>Tooltip</span>
          {(variant === "command" || variant === "command-palette" || variant === "full") && (
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-800">
              <Command className="h-3 w-3" />
            </div>
          )}
          {(variant === "command-palette" || variant === "full") && (
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-800">
              <CommandShortcut className="h-3 w-3" />
            </div>
          )}
          {variant === "full" && (
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-800">
              <ArrowUp className="h-3 w-3" />
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

