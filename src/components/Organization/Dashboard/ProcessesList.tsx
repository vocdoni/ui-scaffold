import { Alert, AlertDescription, Box, Flex, Progress, Text, VStack } from '@chakra-ui/react'
import { ElectionProvider } from '@vocdoni/react-providers'
import { InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { HSeparator } from '~components/Auth/SignIn'
import useDarkMode from '~components/Layout/useDarkMode'
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
  const { t } = useTranslation()

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
        <Text flexGrow={1} flexShrink={0} flexBasis={48} textTransform='uppercase'>
          {t('process_list.title', { defaultValue: 'Title' })}
        </Text>
        <Text flexGrow={1} flexShrink={0} flexBasis={60} textTransform='uppercase'>
          {t('process_list.start_end_date', { defaultValue: 'Start-end date' })}
        </Text>
        <Text flexGrow={1} flexShrink={0} flexBasis={36} textTransform='uppercase'>
          {t('process_list.type', { defaultValue: 'Type' })}
        </Text>
        <Text flexGrow={1} flexShrink={0} flexBasis={24} textTransform='uppercase'>
          {t('process_list.status', { defaultValue: 'Status' })}
        </Text>
        <Text flexGrow={1} flexShrink={0} flexBasis={24} textTransform='uppercase'>
          {t('process_list.voters', { defaultValue: 'Voters' })}
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
