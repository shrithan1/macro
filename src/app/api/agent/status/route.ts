import { NextResponse } from "next/server";
import { agentInstance } from "../initialize/route";

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    initialized: agentInstance !== null
  });
} 