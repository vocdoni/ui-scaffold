import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import { InviteToTeamModal } from '~components/Organization/Invite'
import { TeamMembers } from '~components/Organization/Team'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'

const OrganizationTeam = () => {
  const { t } = useTranslation()
  const { setTitle } = useOutletContext<DashboardLayoutContext>()

  // Set layout variables
  useEffect(() => {
    setTitle(t('team', { defaultValue: 'Team' }))
  }, [setTitle])

  return (
    <DashboardContents display='flex' flexDir='column'>
      <InviteToTeamModal alignSelf='end' />
      <TeamMembers />
    </DashboardContents>
  )
}

export default OrganizationTeam
