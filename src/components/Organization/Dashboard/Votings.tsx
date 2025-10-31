import { Flex } from '@chakra-ui/react'
import { RoutedPaginationProvider, useOrganization } from '@vocdoni/react-providers'
import { ElectionListWithPagination } from '@vocdoni/sdk'
import { NoResultsFiltering } from '~shared/Layout/NoResultsFiltering'
import ProcessesTable from '../../Process/Dashboard/ProcessesTable'
import NoElections from '../NoElections'

type VotingsListProps = {
  data: ElectionListWithPagination
  status?: string
}

type VotingsProps = {
  path: string
} & VotingsListProps

const Votings = ({ path, data, status }: VotingsProps) => {
  const { organization } = useOrganization()

  if (!organization) return null

  return (
    <RoutedPaginationProvider path={path} pagination={data.pagination}>
      <VotingsList data={data} status={status} />
    </RoutedPaginationProvider>
  )
}

const VotingsList = ({ data, status }: VotingsListProps) => {
  if (!data) return null

  const { elections } = data

  return (
    <Flex flexDirection='column' flexGrow={1} gap={5} height='full'>
      {!!elections?.length ? (
        <ProcessesTable processes={elections} />
      ) : !!status ? (
        <NoResultsFiltering />
      ) : (
        <NoElections />
      )}
    </Flex>
  )
}

export default Votings
