import { ViemWalletProvider } from "./viemWalletProvider";
/**
 * Configuration options for the Privy wallet provider.
 *
 * @interface
 */
interface PrivyWalletConfig {
    /** The Privy application ID */
    appId: string;
    /** The Privy application secret */
    appSecret: string;
    /** The ID of the wallet to use, if not provided a new wallet will be created */
    walletId?: string;
    /** Optional chain ID to connect to */
    chainId?: string;
    /** Optional authorization key for the wallet API */
    authorizationPrivateKey?: string;
    /** Optional authorization key ID for creating new wallets */
    authorizationKeyId?: string;
}
type PrivyWalletExport = {
    walletId: string;
    authorizationPrivateKey: string | undefined;
    chainId: string | undefined;
};
/**
 * A wallet provider that uses Privy's server wallet API.
 * This provider extends the ViemWalletProvider to provide Privy-specific wallet functionality
 * while maintaining compatibility with the base wallet provider interface.
 */
export declare class PrivyWalletProvider extends ViemWalletProvider {
    #private;
    /**
     * Private constructor to enforce use of factory method.
     *
     * @param walletClient - The Viem wallet client instance
     * @param config - The configuration options for the Privy wallet
     */
    private constructor();
    /**
     * Creates and configures a new PrivyWalletProvider instance.
     *
     * @param config - The configuration options for the Privy wallet
     * @returns A configured PrivyWalletProvider instance
     *
     * @example
     * ```typescript
     * const provider = await PrivyWalletProvider.configureWithWallet({
     *   appId: "your-app-id",
     *   appSecret: "your-app-secret",
     *   walletId: "wallet-id",
     *   chainId: "84532"
     * });
     * ```
     */
    static configureWithWallet(config: PrivyWalletConfig): Promise<PrivyWalletProvider>;
    /**
     * Gets the name of the wallet provider.
     *
     * @returns The string identifier for this wallet provider
     */
    getName(): string;
    /**
     * Exports the wallet data.
     *
     * @returns The wallet data
     */
    exportWallet(): PrivyWalletExport;
}
export {};
