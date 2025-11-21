import { expect, type Page } from '@playwright/test'

export type MemberData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  memberNumber: string
  nationalId: string
  birthDate: string
}

export const makeMemberData = (suffix = Date.now().toString()): MemberData => ({
  firstName: 'E2E',
  lastName: 'User',
  email: `e2e+member-${suffix}@example.com`,
  phone: '+34666666666',
  memberNumber: `E2E-${suffix}`,
  nationalId: `ID-${suffix}`,
  birthDate: '1990-01-01',
})

export const addMember = async (page: Page, data: MemberData): Promise<MemberData> => {
  await page.goto('/admin/memberbase/members/1')

  await page.getByRole('button', { name: /add member/i }).click()

  await page.getByLabel(/First Name/i).fill(data.firstName)
  await page.getByLabel(/Last Name/i).fill(data.lastName)
  await page.getByLabel(/Email/i).fill(data.email)
  await page.getByLabel(/Phone/i).fill(data.phone)
  await page.getByLabel(/Member Number/i).fill(data.memberNumber)
  await page.getByLabel(/National ID/i).fill(data.nationalId)
  await page.getByLabel(/Birth Date/i).fill(data.birthDate)

  await page.getByRole('button', { name: /save/i }).click()
  await page.waitForResponse((response) => {
    const url = response.url()
    return (
      url.includes('/members') && url.includes('async=false') && response.request().method() === 'POST' && response.ok()
    )
  })

  await page.waitForResponse((response) => {
    const url = response.url()
    const isMembersFetch = url.includes('/members') && response.request().method() === 'GET'
    return isMembersFetch && response.ok()
  })

  await expect(page.getByText(data.email)).toBeVisible({ timeout: 5000 })

  return data
}

export const deleteMember = async (page: Page, email: string) => {
  const row = page.locator('tr', { hasText: email })
  await row.getByRole('button').last().click()

  const deleteAction = page.getByRole('menuitem', { name: /delete/i })
  await expect(deleteAction).toBeVisible({ timeout: 5000 })
  await deleteAction.click()

  const confirmDelete = page.getByRole('button', { name: /^delete$/i })
  await expect(confirmDelete).toBeVisible({ timeout: 5000 })
  await confirmDelete.click()

  await page.waitForResponse((response) => {
    const url = response.url()
    return url.includes('/members') && response.request().method() === 'DELETE' && response.ok()
  })

  await expect(page.getByText(email)).not.toBeVisible({ timeout: 10000 })
}
