import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from the root .env file
config({ path: resolve(__dirname, '../../.env') });

// Import and start the agent server
import './agentServer'; 