import { useParams } from 'react-router-dom'
import Votings, { VotingsHeader } from '~components/Organization/Dashboard/Votings'

const OrganizationVotings = () => {
  const { page, status }: { page?: number; status?: string } = useParams()
  return null
  return (
    <>
      <VotingsHeader />
      <Votings page={Number(page || 0)} status={status} />
    </>
  )
}

export default OrganizationVotings
