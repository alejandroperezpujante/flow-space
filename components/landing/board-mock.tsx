import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus } from "lucide-react"
import { type CardData, type LaneData, LANES, labelStyles } from "./board-data"

export function KanbanCard({
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
  const lanes: LaneData[] = compact ? LANES.slice(0, 4) : LANES

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
