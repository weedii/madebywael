"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full glass-effect hover:shadow-md hover:border-primary/30 transition-all duration-300"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-effect border-primary/20">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`flex items-center gap-2 ${theme === "light" ? "text-primary font-medium" : ""}`}
        >
          <Sun className="h-4 w-4 text-amber-500" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2 ${theme === "dark" ? "text-primary font-medium" : ""}`}
        >
          <Moon className="h-4 w-4 text-primary" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={`flex items-center gap-2 ${theme === "system" ? "text-primary font-medium" : ""}`}
        >
          <span className="text-xs h-4 w-4 flex items-center justify-center">💻</span>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 