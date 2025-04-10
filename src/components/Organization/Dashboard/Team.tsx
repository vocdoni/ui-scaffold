import { useTranslation } from 'react-i18next'
import { InviteToTeamModal } from '~components/Organization/Invite'
import { TeamMembers } from '~components/Organization/Team'

const OrganizationTeam = () => {
  const { t } = useTranslation()

  return (
    <>
      <InviteToTeamModal alignSelf='end' />
      <TeamMembers />
    </>
  )
}

export default OrganizationTeam
