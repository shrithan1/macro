"use client"

import Image from "next/image"

const assets = [
    {
        name: "Bitcoin",
        symbol: "BTC",
        price: 100000
    }
]

export default function AvailableAssets() {
    return (
        <div className="flex flex-col items-center justify-center p-8 gap-8">
            <div className="w-full max-w-[800px]">
                <div>
                    {/* logo */}
                    {/* name */}
                </div>
                {/* price */}
            </div>
        </div>
    )
}
