import { RoutedPaginationProvider } from '@vocdoni/react-providers'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import MembersTable from '~components/Memberbase/Members'
import { MembersProvider } from '~components/Memberbase/Members/MembersProvider'
import { TableProvider } from '~components/Memberbase/TableProvider'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'
import { usePaginatedMembers } from '~src/queries/members'

const Members = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const { data, isLoading, isFetching } = usePaginatedMembers()

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
    <TableProvider data={members} initialColumns={columns} isLoading={isLoading} isFetching={isFetching}>
      <RoutedPaginationProvider path={Routes.dashboard.memberbase.members} pagination={pagination}>
        <MembersProvider>
          <MembersTable />
        </MembersProvider>
      </RoutedPaginationProvider>
    </TableProvider>
  )
}

export default Members
