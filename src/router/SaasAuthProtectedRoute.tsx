import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { Loading } from '~src/router/SuspenseLoader'

const SaasAuthProtectedRoute = () => {
  const { isAuthenticated, isAuthLoading } = useAuth()

  if (isAuthLoading) {
    return <Loading />
  }

  if (isAuthenticated) {
    return <Navigate to='/organization' />
  }

  return <Outlet />
}

export default SaasAuthProtectedRoute
