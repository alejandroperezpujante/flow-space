import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('better-auth/cookies', () => ({
  getSessionCookie: vi.fn(),
}))

import { proxy } from './proxy'
import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest } from 'next/server'

function req(path: string): NextRequest {
  return new NextRequest(new URL(path, 'http://localhost:3000'))
}

describe('proxy redirect logic', () => {
  beforeEach(() => {
    vi.mocked(getSessionCookie).mockReset()
  })

  it('redirects unauthenticated user from /dashboard to /sign-in', () => {
    vi.mocked(getSessionCookie).mockReturnValue(null as never)
    const res = proxy(req('/dashboard'))
    expect(res.headers.get('location')).toContain('/sign-in')
  })

  it('redirects authenticated user from /sign-in to /dashboard', () => {
    vi.mocked(getSessionCookie).mockReturnValue('tok' as never)
    const res = proxy(req('/sign-in'))
    expect(res.headers.get('location')).toContain('/dashboard')
  })

  it('passes through authenticated request to /dashboard (no redirect)', () => {
    vi.mocked(getSessionCookie).mockReturnValue('tok' as never)
    const res = proxy(req('/dashboard'))
    expect(res.headers.get('location')).toBeNull()
    expect(res.status).toBe(200)
  })

  it('passes through unauthenticated request to /sign-in (no redirect)', () => {
    vi.mocked(getSessionCookie).mockReturnValue(null as never)
    const res = proxy(req('/sign-in'))
    expect(res.headers.get('location')).toBeNull()
    expect(res.status).toBe(200)
  })

  it('redirects unauthenticated user from nested dashboard path to /sign-in', () => {
    vi.mocked(getSessionCookie).mockReturnValue(null as never)
    const res = proxy(req('/dashboard/settings'))
    expect(res.headers.get('location')).toContain('/sign-in')
  })
})
