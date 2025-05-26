import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useOrganization } from '@vocdoni/react-providers'
import {
  AccountData,
  ensure0x,
  FetchElectionsParameters,
  FetchElectionsParametersWithPagination,
  VocdoniSDKClient,
} from '@vocdoni/sdk'
import { LuCalendar, LuFileSpreadsheet, LuUsers, LuVote } from 'react-icons/lu'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { QueryKeys } from './keys'

type PaginatedElectionsParams = Partial<Pick<FetchElectionsParametersWithPagination, 'limit'>> & {
  page?: number
  status?: FetchElectionsParameters['status']
}

type SetupChecklistItem = {
  id: number
  label: string
  icon: any
  completed: boolean
}

type Role = {
  role: string
  name: string
  writePermission: boolean
}

type OrganizationType = {
  name: string
  type: string
}

type InviteData = {
  email: string
  role: string
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

export const useSetupChecklist = () => {
  const checklist: SetupChecklistItem[] = [
    {
      id: 1,
      label: 'Set up your organization details',
      icon: LuUsers,
      completed: true,
    },
    {
      id: 2,
      label: 'Upload your memberbase',
      icon: LuFileSpreadsheet,
      completed: false,
    },
    {
      id: 3,
      label: 'Create your first vote',
      icon: LuVote,
      completed: false,
    },
    {
      id: 4,
      label: 'Book a free call with our experts',
      icon: LuCalendar,
      completed: true,
    },
  ]

  const completedCount = checklist.filter((item) => item.completed).length
  const progress = checklist.length > 0 ? (completedCount / checklist.length) * 100 : 0

  return {
    checklist,
    progress,
  }
}

export const useRoles = () => {
  const { bearedFetch } = useAuth()

  return useQuery({
    queryKey: QueryKeys.organization.roles,
    queryFn: async () => {
      const response = await bearedFetch<{ roles: Role[] }>(ApiEndpoints.OrganizationsRoles)
      return response.roles
    },
    staleTime: 60 * 60 * 1000,
    select: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
  })
}

export const useOrganizationTypes = () => {
  const { bearedFetch } = useAuth()

  return useQuery({
    queryKey: QueryKeys.organization.types,
    queryFn: async () => {
      const response = await bearedFetch<{ types: OrganizationType[] }>(ApiEndpoints.OrganizationsTypes)
      return response.types
    },
    staleTime: 60 * 60 * 1000,
    select: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
  })
}

export const useInviteMemberMutation = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: InviteData) =>
      await bearedFetch(ApiEndpoints.OrganizationMembers.replace('{address}', ensure0x(organization.address)), {
        method: 'POST',
        body,
      }),
    onSuccess: () => {
      // Invalidate queries to refresh member and pending member lists
      queryClient.invalidateQueries({ queryKey: QueryKeys.organization.members() })
    },
  })
}

export const useRemoveMemberMutation = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) =>
      await bearedFetch(
        ApiEndpoints.OrganizationMember.replace('{address}', ensure0x(organization.address)).replace(
          '{memberId}',
          String(id)
        ),
        { method: 'DELETE' }
      ),
    onSuccess: () => {
      // Invalidate queries to refresh member and pending member lists
      queryClient.invalidateQueries({ queryKey: QueryKeys.organization.members() })
    },
  })
}
