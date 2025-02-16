"use client";

import { useCallback, useState, useEffect } from "react";
import {
    ReactFlowProvider,
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Node
} from "reactflow";
import "reactflow/dist/style.css";
import { ChatSection } from "@/components/ChatSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BlockPanel } from "@/components/BlockPanel";
import { ResizeHandle } from "@/components/ResizeHandle";
import {
    LayoutTemplate,
    Boxes,
    Settings,
    Save,
    Play,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Trash2,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import AILoadingAnimation from "@/components/ai-loading-animation";
import { toast } from "sonner";
// import { createTask } from "@/server/createTask";
import { cn } from "@/lib/utils";
import { CustomNode } from '@/components/CustomNodes';
import Link from "next/link";
interface ScrambleHoverProps {
    text: string;
    scrambleSpeed?: number;
    maxIterations?: number;
    sequential?: boolean;
    revealDirection?: "start" | "end" | "center";
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    scrambledClassName?: string;
}

const ScrambleHover: React.FC<ScrambleHoverProps> = ({
    text,
    scrambleSpeed = 50,
    maxIterations = 10,
    useOriginalCharsOnly = false,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
    className,
    scrambledClassName,
    sequential = false,
    revealDirection = "start",
    ...props
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [isScrambling, setIsScrambling] = useState(false);
    const [revealedIndices, setRevealedIndices] = useState(new Set<number>());

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let currentIteration = 0;

        const getNextIndex = () => {
            const textLength = text.length;
            switch (revealDirection) {
                case "start":
                    return revealedIndices.size;
                case "end":
                    return textLength - 1 - revealedIndices.size;
                case "center":
                    const middle = Math.floor(textLength / 2);
                    const offset = Math.floor(revealedIndices.size / 2);
                    const nextIndex =
                        revealedIndices.size % 2 === 0
                            ? middle + offset
                            : middle - offset - 1;

                    if (
                        nextIndex >= 0 &&
                        nextIndex < textLength &&
                        !revealedIndices.has(nextIndex)
                    ) {
                        return nextIndex;
                    }

                    for (let i = 0; i < textLength; i++) {
                        if (!revealedIndices.has(i)) return i;
                    }
                    return 0;
                default:
                    return revealedIndices.size;
            }
        };

        const shuffleText = (text: string) => {
            if (useOriginalCharsOnly) {
                const positions = text.split("").map((char, i) => ({
                    char,
                    isSpace: char === " ",
                    index: i,
                    isRevealed: revealedIndices.has(i),
                }));

                const nonSpaceChars = positions
                    .filter((p) => !p.isSpace && !p.isRevealed)
                    .map((p) => p.char);

                // Shuffle the remaining non-revealed, non-space characters
                for (let i = nonSpaceChars.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [nonSpaceChars[i], nonSpaceChars[j]] = [
                        nonSpaceChars[j],
                        nonSpaceChars[i],
                    ];
                }

                let charIndex = 0;
                return positions
                    .map((p) => {
                        if (p.isSpace) return " ";
                        if (p.isRevealed) return text[p.index];
                        return nonSpaceChars[charIndex++];
                    })
                    .join("");
            } else {
                const availableChars = useOriginalCharsOnly
                    ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
                    : characters.split("");
                return text
                    .split("")
                    .map((char, i) => {
                        if (char === " ") return " ";
                        if (revealedIndices.has(i)) return text[i];
                        return availableChars[
                            Math.floor(Math.random() * availableChars.length)
                        ];
                    })
                    .join("");
            }
        };

        if (isHovering) {
            setIsScrambling(true);
            interval = setInterval(() => {
                if (sequential) {
                    if (revealedIndices.size < text.length) {
                        const nextIndex = getNextIndex();
                        setRevealedIndices((prev) => new Set(prev).add(nextIndex));
                        setDisplayText(shuffleText(text));
                    } else {
                        clearInterval(interval);
                        setIsScrambling(false);
                    }
                } else {
                    setDisplayText(shuffleText(text));
                    currentIteration++;
                    if (currentIteration >= maxIterations) {
                        clearInterval(interval);
                        setIsScrambling(false);
                        setDisplayText(text);
                    }
                }
            }, scrambleSpeed);
        } else {
            setDisplayText(text);
            setRevealedIndices(new Set());
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [
        isHovering,
        text,
        characters,
        scrambleSpeed,
        useOriginalCharsOnly,
        sequential,
        revealDirection,
        maxIterations,
        revealedIndices,
    ]);

    // When the text value changes, auto-trigger the scramble effect.
    useEffect(() => {
        setIsHovering(true);
        const timeout = setTimeout(() => {
            setIsHovering(false);
        }, scrambleSpeed * maxIterations);
        return () => clearTimeout(timeout);
    }, [text, scrambleSpeed, maxIterations]);

    return (
        <motion.span
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            className={cn("inline-block whitespace-pre-wrap", className)}
            {...props}
        >
            <span className="sr-only">{displayText}</span>
            <span aria-hidden="true">
                {displayText.split("").map((char, index) => (
                    <span
                        key={index}
                        className={cn(
                            revealedIndices.has(index) || !isScrambling || !isHovering
                                ? className
                                : scrambledClassName
                        )}
                    >
                        {char}
                    </span>
                ))}
            </span>
        </motion.span>
    );
};


export default function Home() {
    // Maintain nodes/edges state for React Flow.
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [isBlockPanelOpen, setIsBlockPanelOpen] = useState(true);
    const [chatWidth, setChatWidth] = useState(50); // percentage
    const [isLoading, setIsLoading] = useState(false);
    const [isCompiling, setIsCompiling] = useState(false);
    const [flowName, setFlowName] = useState("My Flow");

    // Add this new state and handlers for connections
    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    // Load saved flow data on component mount
    useEffect(() => {
        const savedFlow = localStorage.getItem('currentFlow');
        if (savedFlow) {
            const flowData = JSON.parse(savedFlow);
            setNodes(flowData.nodes || []);
            setEdges(flowData.edges || []);
            setFlowName(flowData.name || "My Flow");
        }
    }, []);

    // Save flow data whenever it changes
    useEffect(() => {
        const flowData = {
            nodes,
            edges,
            name: flowName,
            lastModified: new Date().toISOString()
        };
        localStorage.setItem('currentFlow', JSON.stringify(flowData));
    }, [nodes, edges, flowName]);

    const handleSaveFlow = useCallback(() => {
        const flowData = {
            nodes,
            edges,
            name: flowName,
            lastModified: new Date().toISOString()
        };

        // Save to current flow
        localStorage.setItem('currentFlow', JSON.stringify(flowData));

        // Save to flow history
        const flowHistory = JSON.parse(localStorage.getItem('flowHistory') || '[]');
        flowHistory.push(flowData);
        localStorage.setItem('flowHistory', JSON.stringify(flowHistory));

        toast.success('Flow saved successfully!');
    }, [nodes, edges, flowName]);

    const handleResize = useCallback((delta: number) => {
        setChatWidth((prev) => {
            const newWidth = prev + (delta / window.innerWidth) * 100;
            return Math.min(Math.max(20, newWidth), 80); // Limit between 20% and 80%
        });
    }, []);

    const handleAddBlock = useCallback((block: { id: string; label: string; logo: string; price: string }) => {
        const newNode = {
            id: Date.now().toString(),
            type: 'customNode',
            data: {
                label: block.label,
                logo: block.logo,
                price: block.price
            },
            position: {
                x: Math.random() * 400,
                y: Math.random() * 400
            }
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
                    content: "Generate a trading strategy with a start-block, an AAPL block, a VOO block, an NVDA block, an MSFT block, and an ETH and USDC block at the end."
                }
            ];

            // test

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

    // --- New: Clear Flow functionality ---
    const clearFlow = useCallback(() => {
        setNodes([]);
        setEdges([]);
        toast.success("Flow cleared successfully!");
    }, [setNodes, setEdges]);

    // Add nodeTypes configuration
    const nodeTypes = {
        customNode: CustomNode,
    };

    // Add this new handler for connections
    const onConnect = useCallback((params: any) => {
        // Create a new edge when nodes are connected
        setEdges((eds) => addEdge(params, eds));
    }, [setEdges]);

    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        if (!selectedNode) {
            setSelectedNode(node.id);
        } else if (selectedNode !== node.id) {
            // Create a new connection
            const newEdge = {
                id: `edge-${selectedNode}-${node.id}`,
                source: selectedNode,
                target: node.id,
                type: 'default'
            };
            setEdges((eds) => [...eds, newEdge]);
            setSelectedNode(null);
        } else {
            setSelectedNode(null);
        }
    }, [selectedNode, setEdges]);

    return (
        <div className="flex w-full h-screen pt-14 suppressHydrationWarning">
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
                {/* handleClickJson ts */}

                {/* Resize Handle */}
                <ResizeHandle onResize={handleResize} />

                {/* React Flow Canvas */}
                <div style={{ width: `${100 - chatWidth}%` }} className="relative">
                    {/* Compile Strategy Button */}
                    <Button
                        onClick={handleCompileStrategy}
                        className="absolute top-4 right-4 z-10"
                        disabled={isCompiling}
                    >
                        {isCompiling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isCompiling ? 'Compiling...' : 'Compile Strategy'}
                    </Button>



                    <motion.div
                        initial={{ opacity: 1, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-4 right-44 z-10"
                    >
                        <Link href="/deploy-agent">
                            <Button
                                onClick={() => console.log("launch agent")}
                                className="bg-[#180D68] hover:bg-[#180D68]/80 group"
                            >
                                <Sparkles className="animate-pulse mr-2 h-4 w-4 group-hover:-rotate-12 transition-all" />
                                Launch Agent
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Clear Flow Button */}
                    <motion.div
                        className="absolute top-4 left-4 z-10"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Button variant="ghost" onClick={clearFlow}>
                            <Trash2 className="h-4 w-4" />
                            Clear Flow
                        </Button>
                    </motion.div>

                    <ReactFlowProvider>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onNodeClick={onNodeClick}
                            nodeTypes={nodeTypes}
                            fitView
                            connectOnClick={true}
                            deleteKeyCode={['Backspace', 'Delete']}
                        >
                            <Controls />
                            <MiniMap />
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
                        className="absolute right-3 top-3 z-10"
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