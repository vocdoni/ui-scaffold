import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useAuth } from '~components/Auth/useAuth'
import { ApiEndpoints } from '~components/Auth/api'
import { CreateOrgParams, OrgInterface } from '~components/AccountSaas/AccountTypes'

export const useEditSaasOrganization = (
  options?: Omit<UseMutationOptions<void, Error, CreateOrgParams>, 'mutationFn'>
) => {
  const { bearedFetch, signerAddress } = useAuth()
  return useMutation<void, Error, CreateOrgParams>({
    mutationFn: (params: CreateOrgParams) =>
      bearedFetch<void>(ApiEndpoints.ORGANIZATION.replace('{address}', signerAddress), {
        body: params,
        method: 'PUT',
      }),
    ...options,
  })
}

export const useSaasOrganization = ({
  options,
}: {
  options?: Omit<UseQueryOptions<OrgInterface>, 'queryKey' | 'queryFn'>
} = {}) => {
  const { bearedFetch, signerAddress } = useAuth()

  return useQuery({
    queryKey: ['organizations', 'info', signerAddress],
    queryFn: () => bearedFetch<OrgInterface>(ApiEndpoints.ORGANIZATION.replace('{address}', signerAddress)),
    enabled: !!signerAddress,
    ...options,
  })
}
