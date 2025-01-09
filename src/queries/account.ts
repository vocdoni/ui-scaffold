import { DefinedInitialDataOptions, QueryKey, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api, ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { QueryKeys } from './keys'

export interface Organization {
  address: string
  name: string
  type: string
  description: string
  size: number
  color: string
  logo: string
  subdomain: string
  timezone: string
  active: boolean
  parent?: any
}

export interface UserRole {
  role: string
  organization: Organization
}

export interface User {
  email: string
  firstName: string
  lastName: string
  organizations: Array<UserRole>
}

export interface UpdateProfileParams {
  firstName: string
  lastName: string
}

export interface AuthResponse {
  token: string
  expirity: string
}

export const useProfile = (
  options?: Omit<DefinedInitialDataOptions<User, Error, User, QueryKey>, 'queryKey' | 'queryFn'>
) => {
  const { bearedFetch } = useAuth()

  return useQuery<User>({
    ...options,
    queryKey: QueryKeys.profile,
    queryFn: () => bearedFetch<User>(ApiEndpoints.Me),
  })
}

export const useUpdateProfile = () => {
  const { bearedFetch } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<AuthResponse, Error, UpdateProfileParams>({
    mutationFn: (body) =>
      bearedFetch<AuthResponse>(ApiEndpoints.Me, {
        method: 'PUT',
        body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.profile })
    },
  })
}

type InviteAcceptRequestBody = {
  code: string
  user: {
    firstName: string
    lastName: string
    password: string
  }
}

export const useSignupFromInvite = (address: string) =>
  useMutation<AuthResponse, Error, InviteAcceptRequestBody>({
    mutationFn: (body) =>
      api<AuthResponse>(ApiEndpoints.InviteAccept.replace('{address}', address), {
        method: 'POST',
        body,
      }),
  })
