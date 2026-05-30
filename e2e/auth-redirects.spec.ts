import { test, expect } from '@playwright/test'

/**
 * Unauthenticated redirect behaviour.
 * These specs run WITHOUT storageState (no cookies) to test proxy.ts + server guards.
 */

test.describe('unauthenticated redirects', () => {
  test('/dashboard redirects to /sign-in when not logged in', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/sign-in/)
  })

  test('/dashboard nested path redirects to /sign-in', async ({ page }) => {
    await page.goto('/dashboard/settings')
    await expect(page).toHaveURL(/\/sign-in/)
  })
})

test.describe('authenticated redirects', () => {
  // Reuse the session created by auth.setup.ts
  test.use({ storageState: 'e2e/.auth/user.json' })

  test('/sign-in redirects to /dashboard when already logged in', async ({ page }) => {
    await page.goto('/sign-in')
    await expect(page).toHaveURL(/\/dashboard/)
  })

  test('/dashboard is accessible when logged in', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/dashboard/)
    await expect(page).not.toHaveURL(/\/sign-in/)
  })
})
