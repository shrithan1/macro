'use client';

import React from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";

// Add new chat component
export const ChatSection = () => {
    // adding multi-step tool interactions by setting maxSteps to 5.
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        maxSteps: 5,
    });

    return (
        <div className="flex flex-col h-full bg-background border-l border-border overflow-y-hidden">
            {/* Chat messages area */}
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((m) => (
                    <div key={m.id} className="whitespace-pre-wrap mb-2">
                        {m.role === "user" ? "User: " : "AI: "}
                        {m.toolInvocations ? (
                            <pre className="mt-1 text-sm bg-muted p-2 rounded">
                                {JSON.stringify(m.toolInvocations, null, 2)}
                            </pre>
                        ) : (
                            <p>{m.content}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Chat input - sticky bottom */}
            <div className="sticky bottom-0 border-t border-border p-4 bg-background">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Describe your trading strategy or ask about the weather..."
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
  