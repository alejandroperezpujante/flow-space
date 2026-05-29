import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, GripVertical, X } from "lucide-react"

export function CardDetailMock() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-lg ring-1 ring-foreground/6 overflow-hidden">
      <div className="border-b border-border bg-sidebar/40 px-5 py-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <GripVertical className="size-4 text-muted-foreground/40 mt-0.5 shrink-0" />
          <h3 className="font-heading text-base font-semibold text-foreground leading-snug">
            Board drag &amp; drop
          </h3>
        </div>
        <button className="text-muted-foreground/50 hover:text-muted-foreground transition-colors shrink-0 mt-0.5">
          <X className="size-4" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-4">
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground w-16">Assignee</span>
            <div className="flex items-center gap-1.5">
              <Avatar size="sm" className="size-5">
                <AvatarFallback className="text-[9px]">AP</AvatarFallback>
              </Avatar>
              <span className="text-xs text-foreground">Alejandro P.</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground w-16">Due</span>
            <div className="flex items-center gap-1 text-xs text-foreground">
              <CalendarDays className="size-3 text-muted-foreground" />
              Jun 6, 2026
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs font-medium text-muted-foreground mr-1">Labels</span>
          <Badge variant="default" className="text-[10px]">feature</Badge>
          <Badge variant="outline" className="text-[10px]">milestone-1</Badge>
        </div>

        <div className="text-sm text-muted-foreground space-y-1.5">
          <p className="font-medium text-foreground text-xs uppercase tracking-wide">Description</p>
          <p className="text-sm leading-relaxed">
            Implement drag-and-drop for Kanban cards using the Pointer Events API. Cards should be draggable within a lane and across lanes.
          </p>
          <ul className="space-y-1 text-sm">
            {[
              { done: false, text: "Cards draggable within a lane (reorder)" },
              { done: false, text: "Cards draggable across lanes" },
              { done: true, text: "Optimistic UI — card moves instantly" },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-2">
                <span
                  className={
                    item.done
                      ? "size-3 shrink-0 rounded border-2 border-primary bg-primary/15 flex items-center justify-center"
                      : "size-3 shrink-0 rounded border-2 border-border"
                  }
                >
                  {item.done && <span className="text-[7px] leading-none text-primary">✓</span>}
                </span>
                <span className={item.done ? "line-through text-muted-foreground text-xs" : "text-xs"}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-5 py-3 bg-muted/20">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Activity</p>
        <div className="space-y-2">
          {[
            { action: "created this card", time: "10:04 AM" },
            { action: "moved from Inbox → Doing", time: "11:30 AM" },
          ].map((e) => (
            <div key={e.action} className="flex items-center gap-2">
              <Avatar size="sm" className="size-4">
                <AvatarFallback className="text-[7px]">AP</AvatarFallback>
              </Avatar>
              <span className="text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground">AP</span> {e.action}
              </span>
              <span className="ml-auto text-[10px] text-muted-foreground/50 tabular-nums">{e.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
