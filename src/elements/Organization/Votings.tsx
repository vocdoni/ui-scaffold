import { VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Votings, { VotingsHeader } from '~components/Organization/Dashboard/Votings'

const OrganizationVotings = () => {
  const { page, status }: { page?: number; status?: string } = useParams()

  return (
    <VStack alignItems='start' gap={6} w='full'>
      <VotingsHeader />
      <Votings page={Number(page || 0)} status={status} />
    </VStack>
  )
}

export default OrganizationVotings
