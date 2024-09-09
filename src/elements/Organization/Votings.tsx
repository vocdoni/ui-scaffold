import { useParams } from 'react-router-dom'
import Votings, { VotingsHeader } from '~components/Organization/Dashboard/Votings'

const OrganizationVotings = () => {
  return (
    <>
      <VotingsHeader />
      <Votings />
    </>
  )
}

export default OrganizationVotings
