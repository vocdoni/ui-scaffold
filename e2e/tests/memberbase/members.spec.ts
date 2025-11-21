import { expect, test } from '../../fixtures/auth'
import { addMember, clickMemberCheckbox, deleteMember, makeMemberData } from '../../utils/memberbase'

test.describe('Memberbase', () => {
  test('delete a single member via the context menu', async ({ page }) => {
    const member = makeMemberData()
    await addMember(page, member)

    await deleteMember(page, member.email)
  })

  test('delete selected members while keeping one, then cleanup the last one', async ({ page }) => {
    const base = Date.now()
    const memberA = makeMemberData(`${base}-sel-1`)
    const memberB = makeMemberData(`${base}-sel-2`)
    const memberC = makeMemberData(`${base}-sel-3`)

    await addMember(page, memberA)
    await addMember(page, memberB)
    await addMember(page, memberC)

    await expect(page.getByText(memberA.email)).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(memberB.email)).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(memberC.email)).toBeVisible({ timeout: 5000 })

    await page.goto('/admin/memberbase/members/1')
    await clickMemberCheckbox(page, memberA.email)
    await clickMemberCheckbox(page, memberB.email)

    await page.getByRole('button', { name: /^delete$/i }).click()

    const confirmDelete = page.getByRole('button', { name: /^delete$/i })
    await expect(confirmDelete).toBeVisible({ timeout: 5000 })
    await confirmDelete.click()

    await page.waitForResponse((response) => {
      const url = response.url()
      return url.includes('/members') && response.request().method() === 'DELETE' && response.ok()
    })

    await expect(page.getByText(memberA.email)).not.toBeVisible()
    await expect(page.getByText(memberB.email)).not.toBeVisible()
    await expect(page.getByText(memberC.email)).toBeVisible()

    await deleteMember(page, memberC.email)
  })
})
