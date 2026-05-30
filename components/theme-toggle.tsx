"use client"

import { useEffect, useState } from "react"
import { useTheme, type Theme } from "@/lib/theme"
import { Monitor, Moon, Sun } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-8 w-22 rounded-lg bg-muted" />
  }

  return (
    <Tabs value={theme} onValueChange={(v) => setTheme(v as Theme)}>
      <TabsList className="h-8">
        <TabsTrigger value="system" aria-label="System theme" className="px-2">
          <Monitor className="size-3.5" />
        </TabsTrigger>
        <TabsTrigger value="light" aria-label="Light theme" className="px-2">
          <Sun className="size-3.5" />
        </TabsTrigger>
        <TabsTrigger value="dark" aria-label="Dark theme" className="px-2">
          <Moon className="size-3.5" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
