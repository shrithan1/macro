"use client";

import {
  AgentKit,
  CdpWalletProvider,
  wethActionProvider,
  walletActionProvider,
  erc20ActionProvider,
  cdpApiActionProvider,
  cdpWalletActionProvider,
  pythActionProvider,
  morphoActionProvider,
  erc721ActionProvider,
  EvmWalletProvider
} from "@coinbase/agentkit";
import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as readline from "readline";
import { CreateAction } from "@coinbase/agentkit";
import { z } from "zod";
import { Hex } from "viem";
import { createNewTask } from "../../../../AVS/portfolioavs/operator/createNewTasks";
dotenv.config();

// Add this after the imports and before validateEnvironment()
const AAPL_USD_PRICE_FEED = "0x49f6b65cb1de6b10eaf75e7c03ca029c306d0357e91b5311b175084a5ad55688";
const MSFT_USD_PRICE_FEED = "0xd0ca23c1cc005e004ccf1db5bf76aeb6a49218f43dac3d4b275e92de12ded4d1";
const NVIDIA_USD_PRICE_FEED = "0xb1073854ed24cbc755dc527418f52b7d271f6cc967bbf8d8129112b18860a593";
const VOO_USD_PRICE_FEED = "0x236b30dd09a9c00dfeec156c7b1efd646c0f01825a1758e3e4a0679e3bdff179";
const ABNB_USD_PRICE_FEED = "0xccab508da0999d36e1ac429391d67b3ac5abf1900978ea1a56dab6b1b932168e";
const USDC_PRICE_FEED = "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a" as Hex;
const ETH_PRICE_FEED = "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace" as Hex;
const AAPL_TOKEN = "0xf0EBCCe7D5649a02F339Cd8762d05D9183a46719" as Hex;
const MSFT_TOKEN = "0x97446cA663df9f015Ad0dA9260164b56A971b11E" as Hex;
const VOO_TOKEN = "0x8d7d51c2fF7ad78e8c8D16e797c28f0Bf2eB5AFC" as Hex;
const NVIDIA_TOKEN = "0xc38cC5B373214b5D8B05b6ed97FEC73E3752aA6B" as Hex;
const WRAPPED_BTC_TOKEN = "0x92f3B59a79bFf5dc60c0d59eA13a44D082B2bdFC" as Hex;
const USDC_TOKEN = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Hex;
const BASE_ETH = "0x4200000000000000000000000000000000000006" as Hex;

/**
 * Validates that required environment variables are set
 *
 * @throws {Error} - If required environment variables are missing
 * @returns {void}
 */
function validateEnvironment(): void {
  const missingVars: string[] = [];

  // Check required variables
  const requiredVars = [
    "OPENAI_API_KEY",
    "CDP_API_KEY_NAME",
    "CDP_API_KEY_PRIVATE_KEY",
  ];
  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  // Exit if any required variables are missing
  if (missingVars.length > 0) {
    console.error("Error: Required environment variables are not set");
    missingVars.forEach((varName) => {
      console.error(`${varName}=your_${varName.toLowerCase()}_here`);
    });
    process.exit(1);
  }

  // Warn about optional NETWORK_ID
  if (!process.env.NETWORK_ID) {
    console.warn(
      "Warning: NETWORK_ID not set, defaulting to base-sepolia testnet"
    );
  }
}

// Add this right after imports and before any other code
validateEnvironment();

// Configure a file to persist the agent's CDP MPC Wallet Data
const WALLET_DATA_FILE = "wallet_data.txt";

/**
 * Initialize the agent with CDP Agentkit
 *
 * @returns Agent executor and config
 */
export async function initializeAgent() {
  try {
    // Initialize LLM
    const llm = new ChatOpenAI({
      model: "gpt-4o-mini",
    });

    let walletDataStr: string | null = null;

    // Read existing wallet data if available
    if (fs.existsSync(WALLET_DATA_FILE)) {
      try {
        walletDataStr = fs.readFileSync(WALLET_DATA_FILE, "utf8");
      } catch (error) {
        console.error("Error reading wallet data:", error);
        // Continue without wallet data
      }
    }

    // Configure CDP Wallet Provider
    const config = {
      apiKeyName: process.env.CDP_API_KEY_NAME,
      apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      ),
      cdpWalletData: walletDataStr || undefined,
      networkId: "base-mainnet",
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
        morphoActionProvider(),
        erc721ActionProvider(),
      ],
    });

    const tools = await getLangChainTools(agentkit);

    // Store buffered conversation history in memory
    const memory = new MemorySaver();
    const agentConfig = {
      configurable: { thread_id: "CDP AgentKit Chatbot Example!" },
    };

    
    const agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier: `
          You are a helpful agent that can interact onchain using the Coinbase Developer Platform AgentKit. Everytime you speak, you will be very serious as if you are a portfolio execution bot. 
          Therefore, you will show no emotion, You are only to give the professional overview what you are doing.
          You are empowered to interact onchain using your tools. 

          For each of the following tokens, each token is worth the value of their getPythPrice.
          Before executing any trades, you must:
          1. First fetch the current price of AAPL using getPythPrice with priceId: "${AAPL_USD_PRICE_FEED}"
          2. Calculate the USD value of any token trades based on the current AAPL price
          3. Only proceed with trades if AAPL price > $200
          4. When trading between USDC and ETH:
             - First get ETH/USD price from getPythPrice with priceId: "${ETH_PRICE_FEED}"
             - Calculate exact amounts needed to achieve equal USD values
             - Execute trades with proper decimal handling (USDC: 6 decimals, ETH: 18 decimals)
             - Report all prices and calculations before and after trades

          You can fetch prices using the Pyth price feeds:
          - USDC/USD price is always 1
          - AAPL/USD price: getPythPrice with priceId: "${AAPL_USD_PRICE_FEED}"
          - ETH/USD price: getPythPrice with priceId: "${ETH_PRICE_FEED}"
          - MSFT/USD price: getPythPrice with priceId: "${MSFT_USD_PRICE_FEED}"
          - NVIDIA/USD price: getPythPrice with priceId: "${NVIDIA_USD_PRICE_FEED}"
          - VOO/USD price: getPythPrice with priceId: "${VOO_USD_PRICE_FEED}"
          - ABNB/USD price: getPythPrice with priceId: "${ABNB_USD_PRICE_FEED}"

          Always:
          - Include confidence intervals when reporting prices
          - Retry up to 3 times if any price feed fails
          - Handle token decimals correctly (USDC: 6, ETH: 18)
          - Show all calculations and USD values before and after trades
          `,
    });

    // Save wallet data
    const exportedWallet = await walletProvider.exportWallet();
    fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(exportedWallet));

    return { agent, config: agentConfig };
  } catch (error) {
    console.error("Failed to initialize agent:", error);
    throw error;
  }
}

/**
 * Run the agent interactively based on user input
 */
async function runChatMode(agent: any, config: any) {
  console.log("Starting chat mode... Type 'exit' to end.");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt: string): Promise<string> =>
    new Promise((resolve) => rl.question(prompt, resolve));

  try {
    while (true) {
      const userInput = await question("\nPrompt: ");

      if (userInput.toLowerCase() === "exit") {
        break;
      }

      const stream = await agent.stream(
        { messages: [new HumanMessage(userInput)] },
        config
      );

      for await (const chunk of stream) {
        if ("agent" in chunk) {
          console.log(chunk.agent.messages[0].content);
          // Create new task with agent's response
          try {
            const taskData = {
              timestamp: Date.now(),
              agentResponse: chunk.agent.messages[0].content,
              metadata: {
                source: "agent",
                type: "response",
                currentTime: Date.now()
              }
            };
              await createNewTask(JSON.stringify(taskData));
          } catch (error) {
            console.error("Failed to create new task:", error);
          }
        } else if ("tools" in chunk) {
          console.log(chunk.tools.messages[0].content);
          // Create new task with tool's response
          try {
            const taskData = {
              timestamp: Date.now(),
              toolResponse: chunk.tools.messages[0].content,
              metadata: {
                source: "tool",
                type: "action",
                currentTime: Date.now()
              }
            };
          } catch (error) {
            console.error("Failed to create new task:", error);
          }
        }
        console.log("-------------------");
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    process.exit(1);
  } finally {
    rl.close();
  }
}

/**
 * Main entry point
 */
async function main() {
  try {
    const { agent, config } = await initializeAgent();
    await runChatMode(agent, config);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    process.exit(1);
  }
}

// Start the agent when running directly
if (require.main === module) {
  console.log("Starting Agent...");
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}