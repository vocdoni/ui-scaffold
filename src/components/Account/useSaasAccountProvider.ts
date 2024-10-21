import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { useCallback } from 'react'
import { OrganizationData } from '~components/Account/AccountTypes'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'

const useSaasOrganization = ({
  options,
}: {
  options?: Omit<UseQueryOptions<OrganizationData>, 'queryKey' | 'queryFn'>
} = {}) => {
  const { bearedFetch, signerAddress } = useAuth()

  return useQuery({
    queryKey: ['organizations', 'info', signerAddress],
    queryFn: () => bearedFetch<OrganizationData>(ApiEndpoints.Organization.replace('{address}', signerAddress)),
    enabled: !!signerAddress,
    ...options,
  })
}

export const useSaasAccountProvider = (options?: Parameters<typeof useSaasOrganization>[0]) => {
  const {
    account: accountSDK,
    fetchAccount,
    errors: { fetch: sdkAccountError },
    loading: { fetch: sdkAccountLoading },
  } = useClient()
  const {
    data: saasData,
    refetch,
    isLoading: isSaasLoading,
    isError: isSaasError,
    error: saasError,
  } = useSaasOrganization(options)

  const refetchAccount = useCallback(() => {
    refetch()
    fetchAccount()
  }, [refetch, fetchAccount])

  const organization: OrganizationData = { ...accountSDK, ...saasData }

  const isLoading = isSaasLoading || sdkAccountLoading
  const isError = isSaasError || !!sdkAccountError
  const error = saasError || sdkAccountError

  return { organization, refetchAccount, isLoading, isError, error }
}
