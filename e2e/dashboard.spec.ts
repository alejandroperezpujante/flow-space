import { test, expect } from '@playwright/test'

test.use({ storageState: 'e2e/.auth/user.json' })

test.describe('dashboard (authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
  })

  test('loads the dashboard page', async ({ page }) => {
    await expect(page).toHaveURL(/\/dashboard/)
  })

  test('shows the user email or name', async ({ page }) => {
    // Dashboard renders the authenticated user's info
    await expect(
      page.getByText(/e2e-test@example\.com|E2E Test User/i)
    ).toBeVisible()
  })

  test('sign out navigates to /sign-in', async ({ page }) => {
    await page.getByRole('button', { name: /sign out/i }).click()
    await expect(page).toHaveURL(/\/sign-in/, { timeout: 10_000 })
  })
})
