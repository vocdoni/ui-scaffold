import { Box, HStack } from '@chakra-ui/react'
import {
  ElectionDescription,
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
    <Box
      border='1px solid lightgray'
      width='100%'
      maxW='600px'
      px={4}
      py={2}
      borderRadius='10px'
    >
      <HStack justifyContent='space-between'>
        <ElectionTitle />
        <ElectionStatusBadge
          color='green'
          border='1px solid'
          bgColor='green.100'
        />
      </HStack>
      <ElectionDescription />
      <HR />
      <ElectionSchedule />
    </Box>
  </ElectionProvider>
)

export default ProcessCard
