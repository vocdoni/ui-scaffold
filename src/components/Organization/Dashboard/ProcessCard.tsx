import { Link } from '@chakra-ui/react'
import { ElectionSchedule, ElectionTitle } from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { Link as RouterLink } from 'react-router-dom'
import { ContentsBox } from '~components/Organization/Dashboard/Box'

const ProcessCard = () => {
  const { election } = useElection()

  if (!election) return null

  return (
    <Link as={RouterLink} to={`/processes/${ensure0x(election.id)}`} w='full'>
      <ContentsBox w='full'>
        <ElectionTitle fontSize='md' textAlign='left' />
        <ElectionSchedule fontSize='xs' textAlign='left' />
      </ContentsBox>
    </Link>
  )
}

export default ProcessCard
