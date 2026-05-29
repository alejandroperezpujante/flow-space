import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PlusCircle, ArrowRight, Pencil } from "lucide-react"

const EVENTS = [
  {
    icon: PlusCircle,
    iconClass: "text-primary",
    dotClass: "bg-primary/20 border-primary/40",
    user: "AP",
    action: "created this card",
    time: "May 28, 10:04 AM",
  },
  {
    icon: ArrowRight,
    iconClass: "text-chart-2",
    dotClass: "bg-chart-2/20 border-chart-2/40",
    user: "AP",
    action: 'moved from Inbox → Doing',
    time: "May 28, 11:30 AM",
  },
  {
    icon: Pencil,
    iconClass: "text-muted-foreground",
    dotClass: "bg-muted border-border",
    user: "AP",
    action: "updated the description",
    time: "May 28, 2:15 PM",
  },
  {
    icon: ArrowRight,
    iconClass: "text-chart-2",
    dotClass: "bg-chart-2/20 border-chart-2/40",
    user: "AP",
    action: "moved from Doing → Done",
    time: "May 28, 4:52 PM",
  },
]

export function HistoryTimeline() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Card history
      </p>
      <div className="relative flex flex-col gap-0">
        <div className="absolute left-5.5 top-4 bottom-4 w-px bg-border" />
        {EVENTS.map((event, i) => (
          <div key={i} className="relative flex items-start gap-3 py-2.5">
            <div
              className={cn(
                "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border",
                event.dotClass
              )}
            >
              <event.icon className={cn("size-3.5", event.iconClass)} />
            </div>
            <div className="flex-1 min-w-0 pt-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Avatar size="sm" className="size-4.5">
                  <AvatarFallback className="text-[8px]">{event.user}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-foreground font-medium">{event.user}</span>
                <span className="text-xs text-muted-foreground">{event.action}</span>
              </div>
              <p className="mt-0.5 text-[10px] text-muted-foreground/60 tabular-nums">{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
