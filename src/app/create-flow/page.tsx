"use client";

import { useCallback, useState } from "react";
import {
    ReactFlowProvider,
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState
} from "reactflow";
import "reactflow/dist/style.css";
import { ChatSection } from "@/components/ChatSection";
// Import Shadcn components
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { BlockPanel } from "@/components/BlockPanel";
import { ResizeHandle } from "@/components/ResizeHandle";

// Add these imports at the top
import {
    LayoutTemplate,
    Boxes,
    Settings,
    Save,
    Play,
    ChevronLeft,
    ChevronRight,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import AILoadingAnimation from "@/components/ai-loading-animation";

// Import Sonner toast
import { toast } from "sonner";
// Import createTask (ensure the import path is correct)
import { createTask } from "@/server/createTask";

export default function Home() {
    // Maintain nodes/edges state for React Flow.
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [isBlockPanelOpen, setIsBlockPanelOpen] = useState(true);
    const [chatWidth, setChatWidth] = useState(50); // percentage
    const [isLoading, setIsLoading] = useState(false);
    const [isCompiling, setIsCompiling] = useState(false);

    const handleResize = useCallback((delta: number) => {
        setChatWidth((prev) => {
            const newWidth = prev + (delta / window.innerWidth) * 100;
            return Math.min(Math.max(20, newWidth), 80); // Limit between 20% and 80%
        });
    }, []);

    const handleAddBlock = useCallback((block: { id: string; label: string }) => {
        const newNode = {
            id: Date.now().toString(),
            data: { label: block.label },
            // using a fixed position.
            position: { x: 250, y: 250 }
        };
        setNodes((nds) => [...nds, newNode]);
    }, [setNodes]);

    const handleSendJson = async () => {
        // Generate mock portfolio data
        const mockData = {
            timestamp: Date.now(),
            portfolio: {
                assets: [
                    {
                        symbol: "PAPPL",
                        weight: 20.5,
                        price: 175.32
                    },
                    {
                        symbol: "PVOO",
                        weight: 15.25,
                        price: 95.45
                    },
                    {
                        symbol: "PMSFT",
                        weight: 25.75,
                        price: 350.20
                    },
                    {
                        symbol: "wBTC",
                        weight: 23.25,
                        price: 45000.00
                    },
                    {
                        symbol: "ETH",
                        weight: 15.25,
                        price: 2250.75
                    }
                ],
                totalValue: 125000,
                metadata: {
                    rebalanceRequired: true,
                    lastUpdated: new Date().toISOString(),
                    portfolioRisk: "moderate",
                    currentTime: Date.now()
                }
            }
        };

        // Save to localStorage for coinbase-test page
        localStorage.setItem('portfolioData', JSON.stringify(mockData));

        try {
            const response = await fetch('/api/create-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mockData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('API Response:', result);
            
        } catch (error) {
            console.error('Error sending portfolio data:', error);
        }
    };

    const handleCompileStrategy = useCallback(async () => {
        setIsCompiling(true);
        try {
            const dummyMessages = [
                {
                    role: "user",
                    content: "Generate a trading strategy with a start-block, a couple S and P stocks blocks , and a yield-block at the end."
                }
            ];

            
            
            const response = await fetch('/api/agent/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages: dummyMessages })
            });

            if (!response.ok) {
                throw new Error(`Compilation failed with status ${response.status}`);
            }

            const compiledData = await response.json();
            const newNodes = compiledData.blocks.map((block: any) => ({
                id: block.id,
                position: block.position,
                type: "default",
                data: { label: block.type, config: block.config }
            }));

            const newEdges = compiledData.connections.map((conn: any) => ({
                id: `edge-${conn.from}-${conn.to}`,
                source: conn.from,
                target: conn.to,
                type: "default"
            }));

            setNodes(newNodes);
            setEdges(newEdges);

            // Call the API route instead of createTask directly
            const taskResponse = await fetch('/api/create-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(compiledData)
            });

            if (!taskResponse.ok) {
                throw new Error('Failed to create task');
            }

            const result = await taskResponse.json();
            toast.success(`Task created successfully with transaction hash: ${result.transactionHash}`);
        } catch (error: any) {
            console.error('Error compiling strategy:', error);
            toast.error('Error compiling strategy. Check console for details.');
        } finally {
            setIsCompiling(false);
        }
    }, [setNodes, setEdges]);

    return (
        <div className="flex w-full h-screen pt-14">
            {/* Left Sidebar */}
            <div className="w-[60px] border-r border-border">
                <ScrollArea className="h-full">
                    <div className="p-3 space-y-4">
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <LayoutTemplate className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Components</p>
                                </TooltipContent>
                            </Tooltip>

                            <Separator className="mx-auto w-10" />

                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Play className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Run Flow</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Save className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Save Flow</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Settings</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </ScrollArea>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex">
                {/* Chat Section */}
                <div style={{ width: `${chatWidth}%` }} className="border-r border-border">
                    {isLoading ? (
                        <AILoadingAnimation message="Macro is thinking..." />
                    ) : (
                        <ChatSection 
                            WordWrapper={motion.span}
                            wordWrapperProps={{
                                initial: { filter: "blur(8px)" },
                                animate: { filter: "blur(0px)" },
                                transition: { duration: 0.5 }
                            }}
                        />
                    )}
                </div>

                {/* <Button onClick={handleSendJson}>
                    Sending Json
                </Button> */}

                {/* Resize Handle */}
                <ResizeHandle onResize={handleResize} />

                {/* React Flow Canvas */}
                <div style={{ width: `${100 - chatWidth}%` }} className="relative">
                    <Button 
                        onClick={handleCompileStrategy} 
                        className="absolute top-4 right-4 z-10"
                        disabled={isCompiling}
                    >
                        {isCompiling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isCompiling ? 'Compiling...' : 'Compile Strategy'}
                    </Button>
                    <ReactFlowProvider>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            fitView
                        >
                            <Controls />
                            <Background gap={12} size={1} />
                        </ReactFlow>
                    </ReactFlowProvider>
                </div>

                {/* Togglable Block Panel */}
                <motion.div
                    initial={false}
                    animate={{ width: isBlockPanelOpen ? "240px" : "0px" }}
                    className="border-l border-border"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsBlockPanelOpen(!isBlockPanelOpen)}
                        className="absolute right-0 top-4 z-10"
                    >
                        {isBlockPanelOpen ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <ChevronLeft className="h-4 w-4" />
                        )}
                    </Button>
                    
                    {isBlockPanelOpen && (
                        <BlockPanel onAddBlock={handleAddBlock} />
                    )}
                </motion.div>
            </div>
        </div>
    );
}