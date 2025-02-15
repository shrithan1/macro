import { NextResponse } from 'next/server';
import { createTask } from '@/server/createTask';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    console.log('Creating new task...');
    const data = await req.json();
    console.log('Received data:', data);

    // Await the createTask function
    const result = await createTask(JSON.stringify(data));

    return NextResponse.json({
      success: true,
      message: 'Task created successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Detailed server error:', error);
    return NextResponse.json(
      { error: 'Failed to create task', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}