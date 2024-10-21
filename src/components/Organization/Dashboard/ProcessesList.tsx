import { Alert, AlertDescription, Progress, VStack } from '@chakra-ui/react'
import { ElectionProvider } from '@vocdoni/react-providers'
import { InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  return (
    <VStack w='full' flexGrow={1}>
      {loading && <Progress isIndeterminate w='full' colorScheme='primary' size='xs' />}
      {error && (
        <Alert>
          <AlertDescription>{error.message.toString()}</AlertDescription>
        </Alert>
      )}
      <VStack w='full' minH='100%'>
        {processes &&
          processes.length &&
          processes?.map((election, key) =>
            limit && key >= limit ? null : (
              <ElectionProvider election={election} key={election.id}>
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
