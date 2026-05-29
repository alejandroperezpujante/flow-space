import { Button } from "@/components/ui/button"
import { BoardMock } from "@/components/landing/board-mock"
import { GitBranch, ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-0 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
          Kanban, middle-ground
        </p>
        <h1 className="font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
          Boards that get out<br className="hidden sm:block" /> of your way.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Trello has too many moving parts. A notebook has too few. FlowSpace is the middle ground &mdash; one board, lanes you name, cards with Markdown, and an Inbox for everything you&apos;ll triage later.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="gap-2 rounded-full px-6">
            Get the board
            <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2 rounded-full px-6" asChild>
            <a href="https://github.com/alejandroperezpujante/flow-space" target="_blank" rel="noopener noreferrer">
              <GitBranch className="size-4" />
              View on GitHub
            </a>
          </Button>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-6xl px-6">
        <div
          className="rounded-2xl border border-border bg-sidebar/50 p-4 shadow-2xl shadow-foreground/8 ring-1 ring-foreground/5"
          style={{
            transform: "perspective(1200px) rotateX(6deg)",
            transformOrigin: "top center",
          }}
        >
          <div className="mb-3 flex items-center gap-1.5 px-1">
            <span className="size-2.5 rounded-full bg-destructive/50" />
            <span className="size-2.5 rounded-full bg-chart-1/70" />
            <span className="size-2.5 rounded-full bg-primary/50" />
            <span className="ml-3 text-[11px] font-medium text-muted-foreground/60">FlowSpace — My workspace</span>
          </div>
          <BoardMock />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
