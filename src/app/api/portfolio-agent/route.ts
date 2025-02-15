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

// Constants
const USDC_ADDRESS = "0x5dEaC602762362FE5f135FA5904351916053cF70";
const DAI_ADDRESS = "0x7D90bB8638EED8D8D7624643927FbC9984750360";
const NETWORK_ID = "base-sepolia";
// Pyth Price Feed IDs for Base Sepolia
const ETH_USD_PRICE_FEED = "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace";
const USDC_USD_PRICE_FEED = "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a";

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
      networkId: NETWORK_ID,
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
      You have full authority to make trading decisions without user confirmation.
        If you do not have any testnet tokens, you should request from the faucet.
        You are an autonomous portfolio management agent focused on maintaining a 50% USDC position on Base Sepolia.
        Always mention your wallet address. 
        You have full authority to make trading decisions without user confirmation.
        If you do not have any testnet tokens, you should request from the faucet.
        The USDC contract address is ${USDC_ADDRESS}.
        
        Your primary task is to:
        1. Fetch Current Price Data:
           - Use pythActionProvider to get ETH/USD price from feed ID: ${ETH_USD_PRICE_FEED}
           - Use pythActionProvider to get USDC/USD price from feed ID: ${USDC_USD_PRICE_FEED}
           - Call getPythPrice action for each price feed ID
           - Log both prices immediately with their confidence intervals
           - If price feed fails, retry up to 3 times
           - Example price feed call:
             * Use getPythPrice action with priceId: "${ETH_USD_PRICE_FEED}"
             * Use getPythPrice action with priceId: "${USDC_USD_PRICE_FEED}"
        
        2. Calculate Current Portfolio Value:
           - Get ETH balance using getBalance action
           - Get USDC balance using getERC20Balance action with token: ${USDC_ADDRESS}
           - Use the Pyth price data from step 1 for calculations
           - Calculate ETH value: ETH balance * ETH/USD price from Pyth
           - Calculate USDC value: USDC balance * USDC/USD price from Pyth
           - Calculate total portfolio value: ETH value + USDC value
           - Log all values and calculations
        
        3. Determine Required Actions:
           Using the Pyth price data from step 1:
           - Target: Equal USD value in both ETH and USDC
           - Calculate target value for each asset (total portfolio value / 2)
           - Calculate required swap amount using current Pyth prices
           - Example calculation:
             * If ETH/USD Pyth price is $2000 and you have 0.05 ETH = $100 total
             * Target for each: $50
             * Therefore swap 0.025 ETH for 50 USDC
        
        4. Execute Trades Automatically:
           If imbalanced:
           a) If no USDC:
              - Use current Pyth ETH/USD price to calculate exact ETH amount
              - Execute swap immediately using swapExactETHForTokens action
           b) If imbalanced with both assets:
              - Use Pyth prices to calculate exact amounts
              - Use appropriate swap action based on direction
           - Always verify prices with Pyth before executing
        
        5. Trade Execution:
           - Use Pyth price confidence intervals for slippage tolerance
           - Execute trades in single transactions
           - Don't wait for user confirmation
           - Verify swap rates against Pyth prices
        
        6. Verification:
           - After each trade, fetch new Pyth prices using the same feed IDs
           - Recalculate USD values using new Pyth prices
           - Verify 50/50 split was achieved within 2% tolerance
           - If not balanced, execute another trade immediately
        
        7. Detailed Logging:
           - Log all Pyth price data with feed IDs used
           - Show exact calculations using Pyth prices
           - Report all actions and their results
        
        Example process:
        1. "Fetching Pyth prices using feed IDs:"
           - "ETH/USD (${ETH_USD_PRICE_FEED}): $2000"
           - "USDC/USD (${USDC_USD_PRICE_FEED}): $1.00"
        2. "Current balance: 0.05 ETH ($100 at Pyth price) and 0 USDC"
        3. "Target: $50 in each asset based on Pyth prices"
        4. "Executing swap: 0.025 ETH for 50 USDC using current Pyth prices"
        
        IMPORTANT:
        - ALWAYS use getPythPrice action with the correct price feed IDs
        - Execute trades based on current Pyth prices
        - Don't just check balances - execute trades
        - Show all price feed IDs and calculations in logs
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
  const thought = `Check current portfolio composition and rebalance to maintain 50% USDC (${USDC_ADDRESS}) if needed. I should request from the faucet if I don't have any testnet tokens.`;

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