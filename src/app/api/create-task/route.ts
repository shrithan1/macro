import { NextResponse } from 'next/server';
import { createTask } from '@/server/createTask';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    // createTask expects a string, so we stringify the request data
    const result = await createTask(JSON.stringify(requestData));
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in API route create-task:', error);
    return NextResponse.error();
  }
}