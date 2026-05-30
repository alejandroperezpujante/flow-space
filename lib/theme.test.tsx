import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ThemeProvider, useTheme, type Theme } from './theme'

function ThemeConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  )
}

function renderWithProvider() {
  return render(
    <ThemeProvider>
      <ThemeConsumer />
    </ThemeProvider>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    document.documentElement.style.colorScheme = ''
  })

  it('defaults to system theme', async () => {
    renderWithProvider()
    await act(async () => {})
    expect(screen.getByTestId('theme')).toHaveTextContent('system')
  })

  it('reads stored theme from localStorage on mount', async () => {
    localStorage.setItem('theme', 'dark')
    renderWithProvider()
    await act(async () => {})
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('ignores unknown stored values and defaults to system', async () => {
    localStorage.setItem('theme', 'invalid-value')
    renderWithProvider()
    await act(async () => {})
    expect(screen.getByTestId('theme')).toHaveTextContent('system')
  })

  it('setTheme updates the displayed theme', async () => {
    renderWithProvider()
    await act(async () => {})
    await userEvent.click(screen.getByText('Dark'))
    await waitFor(() =>
      expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    )
  })

  it('setTheme persists to localStorage', async () => {
    renderWithProvider()
    await act(async () => {})
    await userEvent.click(screen.getByText('Dark'))
    await waitFor(() => expect(localStorage.getItem('theme')).toBe('dark'))
  })

  it('applies dark class to documentElement when dark theme is set', async () => {
    renderWithProvider()
    await act(async () => {})
    await userEvent.click(screen.getByText('Dark'))
    await waitFor(() =>
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    )
  })

  it('removes dark class when switching to light', async () => {
    localStorage.setItem('theme', 'dark')
    renderWithProvider()
    await act(async () => {})
    await userEvent.click(screen.getByText('Light'))
    await waitFor(() =>
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    )
  })

  it('resolves system to light when matchMedia reports no dark preference', async () => {
    // vitest.setup.ts stubs matchMedia to return matches: false
    renderWithProvider()
    await act(async () => {})
    expect(screen.getByTestId('resolved')).toHaveTextContent('light')
  })

  it('resolves system to dark when matchMedia reports dark preference', async () => {
    vi.mocked(window.matchMedia).mockImplementation((q: string) => ({
      matches: q === '(prefers-color-scheme: dark)',
      media: q,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    renderWithProvider()
    await act(async () => {})
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark')
  })

  it('throws when useTheme is used outside ThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ThemeConsumer />)).toThrow(
      'useTheme must be used within ThemeProvider'
    )
    spy.mockRestore()
  })
})
