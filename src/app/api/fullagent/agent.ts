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
const AAPL_TOKEN = "0x55fcbD7fdab0e36C981D8a429f07649D1C19112A" as Hex;
const MSFT_TOKEN = "0x97446cA663df9f015Ad0dA9260164b56A971b11E" as Hex;
const VOO_TOKEN = "0x8d7d51c2fF7ad78e8c8D16e797c28f0Bf2eB5AFC" as Hex;
const NVIDIA_TOKEN = "0xc38cC5B373214b5D8B05b6ed97FEC73E3752aA6B" as Hex;
const WRAPPED_BTC_TOKEN = "0x92f3B59a79bFf5dc60c0d59eA13a44D082B2bdFC" as Hex;
const USDC_TOKEN = "0x5dEaC602762362FE5f135FA5904351916053cF70" as Hex;
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

    // Create React Agent using the LLM and CDP AgentKit tools
    const agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier: `
          You are a helpful agent that can interact onchain using the Coinbase Developer Platform AgentKit. You are 
          empowered to interact onchain using your tools. If you ever need funds, you can request them from the 
          faucet if you are on network ID 'base-sepolia'. If not, you can provide your wallet details and request 
          funds from the user.

          You can fetch the current AAPL/USD price using the Pyth price feed:
          - Use getPythPrice action with priceId: "${AAPL_USD_PRICE_FEED}"

          You can fetch the current MSFT/USD price using the Pyth price feed:
          - Use getPythPrice action with priceId: "${MSFT_USD_PRICE_FEED}"

          You can fetch the current NVIDIA/USD price using the Pyth price feed:
          - Use getPythPrice action with priceId: "${NVIDIA_USD_PRICE_FEED}"

          You can fetch the current VOO/USD price using the Pyth price feed:
          - Use getPythPrice action with priceId: "${VOO_USD_PRICE_FEED}"

          You can fetch the current ABNB/USD price using the Pyth price feed:
          - Use getPythPrice action with priceId: "${ABNB_USD_PRICE_FEED}"
          
          - Include confidence intervals when reporting prices
          - Retry up to 3 times if the price feed fails
          
          You can get the balance of every ERC20 token currently held in the wallet by using the getEveryErc20Balance tool.
          The following ERC20 tokens and their respective addresses are available:
          - AAPL Token: ${AAPL_TOKEN}
          - MSFT Token: ${MSFT_TOKEN}
          - VOO Token: ${VOO_TOKEN}
          - NVIDIA Token: ${NVIDIA_TOKEN}
          - Wrapped BTC: ${WRAPPED_BTC_TOKEN}
          - USDC Token: ${USDC_TOKEN}
          - Base ETH: ${BASE_ETH}
          Before executing your first action, get the wallet details to see what network 
          you're on. If there is a 5XX (internal) HTTP error code, ask the user to try again later. If someone 
          asks you to do something you can't do with your currently available tools, you must say so, and 
          encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to 
          docs.cdp.coinbase.com for more information. Be concise and helpful with your responses. Refrain from 
          restating your tools' descriptions unless it is explicitly requested.
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
            await createNewTask(JSON.stringify(taskData));
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