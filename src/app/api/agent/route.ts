import {
  AgentKit,
  CdpWalletProvider,
  wethActionProvider,
  walletActionProvider,
  erc20ActionProvider,
  cdpApiActionProvider,
  cdpWalletActionProvider,
  pythActionProvider,
} from "@coinbase/agentkit";
import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";

// Store wallet data in memory for demo purposes
let walletData: string | undefined = undefined;

// Store agent instance in memory
let agentInstance: ReturnType<typeof createReactAgent> | null = null;

export async function POST(req: Request) {
  try {
    const { action, message } = await req.json();

    if (action === 'initialize') {
      // Initialize LLM
      const llm = new ChatOpenAI({
        model: "gpt-4o-mini",
      });

      // Configure CDP Wallet Provider
      const config = {
        apiKeyName: process.env.CDP_API_KEY_NAME,
        apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
        cdpWalletData: walletData,
        networkId: process.env.NETWORK_ID || "base-sepolia",
      };

      const walletProvider = await CdpWalletProvider.configureWithWallet(config);

      // Initialize AgentKit
      const agentkit = await AgentKit.from({
        walletProvider,
        actionProviders: [
          wethActionProvider(),
          pythActionProvider(),
          walletActionProvider(),
          erc20ActionProvider(),
          cdpApiActionProvider({
            apiKeyName: process.env.CDP_API_KEY_NAME,
            apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(
              /\\n/g,
              "\n"
            ),
          }),
          cdpWalletActionProvider({
            apiKeyName: process.env.CDP_API_KEY_NAME,
            apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(
              /\\n/g,
              "\n"
            ),
          }),
        ],
      });

      const tools = await getLangChainTools(agentkit);

      // Store buffered conversation history in memory
      const memory = new MemorySaver();

      // Create React Agent using the LLM and CDP AgentKit tools
      agentInstance = createReactAgent({
        llm,
        tools,
        checkpointSaver: memory,
        messageModifier: `
          You are a helpful agent that can interact onchain using the Coinbase Developer Platform AgentKit. You are 
          empowered to interact onchain using your tools. If you ever need funds, you can request them from the 
          faucet if you are on network ID 'base-sepolia'. If not, you can provide your wallet details and request 
          funds from the user. Before executing your first action, get the wallet details to see what network 
          you're on. If there is a 5XX (internal) HTTP error code, ask the user to try again later. If someone 
          asks you to do something you can't do with your currently available tools, you must say so, and 
          encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to 
          docs.cdp.coinbase.com for more information. Be concise and helpful with your responses. Refrain from 
          restating your tools' descriptions unless it is explicitly requested.
          `,
      });

      // Save wallet data
      const exportedWallet = await walletProvider.exportWallet();
      walletData = JSON.stringify(exportedWallet);

      return NextResponse.json({ success: true, message: "Agent initialized successfully" });
    } else if (action === 'chat' && message && agentInstance) {
      // Handle chat messages here
      // For now, return a simple response
      return NextResponse.json({ 
        success: true, 
        message: "Chat functionality will be implemented in the next iteration" 
      });
    }

    return NextResponse.json({ 
      success: false, 
      error: "Invalid action or agent not initialized" 
    }, { status: 400 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }, { status: 500 });
  }
}