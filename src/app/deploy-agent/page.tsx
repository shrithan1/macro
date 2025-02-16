"use client";
import React, { useState, useEffect, useRef } from "react";
import {Play, Pause, Loader, Square, User} from "lucide-react"
import { Input } from "@/components/ui/input";
import ReactMarkdown from 'react-markdown';
import { MockFinanceTerminal } from "@/components/MockFinanceTerminal";

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
      // First, send the message to the agent
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
      for (const msg of data.messages) {
        setMessages((prev) => [...prev, `Agent: ${msg}`]);
        
        // Create a task for the agent's response
        try {
          await fetch('/api/create-task', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              timestamp: Date.now(),
              portfolio: {
                assets: [],
                totalValue: 0,
                metadata: {
                  rebalanceRequired: false,
                  lastUpdated: new Date().toISOString(),
                  portfolioRisk: "agent_response",
                  currentTime: Date.now(),
                  agentMessage: msg,
                  source: "agent",
                  type: "response",
                  inResponseTo: userInput
                }
              }
            })
          });
        } catch (taskError) {
          console.error("Failed to create task for agent response:", taskError);
        }
      }

      // Create a task for the user's message
      try {
        await fetch('/api/create-task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            timestamp: Date.now(),
            portfolio: {
              assets: [],
              totalValue: 0,
              metadata: {
                rebalanceRequired: false,
                lastUpdated: new Date().toISOString(),
                portfolioRisk: "user_input",
                currentTime: Date.now(),
                userMessage: userInput,
                source: "user",
                type: "message"
              }
            }
          })
        });
      } catch (taskError) {
        console.error("Failed to create task for user message:", taskError);
      }
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
    const savedPortfolioDataMessage = `Execute comprehensive market analysis:
1. Fetch and report current price data for all available assets (AAPL, MSFT, NVIDIA, VOO, ABNB, ETH, USDC)
2. Calculate and display the following metrics for each asset:
   - current tokens held of each asset in the wallet
   - current USD value of each asset in the wallet
3. Risk assessment:
   - Portfolio concentration metrics
   - Sector exposure analysis
   - Volatility indicators
Do not execute any trades. This is a monitoring and analysis-only operation In the end say that you are done and that you have reported all the findings and that no trades are to be made for now.`;

    const updatedMessage = savedPortfolioDataMessage ? `${savedPortfolioDataMessage} Present findings in a clear, structured format with USD values and percentages where applicable.` : null;
    const savedPortfolioData = JSON.stringify({
      instruction: updatedMessage,
      timestamp: Date.now()
    });
    if (!updatedMessage) {
      console.error('No portfolio data found in localStorage');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${AGENT_SERVER_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: savedPortfolioData
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
      intervalRef.current = setInterval(sendPortfolioMessage, 25000);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8 pt-24">
      {/* Left side - Chat */}
      <div className="flex flex-col space-y-4 max-h-[800px]">
        <div className="flex-1 overflow-auto">
          {messages.length > 0 && (
            <div className="p-4 border rounded bg-gray-50 h-full overflow-auto">
              {messages.map((msg, i) => {
                const isUser = msg.startsWith('You:');
                const messageContent = msg.replace(/^(You:|Agent:)\s/, '');
                
                return (
                  <div key={i}>
                    <div className={`p-3 ${
                      isUser ? 'bg-blue-100 text-blue-900' : 'bg-white text-gray-900'
                    } mb-2`}>
                      <div className="flex items-start gap-2">
                        {isUser ? (
                          <User className="w-4 h-4 mt-1 flex-shrink-0" />
                        ) : (
                          <div className="size-4 mt-1 bg-[#180D68] flex-shrink-0" />
                        )}
                        <div className="font-medium prose prose-sm max-w-none">
                          <ReactMarkdown>
                            {messageContent}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                    {i < messages.length - 1 && (
                      <div className="flex items-center justify-center my-3">
                        <div className="h-px bg-gray-300 w-full"></div>
                        <span className="px-2 text-gray-500 text-sm">•</span>
                        <div className="h-px bg-gray-300 w-full"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {isInitialized && (
          <div className="flex gap-2">
            <Input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded"
              disabled={loading}
              autoFocus
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !userInput.trim()}
              className="px-4 py-2 bg-[#180D68] text-white rounded disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </button>
            <button
              onClick={handleStartInterval}
              disabled={loading}
              className="px-4 py-2 bg-[#180D68] text-white rounded disabled:opacity-50 flex items-center gap-2"
            >
              {intervalRef.current ? (
                <>
                  <Pause className="w-5 h-5" />
                  Stop Strategy
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Deploy Strategy
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Right side - Chart placeholder */}
      {/* <div className="border rounded-lg bg-gray-50 p-4 flex items-center justify-center overflow-auto">
        <div className="text-gray-400 text-center">
          <p className="text-lg font-medium">Chart Coming Soon</p>
          <p className="text-sm">This area will display portfolio analytics and charts</p>
        </div>
      </div> */}
      <div className="col-span-1">
        <MockFinanceTerminal />
      </div>
      
    </div>
  );
}

export default function Page() {
  return (
    <div className="container mx-auto px-8">
      <DeployAgentButton />
    </div>
  );
}