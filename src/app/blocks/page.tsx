"use client"

import { Card } from "@/components/ui/card"

export default function StackedCards() {
  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      <div className="relative h-[280px] w-full">
        {/* Stripe Card */}
        <Card className="absolute inset-x-0 h-48 bg-[#635bff] text-white p-6 transform transition-all duration-300 hover:-translate-y-2 cursor-pointer">
          <div className="flex justify-end">
            <span className="text-2xl font-semibold">stripe</span>
          </div>
        </Card>

        {/* PayPal Card */}
        <Card className="absolute inset-x-0 top-[30px] h-48 bg-white p-6 transform transition-all duration-300 hover:-translate-y-2 cursor-pointer">
          <div className="flex justify-end">
            <span className="text-2xl font-semibold text-[#003087]">PayPal</span>
          </div>
        </Card>

        {/* Balance Card */}
        <Card className="absolute inset-x-0 top-[60px] h-48 bg-black text-white p-6 transform transition-all duration-300 hover:-translate-y-2 cursor-pointer">
          <div className="flex flex-col justify-end h-full">
            <span className="text-4xl font-bold">$120,000</span>
            <span className="text-gray-400 mt-2">Total Balance</span>
          </div>
        </Card>
      </div>
    </div>
  )
}