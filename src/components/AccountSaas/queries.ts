import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useAuth } from '~components/Auth/useAuth'
import { ApiEndpoints } from '~components/Auth/api'
import { OrgInterface } from '~components/AccountSaas/AccountTypes'
import { UseMutationOptions } from '@tanstack/react-query/build/modern/index'
import { IRegisterParams, LoginResponse } from '~components/Auth/authQueries'

export const useEditSaasOrganization = (
  options?: Omit<UseMutationOptions<LoginResponse, Error, IRegisterParams>, 'mutationFn'>
) => {
  // todo(kon)
  // const { bearedFetch, signerAddress } = useAuth()
  // return useMutation<LoginResponse, Error, IRegisterParams>({
  //   mutationFn: (params: IRegisterParams) =>
  //     api<LoginResponse>(ApiEndpoints.REGISTER, { body: params, method: 'POST' }),
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
    queryFn: () => bearedFetch<OrgInterface>(ApiEndpoints.ORGANIZATION.replace('{address}', signerAddress)),
    enabled: !!signerAddress,
    ...options,
  })
}
