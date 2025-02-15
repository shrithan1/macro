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
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";

// Store agent instance in memory
let agentInstance: ReturnType<typeof createReactAgent> | null = null;
let walletData: string | undefined = undefined;

async function initializePortfolioAgent() {
  try {
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
      networkId: "base-sepolia", // Force Base Sepolia network
    };

    const walletProvider = await CdpWalletProvider.configureWithWallet(config);

    // Initialize AgentKit with focus on portfolio management actions
    const agentkit = await AgentKit.from({
      walletProvider,
      actionProviders: [
        wethActionProvider(),
        walletActionProvider(),
        erc20ActionProvider(),
        pythActionProvider(),
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
    const memory = new MemorySaver();

    // Create React Agent specifically for portfolio management
    agentInstance = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier: `
        You are a specialized portfolio management agent focused on maintaining a 50% USDC position on Base Sepolia.
        Your primary task is to:
        1. Check current wallet balances and portfolio composition
        2. Calculate the current percentage of USDC in the portfolio
        3. If USDC percentage is not 50% (with 2% tolerance):
           - If too low: Swap other assets for USDC
           - If too high: Swap USDC for other stable assets
        4. Use price feeds to ensure accurate valuations
        5. Be mindful of gas fees and slippage
        6. Provide clear explanations of your actions and current portfolio status
        Always verify you're on base-sepolia network before making any transactions.
        If you encounter any errors, especially 5XX errors, wait briefly and try again.
        Be concise in your responses and focus solely on portfolio management.
        `,
    });

    // Save wallet data
    const exportedWallet = await walletProvider.exportWallet();
    walletData = JSON.stringify(exportedWallet);

    return { success: true, message: "Portfolio agent initialized successfully" };
  } catch (error) {
    console.error("Failed to initialize portfolio agent:", error);
    throw error;
  }
}

async function runPortfolioRebalance() {
  if (!agentInstance) {
    throw new Error("Agent not initialized");
  }

  const config = { configurable: { thread_id: "Portfolio Agent" } };
  const thought = "Check current portfolio composition and rebalance to maintain 50% USDC if needed.";

  try {
    const stream = await agentInstance.stream(
      { messages: [new HumanMessage(thought)] },
      config
    );

    const messages = [];
    for await (const chunk of stream) {
      if ("agent" in chunk) {
        messages.push(chunk.agent.messages[0].content);
      } else if ("tools" in chunk) {
        messages.push(chunk.tools.messages[0].content);
      }
    }

    return { success: true, messages };
  } catch (error) {
    console.error("Portfolio rebalance error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// API Routes
export async function POST(req: Request) {
  try {
    const { action } = await req.json();

    if (action === "initialize") {
      const result = await initializePortfolioAgent();
      return NextResponse.json(result);
    } else if (action === "rebalance") {
      if (!agentInstance) {
        return NextResponse.json(
          { success: false, error: "Agent not initialized" },
          { status: 400 }
        );
      }
      const result = await runPortfolioRebalance();
      return NextResponse.json(result);
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
} 