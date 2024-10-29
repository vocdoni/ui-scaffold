import { useQuery } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'

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

export const usePaginatedElections = (page: number) => {
  const { client, account } = useClient()

  return useQuery({
    enabled: !!account?.address,
    queryKey: ['organization', 'elections', account?.address, page],
    queryFn: async () => client.fetchElections({ organizationId: account?.address, page }),
  })
}
