import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ensure0x } from '@vocdoni/sdk'
import { useAuth } from '~components/Auth/useAuth'
import { QueryKeys } from './keys'

export interface Census {
  id: string
  type: 'sms_or_mail' | 'sms' | 'mail'
  orgAddress: string
  createdAt: string
}

export type CensusCreatePayload = Pick<Census, 'type' | 'orgAddress'>

export interface PublishedCensus {
  census: Census
  uri: string
  root: string
}

export interface Participant {
  id: string
  participantNo: string
  email?: string
  phone?: string
}

export type ParticipantPayload = Omit<Participant, 'id'>

interface AddParticipantsPayload {
  participants: ParticipantPayload[]
}

// Get census list
export const useCensusList = (orgAddress: string) => {
  const { bearedFetch } = useAuth()

  return useQuery({
    queryKey: QueryKeys.census.list(orgAddress),
    queryFn: () => bearedFetch<Census[]>(`organizations/${ensure0x(orgAddress)}/censuses`),
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
      bearedFetch<{ censusID: string }>('census', {
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
