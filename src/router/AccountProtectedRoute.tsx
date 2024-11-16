import { useClient } from '@vocdoni/react-providers'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { Loading } from '~src/router/SuspenseLoader'
import { Routes } from './routes'

const AccountProtectedRoute = () => {
  const {
    loaded: { account: fetchLoaded },
    loading: { account: fetchLoading },
  } = useClient()
  const { isAuthenticated, isAuthLoading } = useAuth()

  if ((!fetchLoaded && fetchLoading) || isAuthLoading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <Navigate to={Routes.auth.signIn} />
  }

  return <Outlet />
}

export default AccountProtectedRoute
