import { defineConfig, devices } from '@playwright/test'

// Env vars loaded by the test:e2e script via dotenv-cli:
//   dotenv -e .env.local -- playwright test

export const AUTH_FILE = 'e2e/.auth/user.json'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    // Auth setup: runs before all authenticated tests
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    // Authenticated tests (use storageState from setup)
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
  ],
  webServer: {
    // CI: build + serve production bundle; local: reuse existing dev server
    command: process.env.CI
      ? 'pnpm build && pnpm start'
      : 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: 'pipe',  // capture stdout so setup can read console.log'd magic links if needed
  },
})
