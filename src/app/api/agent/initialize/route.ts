import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

// Store agent instance in memory (Note: this will reset on server restart)
let agentInstance: ReturnType<typeof createReactAgent> | null = null;

export async function POST(req: Request) {
  try {
    // Initialize LLM
    const llm = new ChatOpenAI({
      model: "gpt-4",
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Store buffered conversation history in memory
    const memory = new MemorySaver();

    // Create React Agent
    agentInstance = createReactAgent({
      llm,
      tools: [],
      checkpointSaver: memory,
      messageModifier: `
        You are a helpful AI assistant. You can help users understand blockchain concepts,
        explain how to interact with various blockchain protocols, and provide guidance
        on using the Coinbase Developer Platform. You cannot directly interact with the
        blockchain yet, but you can explain how to do so.
        `,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Agent initialized successfully. I'm ready to help you understand blockchain concepts and the Coinbase Developer Platform." 
    });

  } catch (error) {
    console.error("Initialization Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }, { status: 500 });
  }
}

// Export the agent instance so other routes can use it
export { agentInstance }; 