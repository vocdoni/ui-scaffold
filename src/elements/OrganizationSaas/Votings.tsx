import { Flex } from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/react-providers'
import { useParams } from 'react-router-dom'
import ProcessesList from '~components/OrganizationSaas/Dashboard/ProcessesList'
import { RoutedPagination } from '~components/Pagination/Pagination'
import { RoutedPaginationProvider } from '~components/Pagination/PaginationProvider'
import { usePaginatedElections } from '~src/queries/account'

const OrganizationVotings = () => {
  const { page, status }: { page?: number; status?: string } = useParams()
  const { organization } = useOrganization()
  const { data: elections, error, isLoading } = usePaginatedElections(Number(page || 0))

  if (!organization) return null

  return (
    <>
      <RoutedPaginationProvider
        totalPages={Math.ceil(organization?.electionIndex / 10)}
        path='/organization/votings/:page?/:status?'
      >
        <Flex flexDirection='column' flexGrow={1} gap='20px'>
          <ProcessesList processes={elections} error={error} loading={isLoading} />
          <Flex justifyContent='end' mt='auto'>
            {!!elections?.length && <RoutedPagination />}
          </Flex>
        </Flex>
      </RoutedPaginationProvider>
    </>
  )
}

export default OrganizationVotings
