import { useState, useEffect, useRef } from "react";
import ScrambleHover from "@/components/ScrambleHover";

interface Stock {
  symbol: string;
  price: number;
}

const INITIAL_STOCKS: Stock[] = [
  { symbol: "MSFT", price: 375 },
  { symbol: "AAPL", price: 185 },
  { symbol: "NVDA", price: 495 },
];

const MarketDataSimulator: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const timersRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Update a stock’s price by adding/subtracting up to 1%.
  const updatePrice = (symbol: string) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) => {
        if (stock.symbol === symbol) {
          const randomFactor = Math.random() * 0.01;
          const sign = Math.random() < 0.5 ? -1 : 1;
          const newPrice = stock.price * (1 + sign * randomFactor);
          return { ...stock, price: Math.round(newPrice * 100) / 100 };
        }
        return stock;
      })
    );
    // Schedule the next update at a random delay between 1 and 5 seconds.
    const nextDelay = Math.random() * 4000 + 1000;
    timersRef.current[symbol] = setTimeout(() => updatePrice(symbol), nextDelay);
  };

  useEffect(() => {
    // For each stock, start an independent timer
    stocks.forEach((stock) => {
      if (!timersRef.current[stock.symbol]) {
        const delay = Math.random() * 4000 + 1000;
        timersRef.current[stock.symbol] = setTimeout(
          () => updatePrice(stock.symbol),
          delay
        );
      }
    });
    return () => {
      Object.values(timersRef.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div>
      <h2>Market Data Simulator</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.symbol}>
            {stock.symbol}:{" "}
            <ScrambleHover text={stock.price.toFixed(2)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketDataSimulator;