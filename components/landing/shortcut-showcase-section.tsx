"use client"

import { useState } from "react"
import { Section } from "@/components/landing/section"
import { BoardMock } from "@/components/landing/board-mock"
import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"

const SHORTCUTS = [
  {
    key: "n",
    keys: ["n"],
    label: "New card",
    description: "Create a card in the focused lane",
    highlightLane: "inbox",
    highlightCard: null,
  },
  {
    key: "slash",
    keys: ["/"],
    label: "Search",
    description: "Open global search across all cards",
    highlightLane: null,
    highlightCard: null,
    highlightSearch: true,
  },
  {
    key: "gi",
    keys: ["g", "i"],
    label: "Jump to Inbox",
    description: "Focus the Inbox lane instantly",
    highlightLane: "inbox",
    highlightCard: null,
  },
  {
    key: "jk",
    keys: ["j", "/", "k"],
    label: "Navigate cards",
    description: "Move focus up and down through cards",
    highlightLane: null,
    highlightCard: "c4",
  },
  {
    key: "enter",
    keys: ["Enter"],
    label: "Open card",
    description: "Expand the focused card for full detail",
    highlightLane: null,
    highlightCard: "c9",
  },
  {
    key: "esc",
    keys: ["Esc"],
    label: "Close / cancel",
    description: "Dismiss a modal or deselect a card",
    highlightLane: null,
    highlightCard: null,
  },
]

export function ShortcutShowcaseSection() {
  const [activeKey, setActiveKey] = useState<string | null>(null)

  const active = SHORTCUTS.find((s) => s.key === activeKey) ?? null

  return (
    <Section
      id="shortcuts"
      eyebrow="Keyboard-first"
      heading="Your hands never leave the keyboard."
      description="Hover any shortcut to see where it acts on the board."
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-1">
          {SHORTCUTS.map((s) => (
            <div
              key={s.key}
              onMouseEnter={() => setActiveKey(s.key)}
              onMouseLeave={() => setActiveKey(null)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-default transition-colors",
                activeKey === s.key ? "bg-accent" : "hover:bg-accent/50"
              )}
            >
              <div className="flex items-center gap-0.5">
                {s.keys.map((k, i) => (
                  <span key={i} className="flex items-center gap-0.5">
                    {i > 0 && k !== "/" && (
                      <span className="text-muted-foreground/50 text-xs px-0.5">then</span>
                    )}
                    {k === "/" && i > 0 ? null : (
                      <Kbd className={cn(activeKey === s.key && "border-primary/30 bg-primary/8 text-primary")}>
                        {k}
                      </Kbd>
                    )}
                    {k === "/" && i > 0 && (
                      <span className="text-muted-foreground/50 text-xs px-0.5">/</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{s.label}</p>
                <p className="text-xs text-muted-foreground truncate">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative flex-1 overflow-hidden rounded-2xl border border-border bg-sidebar/40 p-3">
          {active?.highlightSearch && (
            <div className="absolute inset-x-3 top-3 z-10 rounded-lg border border-primary/40 bg-card p-2 shadow-lg shadow-primary/10 ring-2 ring-primary/30">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="opacity-50">⌕</span>
                <span className="text-foreground/40 italic">Search cards…</span>
                <Kbd className="ml-auto">Esc</Kbd>
              </div>
              <div className="mt-2 space-y-1">
                {["Fix keyboard navigation bug", "Implement search feature", "Write API documentation"].map((r) => (
                  <div key={r} className="rounded px-2 py-1 text-xs text-foreground/70 hover:bg-accent first:bg-accent first:text-foreground">
                    {r}
                  </div>
                ))}
              </div>
            </div>
          )}
          <BoardMock
            compact
            highlightedLane={active?.highlightLane ?? undefined}
            highlightedCard={active?.highlightCard ?? undefined}
          />
        </div>
      </div>
    </Section>
  )
}
