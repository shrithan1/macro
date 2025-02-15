"use client";
import React, { useState, useEffect, useRef } from "react";

const AGENT_SERVER_URL = process.env.NEXT_PUBLIC_AGENT_SERVER_URL || "http://localhost:3001";

// Add these types at the top of the file
interface Asset {
  symbol: string;
  weight: number;
  price: number;
}

interface PortfolioData {
  timestamp: number;
  portfolio: {
    assets: Asset[];
    totalValue: number;
    metadata: {
      rebalanceRequired: boolean;
      lastUpdated: string;
      portfolioRisk: string;
      currentTime: number;
    };
  };
}

function DeployAgentButton() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [mode, setMode] = useState<"chat" | "auto">("chat");
  const [isInitialized, setIsInitialized] = useState(false);
  const [userInput, setUserInput] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check agent status on component mount
  useEffect(() => {
    checkAgentStatus();
    loadMessageHistory();
    return () => {
      // Clear interval on component unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const checkAgentStatus = async () => {
    try {
      const response = await fetch(`${AGENT_SERVER_URL}/status`);
      const data = await response.json();
      setIsInitialized(data.initialized);
    } catch (error) {
      console.error("Failed to check agent status:", error);
    }
  };

  const loadMessageHistory = async () => {
    try {
      const response = await fetch(`${AGENT_SERVER_URL}/history`);
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Failed to load message history:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, `You: ${userInput}`]);
    setLoading(true);

    try {
      const response = await fetch(`${AGENT_SERVER_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Add all responses to the messages
      data.messages.forEach((msg: string) => {
        setMessages((prev) => [...prev, `Agent: ${msg}`]);
      });
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        `Error: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`,
      ]);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  const sendPortfolioMessage = async () => {
    // Get the saved portfolio data from localStorage
    const savedPortfolioData = localStorage.getItem('portfolioData');
    if (!savedPortfolioData) {
      console.error('No portfolio data found in localStorage');
      return;
    }

    setMessages((prev) => [...prev, `You: ${savedPortfolioData}`]);
    setLoading(true);

    try {
      const response = await fetch(`${AGENT_SERVER_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: savedPortfolioData,
          portfolioData: JSON.parse(savedPortfolioData)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Add all responses to the messages
      data.messages.forEach((msg: string) => {
        setMessages((prev) => [...prev, `Agent: ${msg}`]);
      });
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        `Error: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStartInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      intervalRef.current = setInterval(sendPortfolioMessage, 15000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as "chat" | "auto")}
          className="p-2 border rounded"
          disabled={loading}
        >
          <option value="chat">Chat Mode</option>
          <option value="auto">Auto Mode</option>
        </select>
      </div>

      {messages.length > 0 && (
        <div className="mt-4 p-4 border rounded max-h-96 overflow-auto">
          {messages.map((msg, i) => (
            <div key={i} className="mb-2">
              {msg}
            </div>
          ))}
        </div>
      )}

      {isInitialized && mode === "chat" && (
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded"
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !userInput.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
          <button
            onClick={handleStartInterval}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            {intervalRef.current ? "Stop Sending" : "Start Sending"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Coinbase Agent Chat</h1>
      <DeployAgentButton />
    </div>
  );
}