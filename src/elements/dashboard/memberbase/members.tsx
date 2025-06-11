import { useQuery } from '@tanstack/react-query'
import { enforceHexPrefix, RoutedPaginationProvider, useOrganization } from '@vocdoni/react-providers'
import { PaginationResponse } from '@vocdoni/sdk'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import MembersTable from '~components/Memberbase/Members'
import { MembersProvider } from '~components/Memberbase/Members/MembersProvider'
import { TableProvider } from '~components/Memberbase/TableProvider'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'
import { QueryKeys } from '~src/queries/keys'

export type Member = {
  id: string
  memberID: string
  name: string
  email: string
  password: string
  phone: string
  other: {
    [key: string]: string
  }
}

export type MembersResponse = {
  members: Member[]
  page: number
  pages: number
}

type PaginatedMembers = {
  members: Member[]
} & PaginationResponse

const usePaginatedMembers = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()
  const params = useParams()
  const [searchParams] = useSearchParams()

  const page = Number(params.page ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const baseUrl = ApiEndpoints.OrganizationMembers.replace('{address}', enforceHexPrefix(organization?.address))
  const fetchUrl = `${baseUrl}?page=${page}&pageSize=${limit}`

  return useQuery<MembersResponse, Error, PaginatedMembers>({
    queryKey: QueryKeys.organization.members(organization?.address),
    enabled: !!organization?.address,
    queryFn: () => bearedFetch<MembersResponse>(fetchUrl),
    select: (data) => {
      const currentPage = data.page - 1
      const lastPage = data.pages

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
  })
}

const Members = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const { data, isLoading } = usePaginatedMembers()

  const members = data?.members || []
  const pagination = data?.pagination || {
    totalItems: 0,
    currentPage: 0,
    lastPage: 0,
    previousPage: null,
    nextPage: null,
  }

  useEffect(() => {
    setBreadcrumb([
      { title: t('memberbase.title', { defaultValue: 'Memberbase' }), route: Routes.dashboard.memberbase.base },
      { title: t('memberbase.members.title', { defaultValue: 'Members' }) },
    ])
  }, [setBreadcrumb])

  const columns = useMemo(
    () => [
      {
        label: t('form.members.spreadsheet.template.firstname', { defaultValue: 'First Name' }),
        id: 'name',
        visible: true,
      },
      {
        label: t('form.members.spreadsheet.template.email', { defaultValue: 'Email' }),
        id: 'email',
        visible: true,
      },
      {
        label: t('form.members.spreadsheet.template.phone', { defaultValue: 'Phone' }),
        id: 'phone',
        visible: true,
      },
      {
        label: t('form.members.spreadsheet.template.member_id', { defaultValue: 'Member ID' }),
        id: 'memberID',
        visible: true,
      },
    ],
    [t]
  )

  return (
    <TableProvider data={members} initialColumns={columns} isLoading={isLoading}>
      <RoutedPaginationProvider path={Routes.dashboard.memberbase.members} pagination={pagination}>
        <MembersProvider>
          <MembersTable />
        </MembersProvider>
      </RoutedPaginationProvider>
    </TableProvider>
  )
}

export default Members
