import { Flex } from '@chakra-ui/react'
import { RoutedPagination } from '@vocdoni/chakra-components'
import { RoutedPaginationProvider, useOrganization } from '@vocdoni/react-providers'
import { ElectionListWithPagination } from '@vocdoni/sdk'
import { NoResultsFiltering } from '~components/Layout/NoResultsFiltering'
import { Routes } from '~src/router/routes'
import NoElections from '../NoElections'
import ProcessesList from './ProcessesList'

type VotingsProps = {
  data: ElectionListWithPagination
  status?: string
}

const Votings = (props: VotingsProps) => {
  const { organization } = useOrganization()

  if (!organization) return null

  return (
    <RoutedPaginationProvider path={Routes.dashboard.processes}>
      <VotingsList {...props} />
    </RoutedPaginationProvider>
  )
}

const VotingsList = ({ data, status }: VotingsProps) => {
  if (!data) return null

  const { elections, pagination } = data

  return (
    <Flex flexDirection='column' flexGrow={1} gap={5} height='full'>
      {!!elections?.length ? (
        <>
          <ProcessesList processes={elections} />
          <Flex mt='auto' justifyContent='end'>
            <RoutedPagination pagination={pagination} />
          </Flex>
        </>
      ) : !!status ? (
        <NoResultsFiltering />
      ) : (
        <NoElections />
      )}
    </Flex>
  )
}

export default Votings
