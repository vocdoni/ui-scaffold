import AccountProtectedRoute from '~src/router/AccountProtectedRoute'
import OrganizationProtectedRoute from '~src/router/OrganizationProtectedRoute'

const ProtectedRoutes = () => {
  return (
    <AccountProtectedRoute>
      <OrganizationProtectedRoute />
    </AccountProtectedRoute>
  )
}

export default ProtectedRoutes
