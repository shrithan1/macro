"use client"

import { useState } from "react"
import { Handle, Position } from "reactflow"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const mockPrices = {
  AAPL: "150.23",
  GOOGL: "2750.01",
  MSFT: "305.94",
  AMZN: "3305.78",
  FB: "330.05",
}

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

export function StockNode({ data }: { data: { stock: string } }) {
  const [stock, setStock] = useState(data.stock || "")

  return (
    <motion.div
      className="bg-blue-100 text-blue-900 border-2 border-blue-300 rounded-none p-4 w-48"
      variants={nodeVariants}
      initial="hidden"
      animate="visible"
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Stock</h3>
        <span className="text-sm font-medium">${stock ? mockPrices[stock] : "0.00"}</span>
      </div>
      <Select value={stock} onValueChange={setStock}>
        <SelectTrigger className="w-full mb-2">
          <SelectValue placeholder="Select a stock" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AAPL">Apple (AAPL)</SelectItem>
          <SelectItem value="GOOGL">Alphabet (GOOGL)</SelectItem>
          <SelectItem value="MSFT">Microsoft (MSFT)</SelectItem>
          <SelectItem value="AMZN">Amazon (AMZN)</SelectItem>
          <SelectItem value="FB">Meta (FB)</SelectItem>
        </SelectContent>
      </Select>
      <Button size="sm" className="w-full bg-blue-200 text-blue-900 hover:bg-blue-300">
        Analyze
      </Button>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </motion.div>
  )
}

export function PortfolioNode({ data }: { data: { allocation: string } }) {
  const [allocation, setAllocation] = useState(data.allocation || "")

  return (
    <motion.div
      className="bg-green-100 text-green-900 border-2 border-green-300 rounded-none p-4 w-48"
      variants={nodeVariants}
      initial="hidden"
      animate="visible"
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <h3 className="font-semibold mb-2">Portfolio</h3>
      <Select onValueChange={setAllocation} defaultValue={allocation}>
        <SelectTrigger className="w-full mb-2">
          <SelectValue placeholder="Allocation Strategy" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="conservative">Conservative</SelectItem>
          <SelectItem value="moderate">Moderate</SelectItem>
          <SelectItem value="aggressive">Aggressive</SelectItem>
        </SelectContent>
      </Select>
      <Button size="sm" className="w-full bg-green-200 text-green-900 hover:bg-green-300">
        Rebalance
      </Button>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </motion.div>
  )
}

export function AnalysisNode() {
  return (
    <motion.div
      className="bg-purple-100 text-purple-900 border-2 border-purple-300 rounded-none p-4 w-48"
      variants={nodeVariants}
      initial="hidden"
      animate="visible"
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <h3 className="font-semibold mb-2">Analysis</h3>
      <Button size="sm" className="w-full mb-2 bg-purple-200 text-purple-900 hover:bg-purple-300">
        Generate Report
      </Button>
      <Button size="sm" variant="outline" className="w-full border-purple-300 text-purple-900 hover:bg-purple-200">
        Export Data
      </Button>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </motion.div>
  )
}

export function BrainNode({ data }: { data: { text: string } }) {
  const [text, setText] = useState(data.text || "")

  return (
    <motion.div
      className="bg-yellow-100 text-yellow-900 border-2 border-yellow-300 rounded-none p-4 w-64"
      variants={nodeVariants}
      initial="hidden"
      animate="visible"
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <h3 className="font-semibold mb-2">Brain</h3>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your thoughts..."
        className="w-full h-24 mb-2"
      />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />
    </motion.div>
  )
}

