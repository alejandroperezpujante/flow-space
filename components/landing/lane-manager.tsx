"use client"

import { useState, useEffect, memo, useCallback } from "react"
import { createPortal } from "react-dom"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragStartEvent,
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
import { GripVertical, Pencil, Trash2, Plus } from "lucide-react"

const DEFAULT_LANES = ["Inbox", "Today", "This Week", "Doing", "Done"]

interface LaneRowVisualProps {
  name: string
  index: number
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>
  isOverlay?: boolean
}

const LaneRowVisual = memo(function LaneRowVisual({ name, index, dragHandleProps, isOverlay }: LaneRowVisualProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
        isOverlay
          ? "border-border bg-card shadow-lg ring-1 ring-border"
          : "border-transparent hover:border-border hover:bg-sidebar/60 hover:shadow-xs group"
      )}
    >
      <button
        className="cursor-grab active:cursor-grabbing touch-none"
        {...dragHandleProps}
        aria-label={`Drag ${name}`}
      >
        <GripVertical
          className={cn(
            "size-4 text-muted-foreground/30 transition-colors shrink-0",
            !isOverlay && "group-hover:text-muted-foreground/70"
          )}
        />
      </button>
      <span className="flex-1 text-sm font-medium text-foreground">{name}</span>
      {!isOverlay && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <Pencil className="size-3" />
          </button>
          <button
            className={cn(
              "flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
              index === 0 && "opacity-30 pointer-events-none"
            )}
          >
            <Trash2 className="size-3" />
          </button>
        </div>
      )}
    </div>
  )
})

const SortableLaneRow = memo(function SortableLaneRow({ name, index }: { name: string; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: name })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(isDragging && "opacity-40")}
    >
      <LaneRowVisual name={name} index={index} dragHandleProps={{ ...listeners, ...attributes }} />
    </div>
  )
})

export function LaneManager() {
  const [lanes, setLanes] = useState(DEFAULT_LANES)
  const [activeLane, setActiveLane] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true) }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const onDragStart = useCallback(({ active }: DragStartEvent) => {
    setActiveLane(active.id as string)
  }, [])

  const onDragEnd = useCallback(({ active, over }: DragEndEvent) => {
    setActiveLane(null)
    if (!over || active.id === over.id) return
    setLanes((prev) => {
      const oldIdx = prev.indexOf(active.id as string)
      const newIdx = prev.indexOf(over.id as string)
      return arrayMove(prev, oldIdx, newIdx)
    })
  }, [])

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Lane order
      </p>
      <DndContext
        id="lane-manager"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={lanes} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {lanes.map((name, i) => (
              <SortableLaneRow key={name} name={name} index={i} />
            ))}

            <button className="mt-1 flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2.5 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
              <Plus className="size-4" />
              Add lane
            </button>
          </div>
        </SortableContext>
        {mounted && createPortal(
          <DragOverlay>
            {activeLane && (
              <LaneRowVisual
                name={activeLane}
                index={lanes.indexOf(activeLane)}
                isOverlay
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  )
}
