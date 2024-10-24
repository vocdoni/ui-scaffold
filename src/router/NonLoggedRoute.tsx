import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { Loading } from '~src/router/SuspenseLoader'
import { Routes } from './routes'

const NonLoggedRoute = () => {
  const { isAuthenticated, isAuthLoading } = useAuth()

  if (isAuthLoading) {
    return <Loading />
  }

  if (isAuthenticated) {
    return <Navigate to={Routes.dashboard.base} />
  }

  return <Outlet />
}

export default NonLoggedRoute
