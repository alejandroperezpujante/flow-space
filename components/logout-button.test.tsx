import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// vi.hoisted ensures these are available inside the vi.mock factory (which is hoisted)
const mockPush = vi.hoisted(() => vi.fn())
const mockSignOut = vi.hoisted(() => vi.fn())

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))
vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signOut: mockSignOut,
  },
}))

import { LogoutButton } from './logout-button'

describe('LogoutButton', () => {
  beforeEach(() => {
    mockPush.mockReset()
    mockSignOut.mockReset()
  })

  it('renders "Sign out" button', () => {
    render(<LogoutButton />)
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument()
  })

  it('calls authClient.signOut when clicked', async () => {
    mockSignOut.mockResolvedValue({ data: {}, error: null })
    render(<LogoutButton />)
    await userEvent.click(screen.getByRole('button', { name: /sign out/i }))
    await waitFor(() => expect(mockSignOut).toHaveBeenCalledOnce())
  })

  it('navigates to /sign-in after sign out', async () => {
    mockSignOut.mockResolvedValue({ data: {}, error: null })
    render(<LogoutButton />)
    await userEvent.click(screen.getByRole('button', { name: /sign out/i }))
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/sign-in'))
  })
})
