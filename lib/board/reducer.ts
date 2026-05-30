import { arrayMove } from '@dnd-kit/sortable'
import type { LaneData } from '@/components/landing/board-data'

/** Returns the lane that contains the given card id, or undefined. */
export function findLaneByCardId(
  lanes: LaneData[],
  cardId: string
): LaneData | undefined {
  return lanes.find((l) => l.cards.some((c) => c.id === cardId))
}

/**
 * Pure reducer for DragOverEvent: moves the active card to the destination lane.
 * Guards against same-lane moves to prevent oscillation at lane borders.
 * Returns the same reference if no change is needed.
 */
export function applyDragOver(
  lanes: LaneData[],
  activeId: string,
  overId: string
): LaneData[] {
  if (activeId === overId) return lanes

  const src = lanes.find((l) => l.cards.some((c) => c.id === activeId))
  if (!src) return lanes

  // overId can be a lane id or a card id
  const dst =
    lanes.find((l) => l.id === overId) ??
    lanes.find((l) => l.cards.some((c) => c.id === overId))

  // Same lane — nothing to do; prevents oscillation at lane borders
  if (!dst || src.id === dst.id) return lanes

  const cardIdx = src.cards.findIndex((c) => c.id === activeId)
  if (cardIdx === -1) return lanes

  const next = lanes.map((l) => ({ ...l, cards: [...l.cards] }))
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
}

/**
 * Pure reducer for DragEndEvent: reorders cards within the same lane using arrayMove.
 * Returns the same reference if no change is needed.
 */
export function applyDragEnd(
  lanes: LaneData[],
  activeId: string,
  overId: string
): LaneData[] {
  if (activeId === overId) return lanes

  const lane = lanes.find((l) => l.cards.some((c) => c.id === activeId))
  if (!lane) return lanes

  const oldIdx = lane.cards.findIndex((c) => c.id === activeId)
  const newIdx = lane.cards.findIndex((c) => c.id === overId)

  if (oldIdx === -1 || newIdx === -1 || oldIdx === newIdx) return lanes

  return lanes.map((l) =>
    l.id === lane.id ? { ...l, cards: arrayMove(l.cards, oldIdx, newIdx) } : l
  )
}
