"use client";

import { useCallback } from "react";
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

// Import Shadcn components
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { BlockPanel } from "@/components/BlockPanel";

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
      {/* Replace AppSidebar with direct sidebar implementation */}
      <div className="hidden lg:block border-r w-[60px] p-3 space-y-4">
        <ScrollArea className="h-full">
          {/* Add your sidebar icons/buttons here */}
          <div className="space-y-4 py-4">
            {/* Example sidebar items */}
            <div className="flex flex-col items-center">
              <button className="h-8 w-8 rounded-md hover:bg-gray-100">
                {/* Icon or content */}
              </button>
            </div>
            <Separator className="mx-auto w-10" />
            {/* Add more sidebar items as needed */}
          </div>
        </ScrollArea>
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

        {/* Block Panel (400px wide) */}
        <div className="w-[400px] border-l border-gray-300">
          <BlockPanel onAddBlock={handleAddBlock} />
        </div>
      </div>
    </div>
  );
}