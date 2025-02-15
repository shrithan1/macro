import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
};


require("@nomicfoundation/hardhat-toolbox");

// Ensure your configuration variables are set before executing the script
const { vars } = require("hardhat/config");

// Go to https://alchemy.com, sign up, create a new App in
// its dashboard, and add its key to the configuration variables
const ALCHEMY_API_KEY = "uVDZyUXEkTm7v0E9m83VIJq8yOidXWNM";

// Add your Sepolia account private key to the configuration variables
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = "2fa8efe237294d598f4c2699f69a0a9228c5263805a408dffabbea6dcf6e4105";
const PRIVATE_KEY = "2fa8efe237294d598f4c2699f69a0a9228c5263805a408dffabbea6dcf6e4105";

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    "base-mainnet": {
     url: 'https://mainnet.base.org',
     accounts: [PRIVATE_KEY],
     gasPrice: 1000,
   },
   // for Base Sepolia testnet
   "base-sepolia": {
     url: "https://sepolia.base.org",
     accounts: [PRIVATE_KEY],
     gasPrice: 1000,
   },
   // for local dev environment
   "base-local": {
     url: "http://localhost:8545",
     accounts: [PRIVATE_KEY],
     gasPrice: 1000,
   },
 },
 defaultNetwork: "base-sepolia",
}

export default config;