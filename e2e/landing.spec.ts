import { test, expect } from '@playwright/test'

/**
 * Landing page e2e tests — exercises the interactive board/search mocks
 * and static sections in a real browser (covers async RSC paths that Vitest skips).
 */

test.describe('landing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders the hero heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /boards that get out/i })
    ).toBeVisible()
  })

  test('renders the interactive board mock', async ({ page }) => {
    // Board mock is embedded in the hero — verify lane titles are visible
    await expect(page.getByText('Inbox').first()).toBeVisible()
    await expect(page.getByText('Today').first()).toBeVisible()
  })

  test('search mock filters results when typing', async ({ page }) => {
    const input = page.getByPlaceholder('Search cards…')
    await input.click()
    await input.fill('keyboard')
    await expect(page.getByText('Fix keyboard navigation bug')).toBeVisible()
  })

  test('"/" key focuses the search input', async ({ page }) => {
    // Click away from any input first
    await page.click('body')
    await page.keyboard.press('/')
    const input = page.getByPlaceholder('Search cards…')
    await expect(input).toBeFocused()
  })

  test('Escape clears the search input', async ({ page }) => {
    const input = page.getByPlaceholder('Search cards…')
    await input.fill('keyboard')
    await page.keyboard.press('Escape')
    await expect(input).toHaveValue('')
  })

  test('feature grid section is visible', async ({ page }) => {
    await page.getByRole('link', { name: /features/i }).click()
    await expect(page.getByText('Rich cards')).toBeVisible()
    await expect(page.getByText('Keyboard-first')).toBeVisible()
  })

  test('CTA footer is present', async ({ page }) => {
    await expect(page.getByText(/one board\. no friction/i)).toBeVisible()
  })
})
