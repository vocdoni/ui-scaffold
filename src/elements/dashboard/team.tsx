import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import Team from '~components/Organization/Dashboard/Team'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'

const OrganizationTeam = () => {
  const { t } = useTranslation()
  const { setTitle } = useOutletContext<DashboardLayoutContext>()

  // Set layout variables
  useEffect(() => {
    setTitle(t('team', { defaultValue: 'Team' }))
  }, [setTitle])

  return (
    <DashboardContents>
      <Team />
    </DashboardContents>
  )
}

export default OrganizationTeam
