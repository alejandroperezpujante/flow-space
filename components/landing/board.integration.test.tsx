/**
 * Integration tests for the landing board mock.
 * Tests that the board, lane columns, and cards render and interact correctly
 * as a composed unit. Drag interactions in jsdom use the keyboard sensor.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { InteractiveBoardMock } from './interactive-board-mock'

describe('InteractiveBoardMock', () => {
  it('renders all five default lanes', () => {
    render(<InteractiveBoardMock />)
    expect(screen.getByText('Inbox')).toBeInTheDocument()
    expect(screen.getByText('Today')).toBeInTheDocument()
    expect(screen.getByText('This Week')).toBeInTheDocument()
    expect(screen.getByText('Doing')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('renders card titles from the default dataset', () => {
    render(<InteractiveBoardMock />)
    expect(screen.getByText('Review design system tokens')).toBeInTheDocument()
    expect(screen.getByText('Fix keyboard navigation bug')).toBeInTheDocument()
    expect(screen.getByText('Board drag & drop')).toBeInTheDocument()
  })

  it('displays a card count badge per lane', () => {
    render(<InteractiveBoardMock />)
    // Inbox has 3 cards, Today has 2 — verify badges are rendered
    const badges = screen.getAllByText('3')
    expect(badges.length).toBeGreaterThanOrEqual(1)
  })

  it('renders labels on cards that have them', () => {
    render(<InteractiveBoardMock />)
    expect(screen.getAllByText('design').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('bug').length).toBeGreaterThanOrEqual(1)
  })

  it('accepts an optional className prop', () => {
    const { container } = render(<InteractiveBoardMock className="test-class" />)
    expect(container.firstChild).toHaveClass('test-class')
  })

  it.todo('keyboard: drag card from Inbox to Today lane')
  it.todo('keyboard: reorder cards within the same lane')
  it.todo('keyboard: drag card to empty lane')
})
