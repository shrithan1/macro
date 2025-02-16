import { ethers } from "ethers";
import * as dotenv from "dotenv";
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

// Initialize provider and wallet for local chain
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
const chainId = 31337;

// Add logging to verify connection
console.log("Connecting to local chain...");
provider.getBlockNumber().then(blockNumber => {
    console.log(`Connected to local chain. Current block number: ${blockNumber}`);
}).catch(error => {
    console.error("Failed to connect to local chain:", error);
});

// Read deployment data and ABI
const avsDeploymentData = JSON.parse(
    fs.readFileSync(
        path.resolve(process.cwd(), `AVS/portfolioavs/contracts/deployments/hello-world/${chainId}.json`),
        'utf8'
    )
);

const helloWorldServiceManagerABI = JSON.parse(
    fs.readFileSync(
        path.resolve(process.cwd(), 'AVS/portfolioavs/abis/HelloWorldServiceManager.json'),
        'utf8'
    )
);

const helloWorldServiceManagerAddress = avsDeploymentData.addresses.helloWorldServiceManager;
console.log("Contract address:", helloWorldServiceManagerAddress);

// Initialize contract
export const helloWorldServiceManager = new ethers.Contract(
    helloWorldServiceManagerAddress,
    helloWorldServiceManagerABI,
    wallet
);

export async function createTask(taskData: string) {
    try {
        // Check wallet balance
        
        // Verify contract code exists
        const code = await provider.getCode(helloWorldServiceManagerAddress);
        if (code === '0x') {
            throw new Error('No contract deployed at the specified address');
        }
        console.log('Contract verified at address:', helloWorldServiceManagerAddress);

        // Send transaction to create new task
        console.log('Sending transaction...');
        const tx = await helloWorldServiceManager.createNewTask(taskData);
        console.log('Transaction sent:', tx.hash);
        
        // Wait for transaction to be mined
        console.log('Waiting for transaction confirmation...');
        const receipt = await tx.wait();
        
        console.log(`Transaction successful with hash: ${receipt.hash}`);
        console.log('Task data:', JSON.stringify(JSON.parse(taskData), null, 2));

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