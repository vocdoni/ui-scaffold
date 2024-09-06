import { Flex, Spinner } from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Outlet } from 'react-router-dom'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'
import CreateOrganization from '~components/Organization/Dashboard/Create'
import CreateOrganizationSaas from '~components/OrganizationSaas/Dashboard/Create'
import SignInScreen from './SignInScreen'

const OrganizationProtectedRoute = () => {
  const {
    connected,
    loaded: { fetch: fetchLoaded },
    loading: { fetch: fetchLoading },
  } = useClient()
  const { exists } = useAccountHealthTools()

  if (!fetchLoaded && fetchLoading) {
    return (
      <Flex mt={10} justifyContent='center'>
        <Spinner />
      </Flex>
    )
  }

  if (!connected) {
    return <SignInScreen />
  }
  return <CreateOrganizationSaas />
  if (!exists) {
    if (!!import.meta.env.SAAS_URL) return <CreateOrganizationSaas />
    return <CreateOrganization />
  }

  return <Outlet />
}

export default OrganizationProtectedRoute
