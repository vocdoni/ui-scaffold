import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import Votings from '~components/Organization/Dashboard/Votings'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'

const OrganizationVotings = () => {
  const { t } = useTranslation()
  const { setTitle } = useOutletContext<DashboardLayoutContext>()

  // Set page title
  useEffect(() => {
    setTitle(t('organization.votings_list', { defaultValue: 'Voting processes list' }))
  }, [setTitle])

  return (
    <DashboardContents>
      <Votings />
    </DashboardContents>
  )
}

export default OrganizationVotings
