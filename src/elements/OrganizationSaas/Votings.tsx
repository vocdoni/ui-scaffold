import ProcessesList from '~components/OrganizationSaas/Dashboard/ProcessesList'
import { usePaginatedElections } from '~src/queries/account'
import { RoutedPagination } from '@vocdoni/chakra-components'
import { RoutedPaginationProvider, useRoutedPagination } from '@vocdoni/react-providers'

const OrganizationVotings = () => {
  return (
    <>
      <RoutedPaginationProvider path='/organization/votings/:page?/:status?'>
        <OrganizationVotingsList />
      </RoutedPaginationProvider>
    </>
  )
}

const OrganizationVotingsList = () => {
  const { page } = useRoutedPagination()
  const { data, error, isLoading } = usePaginatedElections(Number(page || 0))

  if (!data) return null
  const { elections, pagination } = data

  return (
    <>
      <ProcessesList processes={elections} error={error} loading={isLoading} />
      {!!elections?.length && <RoutedPagination pagination={pagination} />}
    </>
  )
}

export default OrganizationVotings
