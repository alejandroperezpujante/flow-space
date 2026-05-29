import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { GitBranch } from "lucide-react"

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
          FlowSpace
        </span>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#shortcuts" className="hover:text-foreground transition-colors">Shortcuts</a>
          <a href="#markdown" className="hover:text-foreground transition-colors">Markdown</a>
          <a href="#history" className="hover:text-foreground transition-colors">History</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="gap-1.5 rounded-full" asChild>
            <a href="https://github.com/alejandroperezpujante/flow-space" target="_blank" rel="noopener noreferrer">
              <GitBranch className="size-3.5" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
