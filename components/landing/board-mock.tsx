import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus } from "lucide-react"

interface CardData {
  id: string
  title: string
  labels?: { text: string; variant: "primary" | "destructive" | "muted" | "accent" }[]
  due?: string
  assignee?: string
  highlight?: boolean
}

interface LaneData {
  id: string
  name: string
  cards: CardData[]
}

const LANES: LaneData[] = [
  {
    id: "inbox",
    name: "Inbox",
    cards: [
      { id: "c1", title: "Review design system tokens", labels: [{ text: "design", variant: "primary" }], assignee: "AP" },
      { id: "c2", title: "Set up a deployment pipeline", labels: [{ text: "devops", variant: "muted" }], due: "Jun 1" },
      { id: "c3", title: "Write API documentation", labels: [{ text: "docs", variant: "accent" }] },
    ],
  },
  {
    id: "today",
    name: "Today",
    cards: [
      { id: "c4", title: "Fix keyboard navigation bug", labels: [{ text: "bug", variant: "destructive" }], assignee: "AP" },
      { id: "c5", title: "Code review: auth PR #42", labels: [{ text: "review", variant: "muted" }] },
    ],
  },
  {
    id: "this-week",
    name: "This Week",
    cards: [
      { id: "c6", title: "Implement search feature", labels: [{ text: "feature", variant: "primary" }], due: "Jun 4" },
      { id: "c7", title: "Add dark mode toggle", labels: [{ text: "feature", variant: "primary" }] },
      { id: "c8", title: "Performance audit", labels: [{ text: "perf", variant: "accent" }] },
    ],
  },
  {
    id: "doing",
    name: "Doing",
    cards: [
      { id: "c9", title: "Board drag & drop", labels: [{ text: "feature", variant: "primary" }], assignee: "AP", highlight: true },
      { id: "c10", title: "Landing page", labels: [{ text: "marketing", variant: "accent" }] },
    ],
  },
  {
    id: "done",
    name: "Done",
    cards: [
      { id: "c11", title: "Initial project setup", labels: [{ text: "setup", variant: "muted" }] },
      { id: "c12", title: "Markdown card editor", labels: [{ text: "feature", variant: "primary" }] },
    ],
  },
]

const labelStyles = {
  primary: "bg-primary/12 text-primary",
  destructive: "bg-destructive/12 text-destructive",
  muted: "bg-muted text-muted-foreground",
  accent: "bg-accent text-accent-foreground",
}

function KanbanCard({
  card,
  compact,
  highlighted,
}: {
  card: CardData
  compact?: boolean
  highlighted?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-lg bg-card ring-1 ring-foreground/8 transition-all",
        compact ? "p-2 space-y-1.5" : "p-3 space-y-2",
        highlighted && "ring-2 ring-primary shadow-md shadow-primary/10",
        card.highlight && !highlighted && "ring-1 ring-primary/30 bg-primary/3"
      )}
    >
      <p className={cn("font-medium leading-snug text-foreground", compact ? "text-[11px]" : "text-sm")}>
        {card.title}
      </p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {card.labels?.map((label) => (
            <span
              key={label.text}
              className={cn(
                "inline-flex items-center rounded-full px-1.5 py-0.5 font-medium",
                compact ? "text-[9px]" : "text-[10px]",
                labelStyles[label.variant]
              )}
            >
              {label.text}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {card.due && (
            <span className={cn("text-muted-foreground tabular-nums", compact ? "text-[9px]" : "text-[10px]")}>
              {card.due}
            </span>
          )}
          {card.assignee && (
            <Avatar size="sm" className={cn(compact ? "size-4" : "size-5")}>
              <AvatarFallback className={compact ? "text-[8px]" : "text-[9px]"}>{card.assignee}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  )
}

interface BoardMockProps {
  compact?: boolean
  highlightedLane?: string | null
  highlightedCard?: string | null
  className?: string
}

export function BoardMock({ compact, highlightedLane, highlightedCard, className }: BoardMockProps) {
  const lanes = compact ? LANES.slice(0, 4) : LANES

  return (
    <div
      className={cn(
        "flex gap-3 overflow-x-auto pb-2",
        compact ? "text-xs" : "text-sm",
        className
      )}
    >
      {lanes.map((lane) => (
        <div
          key={lane.id}
          className={cn(
            "flex flex-col shrink-0 rounded-2xl bg-sidebar transition-all",
            compact ? "w-36 gap-1.5 p-2" : "w-52 gap-2 p-3",
            highlightedLane === lane.id && "ring-2 ring-primary shadow-lg shadow-primary/10"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={cn("font-semibold text-foreground", compact ? "text-[11px]" : "text-xs")}>
                {lane.name}
              </span>
              <span
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground font-medium",
                  compact ? "size-3.5 text-[9px]" : "size-4.5 text-[10px]"
                )}
              >
                {lane.cards.length}
              </span>
            </div>
            <Plus
              className={cn("text-muted-foreground/60 shrink-0", compact ? "size-2.5" : "size-3.5")}
            />
          </div>
          <div className={cn("flex flex-col", compact ? "gap-1" : "gap-1.5")}>
            {lane.cards.map((card) => (
              <KanbanCard
                key={card.id}
                card={card}
                compact={compact}
                highlighted={highlightedCard === card.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
