'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Add new chat component
export const ChatSection = () => {
    const [input, setInput] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle chat submission here
      setInput('');
    };
  
    return (
      <div className="flex flex-col h-full bg-background border-l border-border overflow-y-hidden">
        
        {/* Chat messages area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="text-muted-foreground text-sm">
            {/* Placeholder streaming text */}
            <p>Assistant: I'll help you create a DeFi strategy. What would you like to achieve?</p>
            <p className="mt-2">User: I want to swap ETH for USDT when the price reaches 3000</p>
            <p className="mt-2">Assistant: I'll help you set up an event trigger for ETH price and connect it to a swap action...</p>
          </div>
        </div>
        
        {/* Chat input - sticky bottom */}
        <div className="sticky bottom-0 border-t border-border p-4 bg-background">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your trading strategy..."
              className="flex-1 bg-muted text-foreground rounded-md px-3 py-2 border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
            />
            <Button 
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
            >
              Send
            </Button>
          </form>
        </div>

      </div>
    );
  };
  