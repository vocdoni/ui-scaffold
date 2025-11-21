import { expect, test } from '../../fixtures/auth'
import { addMember, deleteMember, makeMemberData } from '../../utils/memberbase'

test.describe('Memberbase groups', () => {
  test('creates a group with all members', async ({ page }) => {
    await page.goto('/admin/memberbase/members/1')
    const member1 = makeMemberData(`all-${Date.now()}-1`)
    const member2 = makeMemberData(`all-${Date.now()}-2`)
    await addMember(page, member1)
    await addMember(page, member2)
    const groupName = `E2E Group All ${Date.now()}`
    await page.getByRole('button', { name: /create group \(all\)/i }).click()
    await page.getByLabel(/group name/i).fill(groupName)
    await page.getByLabel(/description/i).fill('E2E test group created from all current members in the table')
    await page.getByRole('button', { name: /^create group$/i }).click()
    await page.waitForURL('**/admin/memberbase/groups', { timeout: 20000 })
    await expect(page.getByText(groupName)).toBeVisible({ timeout: 10000 })

    await page.goto('/admin/memberbase/members/1')
    await page.waitForURL('**/admin/memberbase/members/1', { timeout: 20000 })
    await deleteMember(page, member1.email)
    await deleteMember(page, member2.email)
  })
  // test('creates a group with selected members', async ({ page }) => {
  //   const base = Date.now()
  //   const memberA = await addMember(page, makeMemberData(`sel-${base}-1`))
  //   const memberB = await addMember(page, makeMemberData(`sel-${base}-2`))
  //   const groupName = `E2E Group Selected ${base}`
  //   await page.goto('/admin/memberbase/members/1')
  //   await page.locator('tr', { hasText: memberA.email }).getByRole('checkbox').check()
  //   await page.locator('tr', { hasText: memberB.email }).getByRole('checkbox').check()
  //   await page.getByRole('button', { name: /^create group$/i }).click()
  //   await page.getByLabel(/group name/i).fill(groupName)
  //   await page.getByLabel(/description/i).fill('E2E test group created from two selected members')
  //   await page.getByRole('button', { name: /^create group$/i }).click()
  //   await page.waitForURL('**/admin/memberbase/groups', { timeout: 20000 })
  //   await expect(page.getByText(groupName)).toBeVisible({ timeout: 10000 })
  // })
})
