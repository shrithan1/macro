import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";
const SEPOLIA_PRIVATE_KEY = "2fa8efe237294d598f4c2699f69a0a9228c5263805a408dffabbea6dcf6e4105";
const PRIVATE_KEY = "2fa8efe237294d598f4c2699f69a0a9228c5263805a408dffabbea6dcf6e4105";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    "base-mainnet": {
     url: 'https://mainnet.base.org',
     accounts: [PRIVATE_KEY],
     gasPrice: 1000000000,
   },
   // for Base Sepolia testnet
   "base-sepolia": {
     url: "https://sepolia.base.org",
     accounts: [PRIVATE_KEY],
     gasPrice: 1000000000,
   },
   // for local dev environment
   "base-local": {
     url: "http://localhost:8545",
     accounts: [PRIVATE_KEY],
     gasPrice: 1000000000,
   },
 },
};

export default config; 