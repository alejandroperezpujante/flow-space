"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus } from "lucide-react"
import { type CardData, type LaneData, LANES, labelStyles } from "./board-data"

function CardVisual({ card, compact }: { card: CardData; compact?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg bg-card ring-1 ring-foreground/8",
        compact ? "p-2 space-y-1.5" : "p-3 space-y-2",
        card.highlight && "ring-1 ring-primary/30 bg-primary/3"
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

function SortableCard({ card, compact }: { card: CardData; compact?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("touch-none", isDragging && "opacity-40")}
      {...attributes}
      {...listeners}
    >
      <CardVisual card={card} compact={compact} />
    </div>
  )
}

function findLaneByCardId(lanes: LaneData[], cardId: string): LaneData | undefined {
  return lanes.find((l) => l.cards.some((c) => c.id === cardId))
}

interface InteractiveBoardMockProps {
  className?: string
}

export function InteractiveBoardMock({ className }: InteractiveBoardMockProps) {
  const [lanes, setLanes] = useState<LaneData[]>(LANES)
  const [activeCard, setActiveCard] = useState<CardData | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function onDragStart({ active }: DragStartEvent) {
    const sourceLane = findLaneByCardId(lanes, active.id as string)
    const card = sourceLane?.cards.find((c) => c.id === active.id)
    setActiveCard(card ?? null)
  }

  function onDragOver({ active, over }: DragOverEvent) {
    if (!over) return
    const activeId = active.id as string
    const overId = over.id as string
    if (activeId === overId) return

    // Read from `prev` (not the closure) so stale state can't cause an infinite update loop
    setLanes((prev) => {
      const src = prev.find((l) => l.cards.some((c) => c.id === activeId))
      if (!src) return prev

      // over can be a lane id or a card id
      const dst =
        prev.find((l) => l.id === overId) ??
        prev.find((l) => l.cards.some((c) => c.id === overId))
      // Same lane → nothing to do (prevents oscillation at lane borders)
      if (!dst || src.id === dst.id) return prev

      const cardIdx = src.cards.findIndex((c) => c.id === activeId)
      if (cardIdx === -1) return prev

      const next = prev.map((l) => ({ ...l, cards: [...l.cards] }))
      const nextSrc = next.find((l) => l.id === src.id)!
      const nextDst = next.find((l) => l.id === dst.id)!
      const [card] = nextSrc.cards.splice(cardIdx, 1)
      const overCardIdx = nextDst.cards.findIndex((c) => c.id === overId)
      if (overCardIdx === -1) {
        nextDst.cards.push(card)
      } else {
        nextDst.cards.splice(overCardIdx, 0, card)
      }
      return next
    })
  }

  function onDragEnd({ active, over }: DragEndEvent) {
    setActiveCard(null)
    if (!over || active.id === over.id) return

    const activeId = active.id as string
    const overId = over.id as string

    setLanes((prev) => {
      const lane = prev.find((l) => l.cards.some((c) => c.id === activeId))
      if (!lane) return prev
      const oldIdx = lane.cards.findIndex((c) => c.id === activeId)
      const newIdx = lane.cards.findIndex((c) => c.id === overId)
      if (oldIdx === -1 || newIdx === -1 || oldIdx === newIdx) return prev
      return prev.map((l) =>
        l.id === lane.id ? { ...l, cards: arrayMove(l.cards, oldIdx, newIdx) } : l
      )
    })
  }

  return (
    <DndContext
      id="board-mock"
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className={cn("flex gap-3 overflow-x-auto pb-2 text-sm", className)}>
        {lanes.map((lane) => (
          <div
            key={lane.id}
            id={lane.id}
            className="flex flex-col shrink-0 w-52 gap-2 p-3 rounded-2xl bg-sidebar"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground text-xs">{lane.name}</span>
                <span className="inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground font-medium size-4.5 text-[10px]">
                  {lane.cards.length}
                </span>
              </div>
              <Plus className="text-muted-foreground/60 shrink-0 size-3.5" />
            </div>
            <SortableContext items={lane.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-1.5 min-h-4">
                {lane.cards.map((card) => (
                  <SortableCard key={card.id} card={card} />
                ))}
              </div>
            </SortableContext>
          </div>
        ))}
      </div>
      {mounted && createPortal(
        <DragOverlay>
          {activeCard && (
            <div className="rotate-1 shadow-xl shadow-foreground/15 opacity-95">
              <CardVisual card={activeCard} />
            </div>
          )}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
