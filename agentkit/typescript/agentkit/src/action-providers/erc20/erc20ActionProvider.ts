import { z } from "zod";
import { ActionProvider } from "../actionProvider";
import { Network } from "../../network";
import { CreateAction } from "../actionDecorator";
import { GetBalanceSchema, TransferSchema } from "./schemas";
import { abi } from "./constants";
import { encodeFunctionData, Hex } from "viem";
import { EvmWalletProvider } from "../../wallet-providers";

// Important token addresses
const AAPL_TOKEN = "0x55fcbD7fdab0e36C981D8a429f07649D1C19112A" as Hex;
const MSFT_TOKEN = "0x97446cA663df9f015Ad0dA9260164b56A971b11E" as Hex;
const UNI_TOKEN = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984" as Hex;
const DAI_TOKEN = "0x6B175474E89094C44Da98b954EedeAC495271d0F" as Hex;

// Token address to symbol mapping for better error messages
const TOKEN_SYMBOLS: Record<Hex, string> = {
  [AAPL_TOKEN]: "AAPL",
  [MSFT_TOKEN]: "MSFT",
  [UNI_TOKEN]: "UNI",
  [DAI_TOKEN]: "DAI",
};

/**
 * ERC20ActionProvider is an action provider for ERC20 tokens.
 */
export class ERC20ActionProvider extends ActionProvider<EvmWalletProvider> {
  /**
   * Constructor for the ERC20ActionProvider.
   */
  constructor() {
    super("erc20", []);
  }

  /**
   * Gets the balance of an ERC20 token.
   *
   * @param walletProvider - The wallet provider to get the balance from.
   * @param args - The input arguments for the action.
   * @returns A message containing the balance.
   */
  @CreateAction({
    name: "get_balance",
    description: `
    This tool will get the balance of an ERC20 asset in the wallet. It takes the contract address as input.
    `,
    schema: GetBalanceSchema,
  })
  async getBalance(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof GetBalanceSchema>,
  ): Promise<string> {
    try {
      const balance = await walletProvider.readContract({
        address: args.contractAddress as Hex,
        abi,
        functionName: "balanceOf",
        args: [walletProvider.getAddress()],
      });

      return `Balance of ${args.contractAddress} is ${balance}`;
    } catch (error) {
      return `Error getting balance: ${error}`;
    }
  }

  @CreateAction({
    name: "get_every_erc20_balance",
    description: `
    This tool will discover and get the balance of every ERC20 token currently held in the wallet by querying historical transactions.
    `,
    schema: z.object({}),
  })
  async getEveryErc20Balance(
    walletProvider: EvmWalletProvider,
  ): Promise<string> {
    try {
      // Get the wallet's address
      const walletAddress = walletProvider.getAddress();
      
      // Get ETH balance first
      const ethBalance = await walletProvider.getBalance();
      
      // List of important ERC20 tokens to check
      const tokenList = [
        AAPL_TOKEN,
        MSFT_TOKEN,
        UNI_TOKEN,
        DAI_TOKEN,
      ];

      const balances = await Promise.all(
        tokenList.map(async (tokenAddress) => {
          try {
            // First get the token symbol
            const symbol = TOKEN_SYMBOLS[tokenAddress] || await walletProvider.readContract({
              address: tokenAddress,
              abi,
              functionName: "symbol",
            }) as string;

            // Then get the balance
            const balance = await walletProvider.readContract({
              address: tokenAddress,
              abi,
              functionName: "balanceOf",
              args: [walletAddress],
            }) as bigint;

            // Only return tokens with non-zero balance
            if (balance > BigInt(0)) {
              return `${symbol}: ${balance.toString()}`;
            }
            return null;
          } catch (error) {
            console.error(`Error reading token at ${tokenAddress} (${TOKEN_SYMBOLS[tokenAddress] || 'Unknown'}): ${error}`);
            return null;
          }
        })
      );

      // Filter out null values and tokens with zero balance
      const nonZeroBalances = balances.filter((balance): balance is string => balance !== null);
      
      // Start with ETH balance if it's non-zero
      const allBalances: string[] = [];
      if (ethBalance > BigInt(0)) {
        allBalances.push(`ETH: ${ethBalance.toString()}`);
      }
      // Add ERC20 balances
      allBalances.push(...nonZeroBalances);

      if (allBalances.length === 0) {
        return `No non-zero token balances found for ${walletAddress}`;
      }

      return `Token Balances for ${walletAddress}:\n${allBalances.join('\n')}`;
    } catch (error) {
      return `Error getting balances: ${error}`;
    }
  }

  /**
   * Transfers a specified amount of an ERC20 token to a destination onchain.
   *
   * @param walletProvider - The wallet provider to transfer the asset from.
   * @param args - The input arguments for the action.
   * @returns A message containing the transfer details.
   */
  @CreateAction({
    name: "transfer",
    description: `
    This tool will transfer an ERC20 token from the wallet to another onchain address.

It takes the following inputs:
- amount: The amount to transfer
- contractAddress: The contract address of the token to transfer
- destination: Where to send the funds (can be an onchain address, ENS 'example.eth', or Basename 'example.base.eth')

Important notes:
- Ensure sufficient balance of the input asset before transferring
- When sending native assets (e.g. 'eth' on base-mainnet), ensure there is sufficient balance for the transfer itself AND the gas cost of this transfer
    `,
    schema: TransferSchema,
  })
  async transfer(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof TransferSchema>,
  ): Promise<string> {
    try {
      const hash = await walletProvider.sendTransaction({
        to: args.contractAddress as Hex,
        data: encodeFunctionData({
          abi,
          functionName: "transfer",
          args: [args.destination as Hex, BigInt(args.amount)],
        }),
      });

      await walletProvider.waitForTransactionReceipt(hash);

      return `Transferred ${args.amount} of ${args.contractAddress} to ${
        args.destination
      }.\nTransaction hash for the transfer: ${hash}`;
    } catch (error) {
      return `Error transferring the asset: ${error}`;
    }
  }

  /**
   * Checks if the ERC20 action provider supports the given network.
   *
   * @param _ - The network to check.
   * @returns True if the ERC20 action provider supports the network, false otherwise.
   */
  supportsNetwork = (_: Network) => true;
}

export const erc20ActionProvider = () => new ERC20ActionProvider();
