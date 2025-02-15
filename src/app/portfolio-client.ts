import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/portfolio-agent';
const USDC_ADDRESS = "0x5dEaC602762362FE5f135FA5904351916053cF70";

async function initializePortfolioAgent() {
  try {
    const response = await axios.post(API_BASE_URL, { action: 'initialize' });
    return response.data;
  } catch (error) {
    console.error('Failed to initialize portfolio agent:', error);
    throw error;
  }
}

async function rebalancePortfolio() {
  try {
    const response = await axios.post(API_BASE_URL, { action: 'rebalance' });
    return response.data;
  } catch (error) {
    console.error('Failed to rebalance portfolio:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

function formatTimestamp() {
  return new Date().toISOString();
}

async function startAutonomousPortfolioManager() {
  console.log('\n=== Autonomous Portfolio Manager ===');
  console.log('Starting autonomous portfolio management system...');
  console.log(`Timestamp: ${formatTimestamp()}`);
  console.log('\nConfiguration:');
  console.log(`- Network: Base Sepolia`);
  console.log(`- USDC Address: ${USDC_ADDRESS}`);
  console.log('- Target Allocation: 50% USDC');
  console.log('- Tolerance Band: ±2%');
  console.log('- Rebalance Interval: 1 second');
  console.log('\nInitializing autonomous agent...');
  
  try {
    await initializePortfolioAgent();
    console.log('Agent initialization successful');
    console.log('\nStarting autonomous operations...');
    console.log('----------------------------------------');

    let rebalanceCount = 0;
    let successfulRebalances = 0;
    let failedRebalances = 0;
    const startTime = Date.now();
    
    // Run indefinitely
    while (true) {
      rebalanceCount++;
      const currentTime = formatTimestamp();
      
      console.log(`\n[${currentTime}] Autonomous Rebalance #${rebalanceCount}`);
      console.log('----------------------------------------');
      
      const result = await rebalancePortfolio();
      
      if (result.success) {
        successfulRebalances++;
        console.log('\nExecution Results:');
        result.messages.forEach((message: string) => {
          console.log(`[${formatTimestamp()}] ${message}`);
        });
      } else {
        failedRebalances++;
        console.error(`[${formatTimestamp()}] Error:`, result.error);
        // Exponential backoff on errors (max 30 seconds)
        const backoffTime = Math.min(Math.pow(2, failedRebalances) * 1000, 30000);
        console.log(`Backing off for ${backoffTime/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      }

      // Log statistics every 10 rebalances
      if (rebalanceCount % 10 === 0) {
        const runningTime = Math.floor((Date.now() - startTime) / 1000);
        console.log('\n=== Performance Statistics ===');
        console.log(`Total Rebalances: ${rebalanceCount}`);
        console.log(`Successful: ${successfulRebalances}`);
        console.log(`Failed: ${failedRebalances}`);
        console.log(`Success Rate: ${((successfulRebalances/rebalanceCount)*100).toFixed(2)}%`);
        console.log(`Running Time: ${runningTime} seconds`);
        console.log('=============================\n');
      }

      // Standard interval between rebalances
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error(`[${formatTimestamp()}] Fatal error:`, error);
    process.exit(1);
  }
}

// Start the autonomous portfolio manager
startAutonomousPortfolioManager(); 