import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Verified Sepolia Pyth contract address with correct checksum
const SEPOLIA_PYTH_CONTRACT = "0x2880ec3b069e5e311299a0d7be51ee5eda0e0a5b";
const INITIAL_ETH_POOL = BigInt("100000000000000000"); // 0.1 ETH in wei

const NvidiaTokenModule = buildModule("NvidiaTokenModule", (m) => {
  const nvidiaToken = m.contract("NvidiaToken", [SEPOLIA_PYTH_CONTRACT], {
    value: INITIAL_ETH_POOL,
  });

  return { nvidiaToken };
});

export default NvidiaTokenModule;