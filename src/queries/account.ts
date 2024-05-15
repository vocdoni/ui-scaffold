import { useQuery } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'

export const useLatestElections = () => {
  const { client, account } = useClient()

  return useQuery({
    enabled: !!account?.address,
    queryKey: ['organization', 'elections', account?.address, 0],
    queryFn: async () => client.fetchElections(account?.address, 0),
  })
}

export const usePaginatedElections = (page: number) => {
  const { client, account } = useClient()

  return useQuery({
    enabled: !!account?.address,
    queryKey: ['organization', 'elections', account?.address, page],
    queryFn: async () => client.fetchElections(account?.address, page),
  })
}
