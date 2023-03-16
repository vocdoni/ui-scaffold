import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
} from '@chakra-ui/react'
import {
  ElectionDescription,
  ElectionProvider,
  ElectionStatusBadge,
  ElectionTitle,
  HR,
} from '@vocdoni/react-components'
import { PublishedElection } from '@vocdoni/sdk'
import { formatDistance } from 'date-fns'

const ProcessCard = ({ election }: { election: PublishedElection }) => {
  return (
    <ElectionProvider election={election}>
      <Card variant='process'>
        <CardHeader>
          <ElectionTitle as='h4' />
          <ElectionStatusBadge />
        </CardHeader>
        <CardBody>
          <ElectionDescription />
        </CardBody>
        <HR />
        <CardFooter>
          <Box px={4} pt={1}>
            <Text color='branding.purple'>
              {election.startDate > election.endDate
                ? 'Process starts'
                : new Date() < election.endDate
                ? 'Process ends'
                : 'Process finished'}
            </Text>
            <Text>
              {formatDistance(new Date(), election.endDate!)}{' '}
              {new Date() > election.endDate && 'ago'}
            </Text>
          </Box>

          <Box>
            <Text color='branding.purple'>Voters</Text>
            <Text>{election?.voteCount}</Text>
          </Box>
        </CardFooter>
      </Card>
    </ElectionProvider>
  )
}

export default ProcessCard
