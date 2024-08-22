import { useOrganization } from '@vocdoni/react-providers'
import { useParams } from 'react-router-dom'
import { RoutedPagination } from '~components/Pagination/Pagination'
import { RoutedPaginationProvider } from '~components/Pagination/PaginationProvider'
import { usePaginatedElections } from '~src/queries/account'
import ProcessesList from './ProcessesList'

const OrganizationDashboard = () => {
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
        <ProcessesList processes={elections} error={error} loading={isLoading} />
        {!!elections?.length && <RoutedPagination />}
      </RoutedPaginationProvider>
    </>
  )
}

export default OrganizationDashboard
