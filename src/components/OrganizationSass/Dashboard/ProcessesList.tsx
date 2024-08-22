import { Alert, AlertDescription, Box, Flex, Progress, Text, VStack } from '@chakra-ui/react'
import { ElectionProvider } from '@vocdoni/react-providers'
import { ArchivedElection, InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { HSeparator } from '~components/Auth/SignIn'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import NoElections from '../NoElections'
import ProcessCard from './ProcessCard'

type Election = PublishedElection | ArchivedElection | InvalidElection

type ProcessesListProps = {
  error: Error | null
  loading: boolean
  limit?: number
  processes?: Election[]
}

const ProcessesList = ({ loading, processes, error, limit }: ProcessesListProps) => {
  const { textColorSecondary, bgSecondary } = useDarkMode()
  return (
    <VStack
      w='full'
      overflowX='scroll'
      bg={bgSecondary}
      mb='2vh'
      borderRadius='lg'
      py={{ base: '10px', lg: '20px' }}
      px={{ base: '20px', lg: '40px' }}
    >
      {loading && <Progress isIndeterminate w='full' colorScheme='primary' size='xs' />}
      {error && (
        <Alert>
          <AlertDescription>{error.message.toString()}</AlertDescription>
        </Alert>
      )}
      <Flex w='full' gap='20px' fontSize='sm' color={textColorSecondary}>
        <Text flex='1 0 200px'>TITLE</Text>
        <Text flex='1 0 250px'>START-END DATE</Text>
        <Text flex='1 0 150px'>TYPE</Text>
        <Text flex='1 0 100px'>STATUS</Text>
        <Text flex='1 0 100px'>VOTERS</Text>
        <Box flex='1 0 20px' pr='50px'></Box>
      </Flex>
      <HSeparator />
      <VStack w='full'>
        {processes &&
          processes.length &&
          processes?.map((election, key) =>
            limit && key >= limit ? null : (
              <ElectionProvider election={election} id={election.id} key={election.id}>
                <ProcessCard />
              </ElectionProvider>
            )
          )}
        {!loading && (!processes || !processes.length) && <NoElections />}
      </VStack>
    </VStack>
  )
}

export default ProcessesList
