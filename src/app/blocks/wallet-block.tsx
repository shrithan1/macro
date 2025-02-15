import Image from "next/image"

export default function WalletCard() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] bg-[#040404] rounded-[32px] overflow-hidden">
        {/* Service Logos Section */}
        <div className="flex flex-col">
          <div className="bg-[#636fdd] p-4">
            <span className="text-white text-xl font-light">stripe</span>
          </div>
          <div className="bg-[#f6851b] p-4 flex items-center gap-2">
            <Image
              src="/metamask.png"
              alt="Metamask logo"
              width={24}
              height={24}
              className="rounded"
            />
            <span className="text-white text-xl font-light">metamask</span>
          </div>
        </div>

        {/* Balance Section */}
        <div className="p-8">
          <div className="flex items-baseline gap-0.5">
            <span className="text-white text-4xl font-light">$</span>
            <span className="text-white text-4xl font-light">1,012</span>
            <span className="text-white text-4xl font-light">.47</span>
          </div>
          <div className="mt-1">
            <span className="text-[#838383] text-sm">Total Balance</span>
          </div>
        </div>
      </div>
    </div>
  )
}