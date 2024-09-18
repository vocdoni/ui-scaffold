import { Flex, Spinner } from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Outlet } from 'react-router-dom'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'
import { useAuth } from '~components/Auth/useAuth'
import CreateOrganization from '~components/Organization/Dashboard/Create'
import CreateOrganizationSaas from '~components/OrganizationSaas/Dashboard/Create'
import SignInScreen from './SignInScreen'

const SaasOrganizationProtectedRoute = () => {
  const {
    loaded: { fetch: fetchLoaded },
    loading: { fetch: fetchLoading },
  } = useClient()
  const { exists } = useAccountHealthTools()
  const { isAuthenticated, loaded, signerAddress } = useAuth()

  if ((!fetchLoaded && fetchLoading) || !loaded) {
    return (
      <Flex mt={10} justifyContent='center'>
        <Spinner />
      </Flex>
    )
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
