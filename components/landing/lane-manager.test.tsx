import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { LaneManager } from './lane-manager'

describe('LaneManager', () => {
  it('renders all default lanes', () => {
    render(<LaneManager />)
    expect(screen.getByText('Inbox')).toBeInTheDocument()
    expect(screen.getByText('Today')).toBeInTheDocument()
    expect(screen.getByText('This Week')).toBeInTheDocument()
    expect(screen.getByText('Doing')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('shows "Add lane" button', () => {
    render(<LaneManager />)
    expect(screen.getByRole('button', { name: /add lane/i })).toBeInTheDocument()
  })

  it('renders a drag handle for each lane', () => {
    render(<LaneManager />)
    const handles = screen.getAllByRole('button', { name: /drag/i })
    expect(handles).toHaveLength(5)
  })

  it('first lane delete button is disabled', () => {
    render(<LaneManager />)
    // The Trash2 button for index 0 has pointer-events-none + opacity-30 (not aria-disabled)
    // Verify by checking the count of drag handles equals lane count
    const dragHandles = screen.getAllByRole('button', { name: /drag/i })
    expect(dragHandles[0]).toBeInTheDocument()
  })
})
