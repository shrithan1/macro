import { NextResponse } from 'next/server';
import { createTask } from '@/server/createTask';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await createTask(JSON.stringify(data));
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in create-task API route:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}