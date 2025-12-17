import { expect, test } from '../../fixtures/auth'
import { addMember, deleteMember, makeMemberData, clickMemberCheckbox } from '../../utils/memberbase'
import { deleteGroup } from '../../utils/groups'

test.describe('Memberbase groups', () => {
  test('creates a group with all members', async ({ page }) => {
    const base = Date.now()
    const member1 = makeMemberData(`all-${base}-1`)
    const member2 = makeMemberData(`all-${base}-2`)
    const groupName = `E2E Group All ${base}`

    await page.goto('/admin/memberbase/members/1')
    await addMember(page, member1)
    await addMember(page, member2)
    await page.getByRole('button', { name: /create group \(all\)/i }).click()
    await page.getByLabel(/group name/i).fill(groupName)
    await page.getByLabel(/description/i).fill('E2E test group created from all current members in the table')
    await page.getByRole('button', { name: /^create group$/i }).click()
    await page.waitForURL('**/admin/memberbase/groups', { timeout: 20000 })
    await expect(page.getByText(groupName)).toBeVisible({ timeout: 10000 })

    await deleteGroup(page, groupName)
    await deleteMember(page, member1.email)
    await deleteMember(page, member2.email)
  })

  test('creates a group with selected members', async ({ page }) => {
    const base = Date.now()
    const memberA = makeMemberData(`sel-${base}-1`)
    const memberB = makeMemberData(`sel-${base}-2`)
    const groupName = `E2E Group Selected ${base}`

    await addMember(page, memberA)
    await addMember(page, memberB)
    await page.goto('/admin/memberbase/members/1')
    await clickMemberCheckbox(page, memberA.email)
    await clickMemberCheckbox(page, memberB.email)
    await page.getByRole('button', { name: /^create group$/i }).click()
    await page.getByLabel(/group name/i).fill(groupName)
    await page.getByLabel(/description/i).fill('E2E test group created from two selected members')
    await page.getByRole('button', { name: /^create group$/i }).click()
    await page.waitForURL('**/admin/memberbase/groups', { timeout: 20000 })
    await expect(page.getByText(groupName)).toBeVisible({ timeout: 10000 })

    await deleteGroup(page, groupName)
    await deleteMember(page, memberA.email)
    await deleteMember(page, memberB.email)
  })
})
