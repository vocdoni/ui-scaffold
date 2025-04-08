import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import { InviteToTeamModal } from '~components/Organization/Invite'
import { TeamMembers } from '~components/Organization/Team'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'

const OrganizationTeam = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  // Set layout variables
  useEffect(() => {
    setBreadcrumb([{ title: t('team.title', { defaultValue: 'Team' }), route: Routes.dashboard.team }])
  }, [setBreadcrumb])

  return (
    <DashboardContents display='flex' flexDir='column'>
      <InviteToTeamModal alignSelf='end' />
      <TeamMembers />
    </DashboardContents>
  )
}

export default OrganizationTeam
