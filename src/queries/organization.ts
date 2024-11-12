import { useQuery } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { AccountData, FetchElectionsParameters, VocdoniSDKClient } from '@vocdoni/sdk'

export const useLatestElections = (limit = 5) => {
  const { client, account } = useClient()

  return useQuery({
    enabled: !!account?.address,
    queryKey: ['organization', 'elections', account?.address, 0],
    queryFn: async () => client.fetchElections({ organizationId: account?.address, page: 0, limit }),
    select: (data) => data.elections,
    retry: false,
  })
}

type PaginatedElectionsParams = {
  page?: number
  status?: FetchElectionsParameters['status']
}

export const paginatedElectionsQuery = (
  account: AccountData,
  client: VocdoniSDKClient,
  params: PaginatedElectionsParams
) => ({
  enabled: !!account?.address,
  queryKey: ['organization', 'elections', account?.address, params],
  queryFn: async () =>
    client.fetchElections({
      organizationId: account?.address,
      page: params.page ? Number(params.page) - 1 : 0,
      status: params.status?.toUpperCase() as FetchElectionsParameters['status'],
    }),
})
