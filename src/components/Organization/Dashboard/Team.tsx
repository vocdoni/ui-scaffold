import { InviteToTeamModal } from '~components/Organization/Invite'
import { TeamMembers } from '~components/Organization/Team'

const OrganizationTeam = () => {
  return (
    <>
      <InviteToTeamModal alignSelf='end' />
      <TeamMembers />
    </>
  )
}

export default OrganizationTeam
