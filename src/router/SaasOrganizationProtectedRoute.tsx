import { useClient } from '@vocdoni/react-providers'
import { Outlet } from 'react-router-dom'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'
import { useAuth } from '~components/Auth/useAuth'
import CreateOrganizationSaas from '~components/OrganizationSaas/Dashboard/Create'
import { Loading } from '~src/router/SuspenseLoader'
import SignInScreen from './SignInScreen'

const SaasOrganizationProtectedRoute = () => {
  const {
    loaded: { account: fetchLoaded },
    loading: { account: fetchLoading },
  } = useClient()
  const { exists } = useAccountHealthTools()

  const { isAuthenticated, isAuthLoading, signerAddress } = useAuth()

  if ((!fetchLoaded && fetchLoading) || isAuthLoading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <SignInScreen />
  }

  if (!exists && !signerAddress) {
    return <CreateOrganizationSaas />
  }

  return <Outlet />
}

export default SaasOrganizationProtectedRoute
