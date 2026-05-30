import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: {
    api: {
      signInMagicLink: vi.fn(),
    },
  },
}))
vi.mock('next/headers', () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}))

import { signInWithMagicLink } from './actions'
import { auth } from '@/lib/auth'
import { APIError } from 'better-auth/api'

const idle = { status: 'idle' as const }

describe('signInWithMagicLink', () => {
  beforeEach(() => {
    vi.mocked(auth.api.signInMagicLink).mockReset()
  })

  it('returns error state for invalid email', async () => {
    const fd = new FormData()
    fd.set('email', 'not-an-email')
    const result = await signInWithMagicLink(idle, fd)
    expect(result).toMatchObject({ status: 'error' })
  })

  it('returns error state for empty email', async () => {
    const fd = new FormData()
    fd.set('email', '')
    const result = await signInWithMagicLink(idle, fd)
    expect(result).toMatchObject({ status: 'error' })
  })

  it('returns sent state for valid email', async () => {
    vi.mocked(auth.api.signInMagicLink).mockResolvedValue(undefined as never)
    const fd = new FormData()
    fd.set('email', 'user@example.com')
    const result = await signInWithMagicLink(idle, fd)
    expect(result).toEqual({ status: 'sent', email: 'user@example.com' })
  })

  it('returns error state when APIError is thrown', async () => {
    const apiErr = Object.create(APIError.prototype) as APIError
    Object.defineProperty(apiErr, 'message', {
      value: 'Rate limit exceeded',
      writable: true,
      configurable: true,
    })
    vi.mocked(auth.api.signInMagicLink).mockRejectedValue(apiErr)

    const fd = new FormData()
    fd.set('email', 'user@example.com')
    const result = await signInWithMagicLink(idle, fd)
    expect(result).toEqual({ status: 'error', error: 'Rate limit exceeded' })
  })

  it('rethrows non-APIError exceptions', async () => {
    vi.mocked(auth.api.signInMagicLink).mockRejectedValue(new Error('Network error'))
    const fd = new FormData()
    fd.set('email', 'user@example.com')
    await expect(signInWithMagicLink(idle, fd)).rejects.toThrow('Network error')
  })
})
