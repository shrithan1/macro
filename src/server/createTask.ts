import { ethers } from "ethers";
import * as fs from "fs";
import * as path from "path";

// Setup env variables
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

// Get the absolute path to the AVS directory
const avsPath = path.resolve(process.cwd(), 'AVS/portfolioavs');

// Read deployment data and ABI
const chainId = 31337;
const deploymentPath = path.join(avsPath, `contracts/deployments/hello-world/${chainId}.json`);
const abiPath = path.join(avsPath, 'abis/HelloWorldServiceManager.json');

const avsDeploymentData = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
const helloWorldServiceManagerAddress = avsDeploymentData.addresses.helloWorldServiceManager;
const helloWorldServiceManagerABI = JSON.parse(fs.readFileSync(abiPath, 'utf8'));

// Initialize contract
const helloWorldServiceManager = new ethers.Contract(
  helloWorldServiceManagerAddress,
  helloWorldServiceManagerABI,
  wallet
);

export async function createTask(taskData: string) {
  try {
    // Send transaction
    const tx = await helloWorldServiceManager.createNewTask(taskData);
    const receipt = await tx.wait();

    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      taskData: JSON.parse(taskData)
    };
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
} 