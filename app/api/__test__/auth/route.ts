/**
 * TEST-ONLY: create a stable test session for Playwright e2e tests.
 *
 * Inserts a fixed test user + session into the database and returns the
 * BetterAuth session cookie. The route is guarded to 404 in production.
 *
 * Usage in Playwright:
 *   const res = await page.request.post('/api/__test__/auth')
 *   // cookies automatically stored in page context
 */
import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { user, session } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

const TEST_USER_ID = 'e2e-test-user-id'
const TEST_USER_EMAIL = 'e2e-test@example.com'
const TEST_SESSION_ID = 'e2e-test-session-id'
const TEST_SESSION_TOKEN = 'e2e-test-session-token-fixed'

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const db = getDb()

  // Upsert test user (idempotent across test runs)
  await db
    .insert(user)
    .values({
      id: TEST_USER_ID,
      name: 'E2E Test User',
      email: TEST_USER_EMAIL,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoNothing()

  // Upsert test session — refresh expiry each run
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  await db
    .insert(session)
    .values({
      id: TEST_SESSION_ID,
      token: TEST_SESSION_TOKEN,
      expiresAt,
      userId: TEST_USER_ID,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: session.id,
      set: {
        token: TEST_SESSION_TOKEN,
        expiresAt,
        updatedAt: new Date(),
      },
    })

  return NextResponse.json({ ok: true }, {
    headers: {
      // BetterAuth reads "better-auth.session_token" cookie by default
      'Set-Cookie': `better-auth.session_token=${TEST_SESSION_TOKEN}; Path=/; HttpOnly; SameSite=Lax`,
    },
  })
}
