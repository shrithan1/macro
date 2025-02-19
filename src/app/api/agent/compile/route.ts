import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

// Define a schema to validate the structured trading strategy output.
const tradingStrategySchema = z.object({
    blocks: z.array(
        z.object({
            id: z.string(),
            type: z.enum([
                'MSFT',
                'AAPL',
                'NVDA',
                'VOO',
                'start-block',
                'yield-block',
                'wallet-block'
            ]),
            position: z.object({
                x: z.number(),
                y: z.number(),
            }),
            config: z.any(),
        })
    ),
    connections: z.array(
        z.object({
            from: z.string(),
            to: z.string(),
        })
    ),
    metadata: z.object({
        name: z.string(),
        description: z.string(),
        risk_level: z.string().optional(),
    }),
});

function cleanJsonOutput(rawOutput: string): string {
    let output = rawOutput.trim();
    if (output.startsWith('```')) {

        output = output.replace(/^```(?:json)?\n/, '');

        output = output.replace(/\n?```$/, '');
    }
    return output;
}

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const model = openai('o3-mini', { structuredOutputs: true });

        // Use generateText with a multi-step approach (maxSteps) to have the LLM
        // compile a trading strategy with our defined blocks.
        const result = await generateText({
            model,
            system: `You are a trading strategy compiler. Convert the conversation into a structured trading strategy using only the following blocks:

Available Stock Blocks:
- MSFT (Microsoft)
- AAPL (Apple)
- NVDA (Nvidia)
- VOO (S&P 500 ETF)

Special Blocks:
- start-block (Required as first block)
- yield-block (For yield farming operations)
- wallet-block (For wallet operations)

Output a JSON structure with three keys:
1. "blocks": Array of block configurations
2. "connections": Array of block connections
3. "metadata": Strategy metadata

Each block should include:
- "id": a unique string
- "type": one of the allowed block types
- "position": an object with "x" and "y" numbers indicating layout
- "config": any block‑specific configuration

Ensure that the strategy is valid and that all blocks are connected.

 IMPORTANT: Your output must be valid JSON with exactly these keys:
   {
     "blocks": [...],
     "connections": [...],
     "metadata": {
       "name": string,
       "description": string,
       "risk_level": string
     }
   }`,


            prompt: `Convert the following conversation into a structured trading strategy JSON:
            ${JSON.stringify(messages)}`,
        });

        const cleanedText = cleanJsonOutput(result.text);
        console.log("Cleaned Text:", cleanedText);
        const parsedStrategy = tradingStrategySchema.parse(JSON.parse(cleanedText));
        console.log("Compiled Trading Strategy:", parsedStrategy);

        return NextResponse.json(parsedStrategy);
    } catch (error) {
        console.error("Strategy compilation error:", error);
        return NextResponse.json(
            { error: "Failed to compile strategy", details: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}