import { useClient } from '@vocdoni/react-providers'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { OrganizationData } from '~components/AccountSaas/AccountTypes'
import { useAuth } from '~components/Auth/useAuth'
import { ApiEndpoints } from '~components/Auth/api'

const useSaasOrganization = ({
  options,
}: {
  options?: Omit<UseQueryOptions<OrganizationData>, 'queryKey' | 'queryFn'>
} = {}) => {
  const { bearedFetch, signerAddress } = useAuth()

  return useQuery({
    queryKey: ['organizations', 'info', signerAddress],
    queryFn: () => bearedFetch<OrganizationData>(ApiEndpoints.ORGANIZATION.replace('{address}', signerAddress)),
    enabled: !!signerAddress,
    ...options,
  })
}

export const useSaasAccountProvider = () => {
  const {
    account: accountSDK,
    errors: { account: sdkAccountError },
    loading: { account: sdkAccountLoading },
  } = useClient()
  const { data: saasData, isLoading: isSaasLoading, isError: isSaasError, error: saasError } = useSaasOrganization()

  const organization: OrganizationData = { ...accountSDK, ...saasData }

  const isLoading = isSaasLoading || sdkAccountLoading
  const isError = isSaasError || !!sdkAccountError
  const error = saasError || sdkAccountError

  return { organization, isLoading, isError, error }
}
