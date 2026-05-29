import type { ReactNode } from "react";
import { cn } from "@/lib/utils"
import { Wifi, WifiOff, Check } from "lucide-react"

export function OptimisticStrip() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Optimistic updates
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Every action updates the UI instantly. Network reconciliation happens in the background — you never wait.
      </p>

      <div className="flex flex-col gap-2 pt-1">
        <Step
          icon={<WifiOff className="size-3.5" />}
          iconClass="text-muted-foreground"
          dotClass="bg-muted border-border"
          label="You move a card"
          sub="Card snaps to the new lane immediately"
          state="neutral"
        />
        <Step
          icon={<Wifi className="size-3.5" />}
          iconClass="text-chart-2"
          dotClass="bg-chart-2/15 border-chart-2/40"
          label="Syncing…"
          sub="Server request in flight"
          state="pending"
        />
        <Step
          icon={<Check className="size-3.5" />}
          iconClass="text-primary"
          dotClass="bg-primary/15 border-primary/40"
          label="Confirmed"
          sub="Server acked — nothing changed visually"
          state="done"
        />
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 mt-1">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-primary" />
        </span>
        <span className="text-xs text-muted-foreground">
          If the server rejects, the card snaps back — no stale state, no refresh needed.
        </span>
      </div>
    </div>
  )
}

function Step({
  icon,
  iconClass,
  dotClass,
  label,
  sub,
  state,
}: {
  icon: ReactNode
  iconClass: string
  dotClass: string
  label: string
  sub: string
  state: "neutral" | "pending" | "done"
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border",
          dotClass,
          iconClass
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-foreground">{label}</span>
          {state === "pending" && (
            <span className="inline-flex h-4 items-center rounded-full bg-chart-2/15 px-1.5 text-[9px] font-medium text-chart-2 animate-pulse">
              pending
            </span>
          )}
          {state === "done" && (
            <span className="inline-flex h-4 items-center rounded-full bg-primary/15 px-1.5 text-[9px] font-medium text-primary">
              ✓ synced
            </span>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  )
}
