import { Outlet, useOutletContext } from 'react-router-dom'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'
import { NoOrganizationsPage } from '~components/Organization/NoOrganizations' // This protected routes are supposed to be inside of a AccountProtectedRoute

// This protected routes are supposed to be inside of a AccountProtectedRoute
// So no auth/loading checks are performed here
const OrganizationProtectedRoute = () => {
  const context = useOutletContext()
  const { exists } = useAccountHealthTools()

  if (!exists) {
    return <NoOrganizationsPage />
  }

  return <Outlet context={context} />
}

export default OrganizationProtectedRoute
