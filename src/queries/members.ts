import { useMutation, useQuery } from '@tanstack/react-query'
import { enforceHexPrefix, useOrganization } from '@vocdoni/react-providers'
import { PaginationResponse } from '@vocdoni/sdk'
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { MemberbaseTabsContext } from '~components/Memberbase'
import { QueryKeys } from './keys'
import { SetupStepIds, useOrganizationSetup } from './organization'

export type Member = {
  id?: string
  memberNumber: string
  name: string
  surname: string
  email: string
  password: string
  phone: string
  nationalId: string
  birthDate: string
}

export type MembersResponse = {
  members: Member[]
  page: number
  pages: number
}

type PaginatedMembers = {
  members: Member[]
} & PaginationResponse

type AddMembersResponse = {
  jobId?: string
  count: number
}

export const useUrlPagination = () => {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const page = Number(params.page ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  return {
    page,
    limit,
  }
}

export const usePaginatedMembers = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()
  const { page, limit } = useUrlPagination()

  const baseUrl = ApiEndpoints.OrganizationMembers.replace('{address}', enforceHexPrefix(organization?.address))
  const fetchUrl = `${baseUrl}?page=${page}&pageSize=${limit}`

  return useQuery<MembersResponse, Error, PaginatedMembers>({
    queryKey: [QueryKeys.organization.members(organization?.address), page, limit],
    enabled: !!organization?.address,
    refetchOnWindowFocus: false,
    queryFn: () => bearedFetch<MembersResponse>(fetchUrl),
    select: (data) => {
      const currentPage = data.page
      const lastPage = data.pages

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
  })
}

export const useAddMembers = (isAsync: boolean = false) => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()
  const { setStepDone } = useOrganizationSetup()

  const baseUrl = ApiEndpoints.OrganizationMembers.replace('{address}', enforceHexPrefix(organization.address))
  const fetchUrl = `${baseUrl}?async=${isAsync}`

  return useMutation<AddMembersResponse, Error, Record<string, any>>({
    mutationKey: QueryKeys.organization.members(organization?.address),
    mutationFn: async (members) =>
      await bearedFetch<AddMembersResponse>(fetchUrl, { body: { members }, method: 'POST' }),
    onSuccess: () => {
      setStepDone(SetupStepIds.memberbaseUpload)
    },
  })
}

export const useDeleteMembers = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()

  return useMutation<void, Error, string[]>({
    mutationKey: QueryKeys.organization.members(organization?.address),
    mutationFn: async (ids: string[]) =>
      await bearedFetch<void>(
        ApiEndpoints.OrganizationMembers.replace('{address}', enforceHexPrefix(organization.address)),
        {
          body: {
            ids,
          },
          method: 'DELETE',
        }
      ),
  })
}

export const useImportJobProgress = () => {
  const { jobId } = useOutletContext<MemberbaseTabsContext>()
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()

  const url = ApiEndpoints.OrganizationMembersImport.replace(
    '{address}',
    enforceHexPrefix(organization.address)
  ).replace('{jobId}', jobId)

  return useQuery({
    enabled: Boolean(jobId),
    queryKey: ['importJobProgress', jobId],
    queryFn: () => bearedFetch<{ progress: number; added: number; total: number }>(url),
    refetchInterval: (query) => {
      const data = query.state.data
      if (!data || data.progress < 100) return 2000
      return false
    },
    refetchOnWindowFocus: false,
  })
}
