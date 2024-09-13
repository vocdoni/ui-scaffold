import { Flex, Spinner } from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'
import { useAuth } from '~components/Auth/useAuth'
import CreateOrganizationSaas from '~components/OrganizationSaas/Dashboard/Create'

const OrganizationProtectedRoute = () => {
  const navigate = useNavigate()
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
    return navigate('/signin') // todo(kon): implement redirection after signin
  }

  if (!exists) {
    return <CreateOrganizationSaas />
  }

  return <Outlet />
}

export default OrganizationProtectedRoute
