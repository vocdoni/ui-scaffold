import { Card, CardHeader } from '@chakra-ui/react'
import {
  ElectionProvider,
  ElectionSchedule,
  ElectionStatusBadge,
  ElectionTitle,
  HR,
} from '@vocdoni/react-components'
import { PublishedElection } from '@vocdoni/sdk'

interface Props {
  election: PublishedElection
}

const ProcessCard = ({ election }: Props) => (
  <ElectionProvider election={election}>
    <Card variant='process'>
      <CardHeader flexDirection={{ base: 'column', sm: 'row' }}>
        <ElectionTitle
          fontSize='1.4em'
          textAlign='start'
          order={{ base: 2, sm: 1 }}
          alignSelf='start'
          noOfLines={1}
          m={0}
          width={{ base: '180px', sm: '75%' }}
        />
        <ElectionStatusBadge
          order={{ base: 1, sm: 2 }}
          alignSelf={{ base: 'end', sm: 'center' }}
          color='green'
          border='1px solid'
          bgColor='green.100'
        />
      </CardHeader>
      {/* <ElectionDescription noOfLines={3} fontSize='1em' /> */}
      <HR />
      <ElectionSchedule />
    </Card>
  </ElectionProvider>
)

export default ProcessCard
