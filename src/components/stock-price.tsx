"use client"

import { Apple } from "lucide-react"
import { Card } from "@/components/ui/card"

export default async function StockPrice() {
  const price = await fetch("wss://ws.twelvedata.com/v1/quotes/price?apikey=9c75e4ac46f344bba3d84aa44fd0856e")
  return (
    <Card className="w-full max-w-sm p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
          <Apple className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Apple Inc.</h2>
          <p className="text-sm text-muted-foreground">AAPL</p>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">$184.37</span>
          <span className="text-sm font-medium text-green-600">+2.35 (1.29%)</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </Card>
  )
}