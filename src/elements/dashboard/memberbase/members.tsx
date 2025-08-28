import { RoutedPaginationProvider } from '@vocdoni/react-providers'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { MemberbaseTabsContext } from '~components/Memberbase'
import MembersTable from '~components/Memberbase/Members'
import { TableProvider } from '~components/Memberbase/TableProvider'
import { Routes } from '~routes'
import { usePaginatedMembers } from '~src/queries/members'

export const useMemberColumns = () => {
  const { t } = useTranslation()

  return useMemo(
    () => [
      {
        label: t('members.fields.firstname', { defaultValue: 'First Name' }),
        id: 'name',
      },
      {
        label: t('members.fields.surname', { defaultValue: 'Last Name' }),
        id: 'surname',
      },
      {
        label: t('members.fields.email', { defaultValue: 'Email' }),
        is2fa: true,
        id: 'email',
      },
      {
        label: t('members.fields.phone', { defaultValue: 'Phone' }),
        is2fa: true,
        id: 'phone',
      },
      {
        label: t('members.fields.member_number', { defaultValue: 'Member Number' }),
        id: 'memberNumber',
      },
      {
        label: t('members.fields.national_id', { defaultValue: 'National ID' }),
        id: 'nationalId',
        visible: false,
      },
      {
        label: t('members.fields.birth_date', { defaultValue: 'Birth Date' }),
        id: 'birthDate',
        visible: false,
      },
    ],
    [t]
  )
}

const Members = () => {
  const { t } = useTranslation()
  const columns = useMemberColumns()
  const { setBreadcrumb, debouncedSearch } = useOutletContext<MemberbaseTabsContext>()
  const { data, isLoading, isFetching } = usePaginatedMembers({ search: debouncedSearch })

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

  return (
    <TableProvider data={members} initialColumns={columns} isLoading={isLoading} isFetching={isFetching}>
      <RoutedPaginationProvider path={Routes.dashboard.memberbase.members} initialPage={1} pagination={pagination}>
        <MembersTable />
      </RoutedPaginationProvider>
    </TableProvider>
  )
}

export default Members
