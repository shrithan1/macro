import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { 
  saveStrategy, 
  getActiveStrategies, 
  updatePerformanceMetrics 
} from "../../lib/redis";
import { TradingStrategy } from "../../lib/types";

export async function POST(req: Request) {
  try {
    const strategy = await req.json();
    
    const newStrategy: TradingStrategy = {
      id: uuidv4(),
      name: strategy.name,
      description: strategy.description,
      status: 'active',
      configuration: {
        asset: strategy.asset,
        timeframe: strategy.timeframe,
        indicators: strategy.indicators || [],
        entryConditions: strategy.entryConditions || [],
        exitConditions: strategy.exitConditions || []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await saveStrategy(newStrategy);

    return NextResponse.json({ 
      success: true, 
      strategy: newStrategy 
    });
  } catch (error) {
    console.error("Strategy Creation Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const strategies = await getActiveStrategies();
    return NextResponse.json({ 
      success: true, 
      strategies 
    });
  } catch (error) {
    console.error("Strategy Fetch Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { strategyId, performance } = await req.json();
    
    const strategies = await getActiveStrategies();
    const strategy = strategies.find(s => s.id === strategyId);
    
    if (!strategy) {
      return NextResponse.json({ 
        success: false, 
        error: "Strategy not found" 
      }, { status: 404 });
    }

    strategy.performance = performance;
    strategy.updatedAt = new Date().toISOString();
    
    await saveStrategy(strategy);
    await updatePerformanceMetrics({
      lastUpdated: new Date().toISOString(),
      strategies: strategies.map(s => ({
        id: s.id,
        name: s.name,
        performance: s.performance
      }))
    });

    return NextResponse.json({ 
      success: true, 
      strategy 
    });
  } catch (error) {
    console.error("Strategy Update Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }, { status: 500 });
  }
} 