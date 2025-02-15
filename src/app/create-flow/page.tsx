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
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

export default function Home() {
    // Maintain nodes/edges state for React Flow.
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [isBlockPanelOpen, setIsBlockPanelOpen] = useState(true);
    const [chatWidth, setChatWidth] = useState(50); // percentage

    const handleResize = useCallback((delta: number) => {
        setChatWidth((prev) => {
            const newWidth = prev + (delta / window.innerWidth) * 100;
            return Math.min(Math.max(20, newWidth), 80); // Limit between 20% and 80%
        });
    }, []);

    // When a block is clicked, add a new node to the flow.
    const handleAddBlock = useCallback((block: { id: string; label: string }) => {
        const newNode = {
            id: Date.now().toString(),
            data: { label: block.label },
            // For demonstration, using a fixed position.
            position: { x: 250, y: 250 }
        };
        setNodes((nds) => [...nds, newNode]);
    }, [setNodes]);

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
                    <ChatSection />
                </div>

                {/* Resize Handle */}
                <ResizeHandle onResize={handleResize} />

                {/* React Flow Canvas */}
                <div style={{ width: `${100 - chatWidth}%` }} className="relative">
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