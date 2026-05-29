import { Button } from "@/components/ui/button"
import { ArrowRight, GitBranch } from "lucide-react"

export function CtaFooter() {
  return (
    <footer className="border-t border-border bg-sidebar/30">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
          Ready to focus?
        </p>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground mb-4">
          One board. No friction.
        </h2>
        <p className="mx-auto mb-8 max-w-md text-muted-foreground">
          Stop wrestling with your PM tool. FlowSpace gets out of the way so you can move cards, not meetings.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="gap-2 rounded-full px-6">
            Get the board
            <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2 rounded-full px-6">
            <GitBranch className="size-4" />
            View source
          </Button>
        </div>
        <p className="mt-12 text-xs text-muted-foreground/60">
          MIT licence · Built with Next.js, shadcn/ui, Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
