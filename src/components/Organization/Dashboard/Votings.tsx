import { Flex } from '@chakra-ui/react'
import { RoutedPaginationProvider, useOrganization } from '@vocdoni/react-providers'
import { ElectionListWithPagination } from '@vocdoni/sdk'
import { NoResultsFiltering } from '~shared/Layout/NoResultsFiltering'
import { Routes } from '~src/router/routes'
import ProcessesTable from '../../Process/Dashboard/ProcessesTable'
import NoElections from '../NoElections'

type VotingsProps = {
  data: ElectionListWithPagination
  status?: string
}

const Votings = (props: VotingsProps) => {
  const { organization } = useOrganization()

  if (!organization) return null

  return (
    <RoutedPaginationProvider path={Routes.dashboard.processes} pagination={props.data.pagination}>
      <VotingsList {...props} />
    </RoutedPaginationProvider>
  )
}

const VotingsList = ({ data, status }: VotingsProps) => {
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
