import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MagicLinkForm } from './magic-link-form'

// vi.hoisted ensures these are available inside the vi.mock factory (which is hoisted)
const mockSignInSocial = vi.hoisted(() => vi.fn())

vi.mock('@/app/(auth)/actions', () => ({
  signInWithMagicLink: vi.fn(),
}))
vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signIn: {
      social: mockSignInSocial,
    },
  },
}))

import { signInWithMagicLink } from '@/app/(auth)/actions'

describe('MagicLinkForm', () => {
  beforeEach(() => {
    vi.mocked(signInWithMagicLink).mockReset()
    mockSignInSocial.mockReset()
  })

  it('renders the idle form with all controls', () => {
    render(<MagicLinkForm />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send magic link/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument()
  })

  it('calls authClient.signIn.social with google provider when Google button clicked', async () => {
    mockSignInSocial.mockResolvedValue({ data: {}, error: null })
    render(<MagicLinkForm />)
    await userEvent.click(screen.getByRole('button', { name: /continue with google/i }))
    expect(mockSignInSocial).toHaveBeenCalledWith({
      provider: 'google',
      callbackURL: '/dashboard',
    })
  })

  it('shows sent state after successful magic link submission', async () => {
    vi.mocked(signInWithMagicLink).mockResolvedValue({
      status: 'sent',
      email: 'test@example.com',
    })

    render(<MagicLinkForm />)
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
    await userEvent.click(screen.getByRole('button', { name: /send magic link/i }))

    await waitFor(
      () => expect(screen.getByText(/check your email/i)).toBeInTheDocument(),
      { timeout: 3000 }
    )
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('shows error message when action returns error state', async () => {
    vi.mocked(signInWithMagicLink).mockResolvedValue({
      status: 'error',
      error: 'Invalid email address.',
    })

    render(<MagicLinkForm />)
    await userEvent.type(screen.getByLabelText('Email'), 'bad@bad.com')
    await userEvent.click(screen.getByRole('button', { name: /send magic link/i }))

    await waitFor(
      () => expect(screen.getByText('Invalid email address.')).toBeInTheDocument(),
      { timeout: 3000 }
    )
  })

  it('resets back to idle form when "Use a different email" is clicked', async () => {
    vi.mocked(signInWithMagicLink).mockResolvedValue({
      status: 'sent',
      email: 'test@example.com',
    })

    render(<MagicLinkForm />)
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
    await userEvent.click(screen.getByRole('button', { name: /send magic link/i }))

    await waitFor(() =>
      expect(screen.getByText(/use a different email/i)).toBeInTheDocument()
    )
    await userEvent.click(screen.getByRole('button', { name: /use a different email/i }))

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })
})
