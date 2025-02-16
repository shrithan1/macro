import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { WebSocket, WebSocketServer } from 'ws';
import { createServer } from 'http';
import { deepResearch, writeFinalReport } from './deep-research';
import { generateFeedback } from './feedback';
import { OutputManager } from './output-manager';

const app = express();
const port = process.env.PORT || 3000;

// Create HTTP server
const server = createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Store active WebSocket connections
const clients = new Map<string, WebSocket>();

// WebSocket connection handler
wss.on('connection', (ws: any) => {
  const clientId = Math.random().toString(36).substring(7);
  clients.set(clientId, ws);

  ws.on('close', () => {
    clients.delete(clientId);
  });
});

// Function to send updates to a specific client
function sendUpdate(clientId: string, data: any) {
  const client = clients.get(clientId);
  if (client?.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(data));
  }
}

// Initialize output manager for coordinated console/progress output
const output = new OutputManager();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Input validation schema
const researchRequestSchema = z.object({
  query: z.string(),
  breadth: z.number().int().min(1).max(10).default(4),
  depth: z.number().int().min(1).max(5).default(2),
  answers: z.array(z.string()).optional(),
  clientId: z.string().optional(),
});

// Research endpoint
app.post('/api/research', async (req, res) => {
  try {
    // Validate input
    const validatedInput = researchRequestSchema.parse(req.body);
    const { query, breadth, depth, answers = [], clientId } = validatedInput;

    // Generate follow-up questions if no answers provided
    if (answers.length === 0) {
      const followUpQuestions = await generateFeedback({ query });
      return res.json({ 
        status: 'questions',
        questions: followUpQuestions,
        originalQuery: query,
        breadth,
        depth
      });
    }

    // Send initial status to client
    if (clientId) {
      sendUpdate(clientId, {
        type: 'status',
        message: 'Starting research...'
      });
    }

    // Combine query with answers for deep research
    const combinedQuery = `
Initial Query: ${query}

Additional Context:
${answers.map((answer, i) => `- ${answer}`).join('\n')}
`;

    // Start the research
    const { learnings, visitedUrls } = await deepResearch({
      query: combinedQuery,
      breadth,
      depth,
      onProgress: (progress) => {
        // Send progress updates via WebSocket
        if (clientId) {
          sendUpdate(clientId, {
            type: 'progress',
            data: progress
          });
        }
        output.updateProgress(progress);
      },
      onLearning: (learning) => {
        // Send new learnings via WebSocket
        if (clientId) {
          sendUpdate(clientId, {
            type: 'learning',
            data: learning
          });
        }
      }
    });

    // Generate the final report
    const report = await writeFinalReport({
      prompt: combinedQuery,
      learnings,
      visitedUrls,
    });

    // Send completion status
    if (clientId) {
      sendUpdate(clientId, {
        type: 'complete',
        data: {
          report,
          learnings,
          visitedUrls
        }
      });
    }

    // Return the results
    res.json({
      status: 'complete',
      report,
      learnings,
      visitedUrls,
    });
  } catch (error) {
    console.error('Research error:', error);
    // Send error to client
    if (req.body.clientId) {
      sendUpdate(req.body.clientId, {
        type: 'error',
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    }
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    });
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 