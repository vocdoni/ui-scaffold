import { Alert, AlertDescription, Box, Flex, Progress, Text, VStack } from '@chakra-ui/react'
import { ElectionProvider } from '@vocdoni/react-providers'
import { InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { HSeparator } from '~components/Auth/SignIn'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import NoElections from '../NoElections'
import ProcessCard from './ProcessCard'

type Election = PublishedElection | InvalidElection

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
      borderRadius='lg'
      py={{ base: 2.5, lg: 5 }}
      px={{ base: 5, lg: 10 }}
    >
      {loading && <Progress isIndeterminate w='full' colorScheme='primary' size='xs' />}
      {error && (
        <Alert>
          <AlertDescription>{error.message.toString()}</AlertDescription>
        </Alert>
      )}
      <Flex w='full' gap={5} fontSize='sm' color={textColorSecondary}>
        <Text flexGrow={1} flexShrink={0} flexBasis={48}>
          TITLE
        </Text>
        <Text flexGrow={1} flexShrink={0} flexBasis={60}>
          START-END DATE
        </Text>
        <Text flexGrow={1} flexShrink={0} flexBasis={36}>
          TYPE
        </Text>
        <Text flexGrow={1} flexShrink={0} flexBasis={24}>
          STATUS
        </Text>
        <Text flexGrow={1} flexShrink={0} flexBasis={24}>
          VOTERS
        </Text>
        <Box flexGrow={1} flexShrink={0} flexBasis={5}></Box>
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
