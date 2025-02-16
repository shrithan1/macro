'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { LayoutTemplate, Moon, Sun } from 'lucide-react'
import { TooltipDisplay } from '@/components/ui/tooltip-display'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

export function Navbar() {
    const { setTheme } = useTheme()

    return (
        <header className="absolute top-0 left-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

            <div className="flex flex-row px-3 h-14 items-center">
                <Image src="/eigenlogo.png" alt="eigen" width={50} height={50} className="mr-2" />
                <div className="space-x-6 flex">
                    <Link href="/" className="mr-2 flex items-center group">
                        <span className="text-xl tracking-tight italic transition-colors group-hover:text-primary">* Macro_</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm">
                        <Link
                            href="/create-flow"
                            className="group text-xl tracking-tight transition-colors hover:text-foreground/80 text-foreground flex items-center gap-2"
                        >
                            Create Flow
                            <LayoutTemplate className="group-hover:ml-1 h-4 w-4 transition-all" />
                        </Link>
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end pr-10">
                    <TooltipDisplay variant={3} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
} 