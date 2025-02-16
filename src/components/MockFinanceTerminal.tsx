"use client"

import { useState, useEffect } from "react"

const commands = [
  "Scanning market trends...",
  "Analyzing token prices...",
  "Monitoring stock fluctuations...",
  "Calculating risk metrics...",
  "Executing algorithmic trades...",
  "Updating portfolio balances...",
  "Fetching real-time forex data...",
  "Predicting market movements...",
  "Evaluating cryptocurrency volatility...",
  "Assessing liquidity ratios...",
  "Compiling financial reports...",
  "Simulating market scenarios...",
]

const statusMessages = [
  "Market analysis in progress",
  "High volatility detected",
  "Bull market indicators strong",
  "Bear market warning",
  "Unusual trading activity observed",
]

const currencies = ["BTC", "ETH", "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY"]

export function MockFinanceTerminal() {
  const [currentCommand, setCurrentCommand] = useState("")
  const [logs, setLogs] = useState<string[]>([])
  const [status, setStatus] = useState("")
  const [randomPrice, setRandomPrice] = useState("0.00")
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const scheduleNextCommand = () => {
      const delay = Math.floor(Math.random() * (3000 - 800 + 1) + 800) // Random delay between 800ms and 3000ms
      setTimeout(() => {
        const newCommand = commands[Math.floor(Math.random() * commands.length)]
        setCurrentCommand(newCommand)
        setLogs((prevLogs) => [...prevLogs, newCommand].slice(-8))
        scheduleNextCommand()
      }, delay)
    }

    scheduleNextCommand()

    const statusInterval = setInterval(() => {
      const newStatus = statusMessages[Math.floor(Math.random() * statusMessages.length)]
      setStatus(newStatus)
    }, 5000)

    const priceInterval = setInterval(() => {
      const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)]
      const price = (Math.random() * 1000).toFixed(2)
      setRandomPrice(`${randomCurrency}: $${price}`)
    }, 3000)

    return () => {
      clearInterval(statusInterval)
      clearInterval(priceInterval)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="border rounded-lg p-4 bg-white text-gray-800 shadow-sm font-mono">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#180D68] animate-[pulse-rotate-scale_4s_ease-in-out_infinite]"></span>
            <span className="text-base font-medium">Finance Terminal</span>
          </div>
          <div className="text-sm text-[#180D68]">{status}</div>
        </div>
        <div className="h-48 overflow-y-auto mb-2 border border-gray-200 rounded p-2 bg-gray-50">
          {logs.map((log, index) => (
            <div key={index} className="py-1 text-sm">
              <span className="text-[#180D68]">$</span> {log}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <span className="text-[#180D68] mr-2">$</span>
            <span className="animate-pulse">{currentCommand}</span>
          </div>
          <div className="text-[#180D68] font-bold">{currentTime}</div>
        </div>
        <style jsx>{`
  @keyframes pulse-rotate-scale {
    0%, 100% { 
      transform: rotate(0deg) scale(1);
    }
    25% {
      transform: rotate(180deg) scale(1.2);
    }
    50% { 
      transform: rotate(360deg) scale(1);
    }
    75% {
      transform: rotate(540deg) scale(0.8);
    }
  }
`}</style>
      </div>
    </div>
  )
}
