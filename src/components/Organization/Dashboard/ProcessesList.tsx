import { Alert, AlertDescription, Progress, Text, VStack } from '@chakra-ui/react'
import { ElectionProvider } from '@vocdoni/react-providers'
import { ArchivedElection, InvalidElection, PublishedElection } from '@vocdoni/sdk'
import ProcessCard from './ProcessCard'

type Election = PublishedElection | ArchivedElection | InvalidElection

type ProcessesListProps = {
  error: Error | null
  loading: boolean
  limit?: number
  processes?: Election[]
}

const ProcessesList = ({ loading, processes, error, limit }: ProcessesListProps) => {
  return (
    <VStack w='full'>
      {loading && <Progress isIndeterminate w='full' colorScheme='primary' size='xs' />}
      {error && (
        <Alert>
          <AlertDescription>{error.message.toString()}</AlertDescription>
        </Alert>
      )}
      <VStack w='full'>
        {processes &&
          processes.length &&
          processes?.map((election, key) =>
            limit && key >= limit ? null : (
              <ElectionProvider election={election} key={election.id}>
                <ProcessCard />
              </ElectionProvider>
            )
          )}
        {!loading && (!processes || !processes.length) && <Text>No elections yet</Text>}
      </VStack>
    </VStack>
  )
}

export default ProcessesList
