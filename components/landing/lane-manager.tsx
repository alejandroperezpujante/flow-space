import { cn } from "@/lib/utils"
import { GripVertical, Pencil, Trash2, Plus } from "lucide-react"

const LANES = ["Inbox", "Today", "This Week", "Doing", "Done"]

export function LaneManager() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Lane order
      </p>
      <div className="flex flex-col gap-2">
        {LANES.map((name, i) => (
          <div
            key={name}
            className={cn(
              "group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 transition-all",
              "hover:border-border hover:bg-sidebar/60 hover:shadow-xs"
            )}
          >
            <GripVertical className="size-4 text-muted-foreground/30 group-hover:text-muted-foreground/70 cursor-grab transition-colors shrink-0" />
            <span className="flex-1 text-sm font-medium text-foreground">{name}</span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                <Pencil className="size-3" />
              </button>
              <button
                className={cn(
                  "flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
                  i === 0 && "opacity-30 pointer-events-none"
                )}
              >
                <Trash2 className="size-3" />
              </button>
            </div>
          </div>
        ))}

        <button className="mt-1 flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2.5 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
          <Plus className="size-4" />
          Add lane
        </button>
      </div>
    </div>
  )
}
