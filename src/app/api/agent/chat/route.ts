import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 59;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    system: "You are a helpful assistant that helps with financial strategy creation. You are concise and to the point, and don't make any overly complext strategies. You use popular stocks, and reference specfic figures and tickers in your responses. You perform best when you are specific on when and what you're investing in.",
  });

  return result.toDataStreamResponse();
}