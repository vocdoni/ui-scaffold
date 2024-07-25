import { Flex, Spinner } from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Outlet } from 'react-router-dom'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'
import CreateOrganization from '~components/Organization/Dashboard/Create'
import SignInScreen from './SignInScreen'

const OrganizationProtectedRoute = () => {
  const {
    connected,
    loading: { fetch },
    loaded: { fetch: fetchLoaded },
  } = useClient()
  const { exists } = useAccountHealthTools()

  if (!connected) {
    return <SignInScreen />
  }

  if (!fetchLoaded) {
    return (
      <Flex mt={10} justifyContent='center'>
        <Spinner />
      </Flex>
    )
  }

  if (!exists) {
    return <CreateOrganization />
  }

  return <Outlet />
}

export default OrganizationProtectedRoute
