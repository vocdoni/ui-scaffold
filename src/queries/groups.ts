import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { enforceHexPrefix, useOrganization } from '@vocdoni/react-providers'
import { PaginationResponse } from '@vocdoni/sdk'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { QueryKeys } from '~src/queries/keys'
import { Member } from '~src/queries/members'

export type Group = {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  censusIds: string[]
  membersCount: number
}

export type GroupsResponse = {
  currentPage: number
  totalPages: number
  groups: Group[]
}

export type GroupMembers = {
  members: Partial<Member>[]
  currentPage: number
  totalPages: number
}

export type GroupMembersQueryData = {
  members: Partial<Member>[]
} & PaginationResponse

export type GroupData = {
  title: string
  description?: string
  memberIDs: string[]
}

export const useGroups = (pageSize: number = 6) => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()

  return useInfiniteQuery<GroupsResponse, Error, Group[]>({
    queryKey: QueryKeys.organization.groups(organization?.address),
    enabled: !!organization?.address,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      bearedFetch<GroupsResponse>(
        ApiEndpoints.OrganizationGroups.replace('{address}', enforceHexPrefix(organization?.address)) +
          `?page=${pageParam}&pageSize=${pageSize}`
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) return lastPage.currentPage + 1
      return undefined
    },
    select: (data) => data.pages.flatMap((page) => page.groups),
  })
}

export const useCreateGroup = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: GroupData) => {
      await bearedFetch(ApiEndpoints.OrganizationGroups.replace('{address}', enforceHexPrefix(organization.address)), {
        method: 'POST',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.organization.groups(organization.address),
      })
    },
  })
}

export const useDeleteGroup = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (groupId: string) => {
      await bearedFetch<void>(
        ApiEndpoints.OrganizationGroup.replace('{address}', enforceHexPrefix(organization.address)).replace(
          '{groupId}',
          groupId
        ),
        {
          method: 'DELETE',
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.organization.groups(organization.address),
      })
    },
  })
}

export const useGroupMembers = (groupId: string, page, isOpen: boolean = false) => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()

  const baseUrl = ApiEndpoints.OrganizationGroupMembers.replace(
    '{address}',
    enforceHexPrefix(organization?.address)
  ).replace('{groupId}', groupId)
  const fetchUrl = `${baseUrl}?page=${page}`

  return useQuery<GroupMembers, Error, GroupMembersQueryData>({
    enabled: !!organization?.address && !!groupId && isOpen,
    queryKey: [QueryKeys.organization.groups(organization?.address), groupId, page],
    queryFn: () => bearedFetch<GroupMembers>(fetchUrl),
    select: (data) => {
      const currentPage = data.currentPage
      const lastPage = data.totalPages

      return {
        members: data.members,
        pagination: {
          totalItems: data.members.length,
          currentPage,
          lastPage,
          previousPage: currentPage > 1 ? currentPage - 1 : null,
          nextPage: currentPage < lastPage ? currentPage + 1 : null,
        },
      }
    },
    refetchOnWindowFocus: false,
  })
}
