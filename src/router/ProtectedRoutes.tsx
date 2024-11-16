import AccountProtectedRoute from '~src/router/AccountProtectedRoute'
import OrganizationProtectedRoute from '~src/router/OrganizationProtectedRoute'
import { RouteObject } from 'react-router-dom'
import { SuspenseLoader } from '~src/router/SuspenseLoader'

const ProtectedRoutes = ({ children }: { children: RouteObject[] }) => ({
  element: (
    <SuspenseLoader>
      <AccountProtectedRoute />
    </SuspenseLoader>
  ),
  children: [
    {
      element: (
        <SuspenseLoader>
          <OrganizationProtectedRoute />
        </SuspenseLoader>
      ),
      children,
    },
  ],
})

export default ProtectedRoutes
