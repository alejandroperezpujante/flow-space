import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { ThemeProvider } from '@/lib/theme'
import { ThemeToggle } from './theme-toggle'

function renderWithProvider() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  )
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('renders after mount (not a loading skeleton)', async () => {
    renderWithProvider()
    await act(async () => {})
    expect(screen.getByRole('tab', { name: /system theme/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /light theme/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /dark theme/i })).toBeInTheDocument()
  })

  it('defaults to system tab selected', async () => {
    renderWithProvider()
    await act(async () => {})
    const systemTab = screen.getByRole('tab', { name: /system theme/i })
    expect(systemTab).toHaveAttribute('data-state', 'active')
  })

  it('switches to dark theme when dark tab clicked', async () => {
    renderWithProvider()
    await act(async () => {})
    await userEvent.click(screen.getByRole('tab', { name: /dark theme/i }))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('switches to light theme when light tab clicked', async () => {
    localStorage.setItem('theme', 'dark')
    renderWithProvider()
    await act(async () => {})
    await userEvent.click(screen.getByRole('tab', { name: /light theme/i }))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
