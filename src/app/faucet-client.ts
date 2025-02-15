import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/faucet-agent';

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

async function startContinuousRebalancing() {
  console.log('Initializing portfolio management agent...');
  await initializePortfolioAgent();
  console.log('Portfolio agent initialized successfully');

  console.log('Starting continuous portfolio rebalancing (Press Ctrl+C to stop)...\n');
  console.log('Target: 50% USDC allocation with 2% tolerance\n');

  let rebalanceCount = 0;
  
  // Run indefinitely
  while (true) {
    rebalanceCount++;
    console.log(`\nRebalance attempt #${rebalanceCount}`);
    console.log('----------------------------------------');
    
    const result = await rebalancePortfolio();
    
    if (result.success) {
      console.log('Portfolio Management Results:');
      result.messages.forEach((message: string) => {
        console.log(message);
        console.log('-------------------');
      });
    } else {
      console.error('Error:', result.error);
    }

    // Wait for 1 second before next rebalance
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Start the continuous rebalancing
startContinuousRebalancing().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 