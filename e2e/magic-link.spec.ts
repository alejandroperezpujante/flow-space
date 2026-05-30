import { test, expect } from '@playwright/test'

/**
 * Magic-link sign-in UI flow (unauthenticated).
 * Does NOT verify email delivery — only the UI state transitions.
 */

test.describe('magic link form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-in')
  })

  test('shows sign-in form on /sign-in', async ({ page }) => {
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByRole('button', { name: /send magic link/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /continue with google/i })).toBeVisible()
  })

  test('shows sent state after submitting valid email', async ({ page }) => {
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByRole('button', { name: /send magic link/i }).click()
    await expect(page.getByText(/check your email/i)).toBeVisible({ timeout: 10_000 })
    await expect(page.getByText('test@example.com')).toBeVisible()
  })

  test('"Use a different email" resets back to the form', async ({ page }) => {
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByRole('button', { name: /send magic link/i }).click()
    await expect(page.getByText(/check your email/i)).toBeVisible({ timeout: 10_000 })
    await page.getByRole('button', { name: /use a different email/i }).click()
    await expect(page.getByLabel('Email')).toBeVisible()
  })
})
