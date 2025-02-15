import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Pyth contract address on Base Sepolia
const SEPOLIA_PYTH_CONTRACT = "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729";
const INITIAL_ETH_POOL = BigInt("100000000000000000"); // 0.1 ETH in wei

const AppleTokenModuleV2 = buildModule("AppleTokenModuleV2", (m) => {
  const appleToken = m.contract("AppleToken", [SEPOLIA_PYTH_CONTRACT], {
    value: INITIAL_ETH_POOL,
  });

  return { appleToken };
});

export default AppleTokenModuleV2;