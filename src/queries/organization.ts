import {
  AccountData,
  FetchElectionsParameters,
  FetchElectionsParametersWithPagination,
  VocdoniSDKClient,
} from '@vocdoni/sdk'
import { QueryKeys } from './keys'

type PaginatedElectionsParams = Partial<Pick<FetchElectionsParametersWithPagination, 'limit'>> & {
  page?: number
  status?: FetchElectionsParameters['status']
}

export const paginatedElectionsQuery = (
  account: AccountData,
  client: VocdoniSDKClient,
  params: PaginatedElectionsParams
) => ({
  enabled: !!account?.address,
  queryKey: QueryKeys.organization.elections(account?.address, params),
  queryFn: async () =>
    client.fetchElections({
      organizationId: account?.address,
      page: params.page ? Number(params.page) - 1 : 0,
      status: params.status?.toUpperCase() as FetchElectionsParameters['status'],
      limit: params.limit,
    }),
})
