import { test as base, type Page } from '@playwright/test'
import path from 'node:path'
import type { AuthAccount } from '../auth-accounts'
import { LoginPage } from '../pages/login.page'

type AuthWorkerFixtures = {
  authStorageState: string
}

/**
 * Logs in once per worker and reuses the storage state for the tests that import this fixture.
 * Tests that don't need auth can keep using the default Playwright test.
 */
export const test = base.extend<{}, AuthWorkerFixtures>({
  authStorageState: [
    async ({ browser }, use, workerInfo) => {
      const auth = workerInfo.project.metadata?.auth as AuthAccount | undefined
      if (!auth?.email || !auth?.password) {
        throw new Error(
          `Missing auth credentials for project "${workerInfo.project.name}". ` +
            'Populate e2e/auth-accounts.ts (see e2e/auth-accounts.example.ts) with email/password per project.'
        )
      }

      const storagePath = path.join(workerInfo.project.outputDir, `auth-${workerInfo.workerIndex}.json`)
      const { baseURL } = workerInfo.project.use
      const context = await browser.newContext({ baseURL })
      const page = await context.newPage()
      const loginPage = new LoginPage(page)

      await loginPage.goto()
      // await acceptCookiesIfPresent(page)
      await loginPage.login(auth.email, auth.password)
      await loginPage.waitForDashboard()
      await context.storageState({ path: storagePath })
      await context.close()

      await use(storagePath)
    },
    { scope: 'worker' },
  ],

  context: async ({ browser, authStorageState }, use, testInfo) => {
    const { baseURL } = testInfo.project.use
    const context = await browser.newContext({ baseURL, storageState: authStorageState })
    await use(context)
    await context.close()
  },
})

export { expect } from '@playwright/test'

const acceptCookiesIfPresent = async (page: Page) => {
  const acceptButton = page.getByRole('button', { name: /accept/i })
  try {
    await acceptButton.waitFor({ state: 'visible', timeout: 2000 })
    await acceptButton.click()
  } catch {
    // Banner not present; ignore.
  }
}
