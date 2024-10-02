import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useAuth } from '~components/Auth/useAuth'
import { ApiEndpoints } from '~components/Auth/api'
import { OrgInterface } from '~components/AccountSaas/AccountTypes'

export const useEditSaasOrganization = ({
  options,
}: {
  options?: Omit<UseQueryOptions<OrgInterface>, 'queryKey' | 'queryFn'>
} = {}) => {
  // todo(kon)
  // const { bearedFetch, signerAddress } = useAuth()
  //
  // return useQuery({
  //   queryKey: ['organizations', 'info', signerAddress],
  //   queryFn: () => bearedFetch<OrgInterface>(ApiEndpoints.ORGANIZATION_INFO.replace('{address}', signerAddress)),
  //   enabled: !!signerAddress,
  //   ...options,
  // })
}

export const useSaasOrganization = ({
  options,
}: {
  options?: Omit<UseQueryOptions<OrgInterface>, 'queryKey' | 'queryFn'>
} = {}) => {
  const { bearedFetch, signerAddress } = useAuth()

  return useQuery({
    queryKey: ['organizations', 'info', signerAddress],
    queryFn: () => bearedFetch<OrgInterface>(ApiEndpoints.ORGANIZATION_INFO.replace('{address}', signerAddress)),
    enabled: !!signerAddress,
    ...options,
  })
}
