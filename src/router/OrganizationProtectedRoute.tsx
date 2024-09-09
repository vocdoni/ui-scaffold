import { Flex, Spinner } from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Outlet } from 'react-router-dom'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'
import { useAuth } from '~components/Auth/useAuth'
import CreateOrganization from '~components/Organization/Dashboard/Create'
import SignInScreen from './SignInScreen'

const OrganizationProtectedRoute = () => {
  const {
    loaded: { fetch: fetchLoaded },
    loading: { fetch: fetchLoading },
  } = useClient()
  const { exists } = useAccountHealthTools()
  const { isAuthenticated } = useAuth()

  if (!fetchLoaded && fetchLoading) {
    return (
      <Flex mt={10} justifyContent='center'>
        <Spinner />
      </Flex>
    )
  }

  if (!isAuthenticated) {
    return <SignInScreen />
  }

  if (!exists) {
    return <CreateOrganization />
  }

  return <Outlet />
}

export default OrganizationProtectedRoute
