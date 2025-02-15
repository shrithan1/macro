import express, { Request, Response } from 'express';
import cors from 'cors';
import { BaseMessage } from '@langchain/core/messages';
import { HumanMessage } from '@langchain/core/messages';

const app = express();
app.use(cors());
app.use(express.json());

interface AgentConfig {
  configurable: {
    thread_id: string;
  };
}

interface StreamResponse {
  agent?: { messages: Array<{ content: string }> };
  tools?: { messages: Array<{ content: string }> };
}

let agent: any = null;
let config: AgentConfig | null = null;
let messageHistory: string[] = [];

// Initialize the agent on server start
async function startAgent() {
  try {
    const { initializeAgent } = await import('../app/api/fullagent/agent');
    const result = await initializeAgent();
    agent = result.agent;
    config = result.config;
    console.log('Agent initialized successfully');
  } catch (error) {
    console.error('Failed to initialize agent:', error);
    process.exit(1);
  }
}

// Status endpoint
app.get('/status', (req: Request, res: Response) => {
  res.json({ initialized: agent !== null });
});

// Chat endpoint
app.post('/chat', async (req: Request, res: Response) => {
  if (!agent || !config) {
    return res.status(400).json({ error: 'Agent not initialized' });
  }

  try {
    const { message } = req.body;
    const messages: string[] = [];

    const stream = await agent.stream(
      { messages: [new HumanMessage(message)] },
      config
    );

    for await (const chunk of stream) {
      const response = chunk as StreamResponse;
      if (response.agent?.messages?.[0]?.content) {
        messages.push(response.agent.messages[0].content);
      } else if (response.tools?.messages?.[0]?.content) {
        messages.push(response.tools.messages[0].content);
      }
    }

    messageHistory = [...messageHistory, ...messages];
    res.json({ messages });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Get message history endpoint
app.get('/history', (req: Request, res: Response) => {
  res.json({ messages: messageHistory });
});

const PORT = process.env.AGENT_SERVER_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Agent server running on port ${PORT}`);
  startAgent();
});

process.on('SIGINT', () => {
  console.log('Shutting down agent server...');
  process.exit();
}); 