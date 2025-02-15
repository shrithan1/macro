import { ethers } from "ethers";
import * as dotenv from "dotenv";
const fs = require('fs');
const path = require('path');
dotenv.config();

// Setup env variables
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
/// TODO: Hack
let chainId = 31337;

const avsDeploymentData = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../contracts/deployments/hello-world/${chainId}.json`), 'utf8'));
const helloWorldServiceManagerAddress = avsDeploymentData.addresses.helloWorldServiceManager;
const helloWorldServiceManagerABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../abis/HelloWorldServiceManager.json'), 'utf8'));
// Initialize contract objects from ABIs
const helloWorldServiceManager = new ethers.Contract(helloWorldServiceManagerAddress, helloWorldServiceManagerABI, wallet);


// Function to generate random portfolio data
function generateRandomTaskData(): string {
    // Generate random weights that sum to 100
    const generateWeights = (count: number): number[] => {
        let weights = Array(count).fill(0).map(() => Math.random());
        const sum = weights.reduce((a, b) => a + b, 0);
        return weights.map(w => Number((w / sum * 100).toFixed(2)));
    };

    // Generate random prices with realistic ranges
    const prices = {
        PAPPL: 150 + Math.random() * 50,  // $150-200 range
        PVOO: 80 + Math.random() * 30,    // $80-110 range
        PMSFT: 300 + Math.random() * 100, // $300-400 range
        wBTC: 40000 + Math.random() * 10000, // $40k-50k range
        ETH: 2000 + Math.random() * 500   // $2000-2500 range
    };

    const weights = generateWeights(5);
    
    const taskData = {
        timestamp: Date.now(),
        portfolio: {
            assets: [
                {
                    symbol: "PAPPL",
                    weight: weights[0],
                    price: Number(prices.PAPPL.toFixed(2))
                },
                {
                    symbol: "PVOO",
                    weight: weights[1],
                    price: Number(prices.PVOO.toFixed(2))
                },
                {
                    symbol: "PMSFT",
                    weight: weights[2],
                    price: Number(prices.PMSFT.toFixed(2))
                },
                {
                    symbol: "wBTC",
                    weight: weights[3],
                    price: Number(prices.wBTC.toFixed(2))
                },
                {
                    symbol: "ETH",
                    weight: weights[4],
                    price: Number(prices.ETH.toFixed(2))
                }
            ],
            totalValue: 100000 + Math.random() * 50000, // Portfolio value between $100k-150k
            metadata: {
                rebalanceRequired: Math.random() > 0.7, // 30% chance of requiring rebalance
                lastUpdated: new Date().toISOString(),
                portfolioRisk: "moderate",
                currentTime: Date.now()
            }
        }
    };
    
    return JSON.stringify(taskData);
}

async function createNewTask(taskData: string) {
    try {
        // Send a transaction to the createNewTask function
        const tx = await helloWorldServiceManager.createNewTask(taskData);
        
        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        
        console.log(`Transaction successful with hash: ${receipt.hash}`);
        console.log('Task data:', JSON.stringify(JSON.parse(taskData), null, 2));
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}

// Function to create a new task with random data every 24 seconds
function startCreatingTasks() {
    setInterval(() => {
        const taskData = generateRandomTaskData();
        console.log('Creating new task with data:');
        console.log(JSON.stringify(JSON.parse(taskData), null, 2));
        createNewTask(taskData);
    }, 24000);
}

// Start the process
startCreatingTasks();