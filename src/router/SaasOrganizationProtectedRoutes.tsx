import { Flex, Spinner } from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Outlet } from 'react-router-dom'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'
import CreateOrganization from '~components/OrganizationSaas/Dashboard/Create'
import SignInScreen from '~src/router/SignInScreen'
import Wrapper from '~src/themes/saas/components/wrapper'

const SaasOrganizationProtectedRoute = () => {
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

  if (!exists) {
    return (
      <Wrapper flexDirection={{ base: 'column', lg: 'row' }} px='0'>
        <CreateOrganization />
      </Wrapper>
    )
  }

  return <Outlet />
}

export default SaasOrganizationProtectedRoute
