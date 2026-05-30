import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BoardMock, KanbanCard } from './board-mock'
import type { CardData } from './board-data'

describe('BoardMock snapshot', () => {
  it('renders default board consistently', () => {
    const { asFragment } = render(<BoardMock />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders compact board consistently', () => {
    const { asFragment } = render(<BoardMock compact />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with highlighted lane consistently', () => {
    const { asFragment } = render(<BoardMock highlightedLane="inbox" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with highlighted card consistently', () => {
    const { asFragment } = render(<BoardMock highlightedCard="c4" />)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('KanbanCard snapshot', () => {
  const card: CardData = {
    id: 'c1',
    title: 'Test card',
    labels: [{ text: 'feature', variant: 'primary' }],
    due: 'Jun 1',
    assignee: 'AP',
  }

  it('renders a card consistently', () => {
    const { asFragment } = render(<KanbanCard card={card} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders compact card consistently', () => {
    const { asFragment } = render(<KanbanCard card={card} compact />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders highlighted card consistently', () => {
    const { asFragment } = render(<KanbanCard card={card} highlighted />)
    expect(asFragment()).toMatchSnapshot()
  })
})
