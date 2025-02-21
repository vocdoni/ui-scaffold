import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '~components/Auth/useAuth'
import { QueryKeys } from './keys'

export interface Census {
  id: string
  type: 'sms_or_mail' | 'sms' | 'mail'
  orgAddress: string
  createdAt: string
}

export type CensusCreatePayload = Pick<Census, 'type' | 'orgAddress'>

interface PublishedCensus {
  census: Census
  uri: string
  root: string
}

interface Participant {
  id: string
  email?: string
  phone?: string
}

interface AddParticipantsPayload {
  participants: Participant[]
}

// Get census list
export const useCensusList = (orgAddress: string) => {
  const { bearedFetch } = useAuth()

  return useQuery({
    queryKey: QueryKeys.census.list(orgAddress),
    queryFn: () => bearedFetch<Census[]>(`census?orgAddress=${orgAddress}`),
  })
}

// Get census info
export const useCensusInfo = (id: string) => {
  const { bearedFetch } = useAuth()

  return useQuery({
    queryKey: QueryKeys.census.info(id),
    queryFn: () => bearedFetch<Census>(`census/${id}`),
  })
}

// Create census
export const useCreateCensus = () => {
  const { bearedFetch } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CensusCreatePayload) =>
      bearedFetch<string>('census', {
        method: 'POST',
        body: payload,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['census'] })
    },
  })
}

// Add participants to census
export const useAddParticipants = (id: string) => {
  const { bearedFetch } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AddParticipantsPayload) =>
      bearedFetch<number>(`census/${id}`, {
        method: 'POST',
        body: payload,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.census.info(id) })
    },
  })
}

// Publish census
export const usePublishCensus = (id: string) => {
  const { bearedFetch } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () =>
      bearedFetch<PublishedCensus>(`census/${id}/publish`, {
        method: 'POST',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.census.info(id) })
      queryClient.invalidateQueries({ queryKey: QueryKeys.census.published(id) })
    },
  })
}

// Get published census info
export const usePublishedCensusInfo = (id: string) => {
  const { bearedFetch } = useAuth()

  return useQuery({
    queryKey: QueryKeys.census.published(id),
    queryFn: () => bearedFetch<PublishedCensus>(`census/${id}/publish`),
  })
}
