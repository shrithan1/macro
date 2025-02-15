import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col items-center gap-2">
        <div className="text-lg text-gray-600 font-normal bg-gray-200 py-1 rounded-full px-3">we put</div>
        <div className="text-6xl ">Stocks on Chain</div>
        <div className="text-xl text-center text-gray-600">
          Our agents craft & execute portfolio management<br />
          strategies so you can print money
        </div>
      </div>

    </div>
  );
}
