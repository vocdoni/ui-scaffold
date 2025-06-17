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
  censusIDs: string[]
  membersCount: number
}

export type GroupsResponse = {
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

const PAGE_SIZE = 6

export const useGroups = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()

  return useInfiniteQuery<GroupsResponse, Error, Group[]>({
    queryKey: QueryKeys.organization.groups(organization?.address),
    enabled: !!organization?.address,
    refetchOnWindowFocus: false,
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      bearedFetch<GroupsResponse>(
        ApiEndpoints.OrganizationGroups.replace('{address}', enforceHexPrefix(organization?.address)) +
          `?page=${pageParam}&limit=${PAGE_SIZE}`
      ),
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.flatMap((p) => p.groups).length
      const hasMore = lastPage.groups.length === PAGE_SIZE
      return hasMore ? allPages.length : undefined
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
  const fetchUrl = `${baseUrl}?page=${page + 1}`

  return useQuery<GroupMembers, Error, GroupMembersQueryData>({
    enabled: !!organization?.address && !!groupId && isOpen,
    queryKey: [QueryKeys.organization.groups(organization?.address), groupId, page + 1],
    queryFn: () => bearedFetch<GroupMembers>(fetchUrl),
    select: (data) => {
      const currentPage = data.currentPage - 1
      const lastPage = data.totalPages - 1

      return {
        members: data.members,
        pagination: {
          totalItems: data.members.length,
          currentPage,
          lastPage,
          previousPage: currentPage > 0 ? currentPage - 1 : null,
          nextPage: currentPage < lastPage ? currentPage + 1 : null,
        },
      }
    },
    refetchOnWindowFocus: false,
  })
}
