"use client"

import { useRef, useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

const RESULTS = [
  { title: "Fix keyboard navigation bug", lane: "Today", label: "bug" },
  { title: "Implement search feature", lane: "This Week", label: "feature" },
  { title: "Review design system tokens", lane: "Inbox", label: "design" },
  { title: "Board drag & drop", lane: "Doing", label: "feature" },
  { title: "Write API documentation", lane: "Inbox", label: "docs" },
]

export function SearchMock() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
      if (e.key === "Escape") {
        inputRef.current?.blur()
        setOpen(false)
        setQuery("")
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const filtered = query
    ? RESULTS.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))
    : RESULTS

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Global search
      </p>
      <p className="text-sm text-muted-foreground">
        Press <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[11px] font-medium text-muted-foreground mx-0.5">/</kbd> anywhere to open. Try typing in the box below.
      </p>
      <div className="relative">
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg border px-3 py-2.5 transition-all",
            open
              ? "border-primary/40 ring-2 ring-primary/15 shadow-sm"
              : "border-border"
          )}
        >
          <Search className="size-4 text-muted-foreground/60 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search cards…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
          />
          {query && (
            <button
              onMouseDown={(e) => { e.preventDefault(); setQuery(""); inputRef.current?.focus() }}
              className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {open && (
          <div className="absolute inset-x-0 top-full z-20 mt-1.5 overflow-hidden rounded-xl border border-border bg-card shadow-lg ring-1 ring-foreground/5">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-muted-foreground italic">No cards match &ldquo;{query}&rdquo;</p>
            ) : (
              <div className="py-1">
                {filtered.map((r, i) => (
                  <div
                    key={r.title}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 cursor-default transition-colors",
                      i === 0 ? "bg-accent" : "hover:bg-accent/50"
                    )}
                  >
                    <Search className="size-3.5 text-muted-foreground/50 shrink-0" />
                    <span className="flex-1 text-sm text-foreground truncate">{r.title}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] text-muted-foreground">{r.lane}</span>
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium text-primary">
                        {r.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
