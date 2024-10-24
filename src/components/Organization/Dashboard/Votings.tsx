import { Flex } from '@chakra-ui/react'
import { RoutedPagination } from '@vocdoni/chakra-components'
import { RoutedPaginationProvider, useOrganization, useRoutedPagination } from '@vocdoni/react-providers'
import { usePaginatedElections } from '~src/queries/account'
import { Routes } from '~src/router/routes'
import ProcessesList from './ProcessesList'

const Votings = () => {
  const { organization } = useOrganization()

  if (!organization) return null

  return (
    <RoutedPaginationProvider path={Routes.dashboard.votings}>
      <VotingsList />
    </RoutedPaginationProvider>
  )
}

const VotingsList = () => {
  const { page } = useRoutedPagination()
  const { data, error, isLoading } = usePaginatedElections(page ?? 0)

  if (!data) return null

  const { elections, pagination } = data

  return (
    <Flex flexDirection='column' flexGrow={1} gap={5}>
      <ProcessesList processes={elections} error={error} loading={isLoading} />
      <Flex mt='auto' justifyContent='end'>
        {!!elections?.length && <RoutedPagination pagination={pagination} />}
      </Flex>
    </Flex>
  )
}

export default Votings
