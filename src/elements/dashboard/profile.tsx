import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { AccountEdit } from '~components/Account/Edit'
import { DashboardContents } from '~components/Layout/Dashboard'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'

export const Profile = () => {
  const { t } = useTranslation()
  const { setTitle } = useOutletContext<DashboardLayoutContext>()

  // Set layout variables
  useEffect(() => {
    setTitle(t('profile'))
  }, [setTitle])

  return (
    <DashboardContents>
      <AccountEdit />
    </DashboardContents>
  )
}
