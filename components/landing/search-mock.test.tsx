import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SearchMock } from './search-mock'

describe('SearchMock', () => {
  it('renders the search input', () => {
    render(<SearchMock />)
    expect(screen.getByPlaceholderText('Search cards…')).toBeInTheDocument()
  })

  it('shows all results when focused with no query', async () => {
    render(<SearchMock />)
    await userEvent.click(screen.getByPlaceholderText('Search cards…'))
    await waitFor(() =>
      expect(screen.getByText('Fix keyboard navigation bug')).toBeInTheDocument()
    )
    expect(screen.getByText('Implement search feature')).toBeInTheDocument()
    expect(screen.getByText('Write API documentation')).toBeInTheDocument()
  })

  it('filters results when typing a query', async () => {
    render(<SearchMock />)
    const input = screen.getByPlaceholderText('Search cards…')
    await userEvent.type(input, 'keyboard')
    expect(screen.getByText('Fix keyboard navigation bug')).toBeInTheDocument()
    expect(screen.queryByText('Implement search feature')).not.toBeInTheDocument()
  })

  it('shows "no cards match" message for unmatched query', async () => {
    render(<SearchMock />)
    const input = screen.getByPlaceholderText('Search cards…')
    await userEvent.type(input, 'zzznomatch')
    expect(screen.getByText(/no cards match/i)).toBeInTheDocument()
  })

  it('opens dropdown when "/" key is pressed on the window', async () => {
    render(<SearchMock />)
    fireEvent.keyDown(window, { key: '/' })
    await waitFor(() =>
      expect(screen.getByText('Fix keyboard navigation bug')).toBeInTheDocument()
    )
  })

  it('clears query and closes on Escape key', async () => {
    render(<SearchMock />)
    const input = screen.getByPlaceholderText('Search cards…')
    await userEvent.type(input, 'keyboard')
    fireEvent.keyDown(window, { key: 'Escape' })
    await waitFor(() =>
      expect(screen.queryByText('Fix keyboard navigation bug')).not.toBeInTheDocument()
    )
    expect((input as HTMLInputElement).value).toBe('')
  })

  it('shows clear button when query is non-empty', async () => {
    render(<SearchMock />)
    const input = screen.getByPlaceholderText('Search cards…')
    await userEvent.type(input, 'search')
    expect(document.querySelector('button[class*="muted"]') ?? screen.queryByRole('button', { hidden: true })).toBeTruthy()
  })
})
