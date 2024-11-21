import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { ElectionProvider } from '@vocdoni/react-providers'
import { InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import ProcessCard from './ProcessCard'

type Election = PublishedElection | InvalidElection

type ProcessesListProps = {
  error?: Error | null
  loading?: boolean
  processes?: Election[]
}

const ProcessesList = ({ loading, processes, error }: ProcessesListProps) => {
  const { t } = useTranslation()

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>{t('process_list.title', { defaultValue: 'Title' })}</Th>
          <Th>{t('process_list.start_end_date', { defaultValue: 'Start-end date' })}</Th>
          <Th>{t('process_list.type', { defaultValue: 'Type' })}</Th>
          <Th>{t('process_list.status', { defaultValue: 'Status' })}</Th>
          <Th>{t('process_list.voters', { defaultValue: 'Voters' })}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {processes &&
          processes.length &&
          processes?.map((election) => (
            <ElectionProvider election={election} id={election.id} key={election.id}>
              <ProcessCard />
            </ElectionProvider>
          ))}
      </Tbody>
    </Table>
  )
}

export default ProcessesList
