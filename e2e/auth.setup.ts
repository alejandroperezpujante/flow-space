import { test as setup, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

export const AUTH_FILE = path.join(__dirname, '.auth/user.json')

setup('create e2e test session', async ({ page }) => {
  // Ensure directory exists (Playwright may not create it automatically)
  fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true })

  // Call the test-only endpoint. It creates a fixed test user + session
  // in the DB and responds with the BetterAuth session cookie.
  const response = await page.request.post('/api/__test__/auth')
  expect(response.ok()).toBeTruthy()

  // Confirm the session cookie was received and the dashboard is reachable
  await page.goto('/dashboard')
  await page.waitForURL('/dashboard', { timeout: 10_000 })

  // Persist browser storage (cookies) so authenticated specs can reuse it
  await page.context().storageState({ path: AUTH_FILE })
})
