import { expect, type Page } from '@playwright/test'

export const deleteGroup = async (page: Page, groupName: string) => {
  const originUrl = page.url()
  const groupsUrl = '/admin/memberbase/groups'
  if (originUrl !== groupsUrl) {
    await page.goto(groupsUrl)
  }

  const card = page.locator('.chakra-card').filter({ hasText: groupName }).first()
  await expect(card).toBeVisible({ timeout: 10000 })

  const menuButton = card.getByRole('button', { name: /more options/i }).first()
  await expect(menuButton).toBeVisible({ timeout: 5000 })
  await menuButton.click()

  const deleteAction = page.getByRole('menuitem', { name: /delete group/i })
  await expect(deleteAction).toBeVisible({ timeout: 5000 })
  await deleteAction.click()

  const confirmDelete = page.getByRole('button', { name: /^delete$/i })
  await expect(confirmDelete).toBeVisible({ timeout: 5000 })
  await confirmDelete.click()

  await page.waitForResponse((response) => {
    const url = response.url()
    return url.includes('/groups/') && response.request().method() === 'DELETE' && response.ok()
  })

  await page.goto('/admin/memberbase/groups')
  await expect(page.locator('.chakra-card').filter({ hasText: groupName })).toHaveCount(0, { timeout: 10000 })

  if (originUrl !== groupsUrl) {
    await page.goto(originUrl)
  }
}
