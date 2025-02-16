'use client';

import React from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';
import { Plus, TelescopeIcon as Binoculars, AudioWaveformIcon as WaveformIcon, PlayIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useRef, useEffect } from "react"

interface ChatSectionProps {
    WordWrapper: React.ComponentType<any>;
    wordWrapperProps?: Record<string, any>;
}

// Add new chat component
export function ChatSection({ WordWrapper, wordWrapperProps = {} }: ChatSectionProps) {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/agent/chat',
        maxSteps: 5,
    });

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)

    // Adjust textarea height on input change
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
        }
    }, [input])

    const handleCardClick = (e: React.MouseEvent) => {
        if (textareaRef.current && !textareaRef.current.contains(e.target as Node)) {
            textareaRef.current.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && input.trim().length > 0) {
            e.preventDefault()
            handleSubmit(e as any)
        }
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSubmit(e)
    }

    // When rendering the AI response, wrap each word and support markdown:
    const renderMessage = (text: string) => {
        return (
            <ReactMarkdown
                components={{
                    // Customize how text nodes are rendered
                    text: ({ children }) => {
                        return children.toString().split(' ').map((word, index) => (
                            <WordWrapper
                                key={index}
                                {...wordWrapperProps}
                                style={{ 
                                    display: 'inline-block',
                                    marginRight: '0.25em',
                                    ...wordWrapperProps.style
                                }}
                            >
                                {word}
                            </WordWrapper>
                        ));
                    },

                    code: ({ node, inline, className, children, ...props }) => (
                        <code
                            className={`${className} ${inline ? 'bg-muted px-1 py-0.5 rounded' : 'block bg-muted p-2 rounded-lg'}`}
                            {...props}
                        >
                            {children}
                        </code>
                    ),

                    a: ({ node, children, href, ...props }) => (
                        <a
                            href={href}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                        >
                            {children}
                        </a>
                    ),
                }}
            >
                {text}
            </ReactMarkdown>
        );
    };

    return (
        <div className="flex flex-col h-full bg-background border-l border-border overflow-y-hidden">
            {/* Chat messages area */}
            <div className="flex-1 p-4 overflow-y-auto text-sm">
                {messages.length > 0 ? (
                    messages.map((m) => (
                        <div key={m.id} className={`whitespace-pre-wrap mb-4 ${
                            m.role === "assistant" ? "bg-muted/50 rounded-lg p-3" : ""
                        }`}>
                            <div className="font-semibold mb-1">
                                {m.role === "user" ? "You: " : "Assistant: "}
                            </div>
                            {renderMessage(m.content)}
                            {m.toolInvocations && (
                                <pre className="mt-2 text-sm bg-muted p-2 rounded">
                                    {JSON.stringify(m.toolInvocations, null, 2)}
                                </pre>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="w-[150px] h-[150px] bg-muted/50 rounded-lg p-4 animate-pulse">
                            <div className="h-4 w-2/3 bg-muted mb-2 rounded"></div>
                            <div className="h-4 w-1/2 bg-muted rounded"></div>
                        </div>
                        <div className="hidden sm:block w-[150px] h-[150px] bg-muted/50 rounded-lg p-4 animate-pulse">
                            <div className="h-4 w-2/3 bg-muted mb-2 rounded"></div>
                            <div className="h-4 w-1/2 bg-muted rounded"></div>
                        </div>
                        <div className="hidden md:block w-[150px] h-[150px] bg-muted/50 rounded-lg p-4 animate-pulse">
                            <div className="h-4 w-2/3 bg-muted mb-2 rounded"></div>
                            <div className="h-4 w-1/2 bg-muted rounded"></div>
                        </div>
                        <div className="hidden lg:block w-[150px] h-[10px] bg-muted/50 rounded-lg p-4 animate-pulse">
                            <div className="h-4 w-2/3 bg-muted mb-2 rounded"></div>
                            <div className="h-4 w-1/2 bg-muted rounded"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Chat input - sticky bottom */}
            <div className="sticky bottom-0 bg-background">
                <Button variant="outline" className="absolute -top-8 right-4">
                    Compile Strategy
                </Button>
                <TooltipProvider>
                    <form onSubmit={onSubmit} className="p-4 flex items-start justify-center">
                        <Card
                            ref={cardRef}
                            className="w-full max-w-3xl border-[#dbdbdb] shadow-none cursor-text"
                            onClick={handleCardClick}
                        >
                            <CardHeader className="pb-0 pt-4 px-4">
                                <CardTitle className="text-[#858585] font-normal text-base">
                                    <textarea
                                        ref={textareaRef}
                                        value={input}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        className={`bg-transparent w-full outline-none resize-none overflow-hidden ${
                                            input ? "text-black" : "text-[#dbdbdb]"
                                        } placeholder-[#dbdbdb] focus:text-black`}
                                        placeholder="Message Macro"
                                        rows={1}
                                    />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" size="icon" className="h-10 w-10 border-[#dbdbdb] group">
                                                <Plus className="h-4 w-4 transition-transform group-hover:rotate-12" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Add new macro</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="border-[#dbdbdb] flex items-center gap-2 text-sm font-normal group"
                                            >
                                                <Binoculars className="h-4 w-4 transition-transform group-hover:-rotate-12" />
                                                Deep Research
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Perform deep research on the topic</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <div className="flex-1 flex justify-end gap-2">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    type="submit"
                                                    size="sm"
                                                    className="bg-black hover:bg-black/90 text-white px-3 py-2 h-10 group disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                                    disabled={!input.trim() || isLoading}
                                                >
                                                    <PlayIcon className="h-4 w-4 transition-transform group-hover:rotate-12" />
                                                    {isLoading ? 'Processing...' : 'Run'}
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Run the macro (enabled when text is entered)</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button size="icon" className="rounded-full bg-[#180d68] hover:bg-[#180d68]/90 h-10 w-10 p-2 group">
                                                    <WaveformIcon className="h-full w-full transition-transform group-hover:rotate-12" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Voice input</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </TooltipProvider>
            </div>
        </div>
    );
}
