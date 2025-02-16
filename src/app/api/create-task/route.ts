import { NextResponse } from 'next/server';
import { createTask } from '@/server/createTask';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    // createTask expects a string, so we stringify the request data
    const result = await createTask(JSON.stringify(requestData));
    console.log('API Response:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in create-task API route:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}