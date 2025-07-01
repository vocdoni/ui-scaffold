import { RoutedPaginationProvider } from '@vocdoni/react-providers'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import MembersTable from '~components/Memberbase/Members'
import { TableProvider } from '~components/Memberbase/TableProvider'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'
import { usePaginatedMembers } from '~src/queries/members'

export const useMemberColumns = () => {
  const { t } = useTranslation()

  return useMemo(
    () => [
      {
        label: t('form.members.spreadsheet.template.firstname', { defaultValue: 'First Name' }),
        id: 'name',
      },
      {
        label: t('form.members.spreadsheet.template.surname', { defaultValue: 'Last Name' }),
        id: 'surname',
      },
      {
        label: t('form.members.spreadsheet.template.email', { defaultValue: 'Email' }),
        id: 'email',
      },
      {
        label: t('form.members.spreadsheet.template.phone', { defaultValue: 'Phone' }),
        id: 'phone',
      },
      {
        label: t('form.members.spreadsheet.template.member_number', { defaultValue: 'Member Number' }),
        id: 'memberNumber',
      },
      {
        label: t('form.members.spreadsheet.template.national_id', { defaultValue: 'National ID' }),
        id: 'nationalID',
        visible: false,
      },
      {
        label: t('form.members.spreadsheet.template.birth_date', { defaultValue: 'Birth Date' }),
        id: 'birthDate',
        visible: false,
      },
    ],
    [t]
  )
}

const Members = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const { data, isLoading, isFetching } = usePaginatedMembers()
  const columns = useMemberColumns()

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
