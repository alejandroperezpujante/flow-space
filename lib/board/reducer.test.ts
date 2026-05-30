import { describe, it, expect } from 'vitest'
import { findLaneByCardId, applyDragOver, applyDragEnd } from './reducer'
import type { LaneData } from '@/components/landing/board-data'

function makeLanes(): LaneData[] {
  return [
    {
      id: 'a',
      name: 'Lane A',
      cards: [
        { id: 'c1', title: 'Card 1' },
        { id: 'c2', title: 'Card 2' },
      ],
    },
    {
      id: 'b',
      name: 'Lane B',
      cards: [{ id: 'c3', title: 'Card 3' }],
    },
    {
      id: 'c',
      name: 'Lane C',
      cards: [],
    },
  ]
}

describe('findLaneByCardId', () => {
  it('finds the lane containing a card', () => {
    expect(findLaneByCardId(makeLanes(), 'c2')?.id).toBe('a')
  })

  it('returns undefined for unknown card id', () => {
    expect(findLaneByCardId(makeLanes(), 'unknown')).toBeUndefined()
  })
})

describe('applyDragOver', () => {
  it('moves card to another lane when over a card in that lane', () => {
    const result = applyDragOver(makeLanes(), 'c1', 'c3')
    expect(result.find((l) => l.id === 'a')?.cards.map((c) => c.id)).toEqual(['c2'])
    expect(result.find((l) => l.id === 'b')?.cards.map((c) => c.id)).toContain('c1')
  })

  it('inserts before the over-card in target lane', () => {
    // lane B has [c3]; move c2 so it lands before c3
    const result = applyDragOver(makeLanes(), 'c2', 'c3')
    expect(result.find((l) => l.id === 'b')?.cards.map((c) => c.id)).toEqual(['c2', 'c3'])
  })

  it('moves card to empty lane by lane id target', () => {
    const result = applyDragOver(makeLanes(), 'c1', 'c') // 'c' is lane C id
    expect(result.find((l) => l.id === 'c')?.cards.map((c) => c.id)).toEqual(['c1'])
    expect(result.find((l) => l.id === 'a')?.cards.map((c) => c.id)).toEqual(['c2'])
  })

  it('returns same reference when active === over (no-op)', () => {
    const lanes = makeLanes()
    expect(applyDragOver(lanes, 'c1', 'c1')).toBe(lanes)
  })

  it('returns same reference when src and dst are the same lane (prevents oscillation)', () => {
    const lanes = makeLanes()
    // c1 and c2 are both in lane A
    expect(applyDragOver(lanes, 'c1', 'c2')).toBe(lanes)
  })

  it('returns same reference when card not found', () => {
    const lanes = makeLanes()
    expect(applyDragOver(lanes, 'unknown', 'c3')).toBe(lanes)
  })

  it('does not mutate the original lanes array', () => {
    const lanes = makeLanes()
    const snapshot = JSON.stringify(lanes)
    applyDragOver(lanes, 'c1', 'c3')
    expect(JSON.stringify(lanes)).toBe(snapshot)
  })
})

describe('applyDragEnd', () => {
  it('reorders cards within a lane', () => {
    const result = applyDragEnd(makeLanes(), 'c1', 'c2')
    expect(result.find((l) => l.id === 'a')?.cards.map((c) => c.id)).toEqual(['c2', 'c1'])
  })

  it('returns same reference when active === over (no-op)', () => {
    const lanes = makeLanes()
    expect(applyDragEnd(lanes, 'c1', 'c1')).toBe(lanes)
  })

  it('returns same reference when card not found', () => {
    const lanes = makeLanes()
    expect(applyDragEnd(lanes, 'unknown', 'c2')).toBe(lanes)
  })

  it('does not mutate the original lanes array', () => {
    const lanes = makeLanes()
    const snapshot = JSON.stringify(lanes)
    applyDragEnd(lanes, 'c1', 'c2')
    expect(JSON.stringify(lanes)).toBe(snapshot)
  })
})
