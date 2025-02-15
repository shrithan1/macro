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

// Add these imports at the top
import { 
  LayoutTemplate,
  Boxes,
  Settings,
  Save,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";


export default function Home() {
  // Maintain nodes/edges state for React Flow.
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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
    <div className="flex h-screen">
      {/* Left section with flow editor (50%) */}
      <div className="w-1/2 flex">
        {/* Left Sidebar with Component List */}
        <div className="hidden lg:flex border-r w-[240px]">
          <div className="w-[60px] border-r p-3 space-y-4">
            <ScrollArea className="h-full">
              <div className="space-y-4 py-4">
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

          {/* Component List Panel */}
          <div className="flex-1">
            <BlockPanel onAddBlock={handleAddBlock} />
          </div>
        </div>

        <div className="flex flex-1">
          {/* React Flow canvas */}
          <div className="flex-1">
            <ReactFlowProvider>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                className="w-full h-full"
              >
                <MiniMap />
                <Controls />
                <Background gap={12} size={1} />
              </ReactFlow>
            </ReactFlowProvider>
          </div>
        </div>
      </div>

      {/* Right section with chat (50%) */}
      <div className="w-1/2">
        <ChatSection />
      </div>
    </div>
  );
}