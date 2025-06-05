import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLoaderData, useOutletContext } from 'react-router-dom'
import MembersTable from '~components/Memberbase/Members'
import { TableProvider } from '~components/Memberbase/TableProvider'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'

export type Participant = {
  [key: string]: string
}

type MembersLoaderData = {
  participants: Participant[]
  pagination: {
    page: number
    total: number
    perPage: number
  }
}

const Members = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const { participants, pagination } = useLoaderData() as MembersLoaderData

  useEffect(() => {
    setBreadcrumb([
      { title: t('memberbase.title', { defaultValue: 'Memberbase' }), route: Routes.dashboard.memberbase.base },
      { title: t('memberbase.members.title', { defaultValue: 'Members' }) },
    ])
  }, [setBreadcrumb])

  const columns = useMemo(
    () => [
      {
        label: t('form.participants.spreadsheet.template.firstname', { defaultValue: 'First Name' }),
        id: 'name',
        visible: true,
      },
      {
        label: t('form.participants.spreadsheet.template.lastname', { defaultValue: 'Last Name' }),
        id: 'lastname',
        visible: true,
      },
      {
        label: t('form.participants.spreadsheet.template.email', { defaultValue: 'Email' }),
        id: 'email',
        visible: true,
      },
      {
        label: t('form.participants.spreadsheet.template.phone', { defaultValue: 'Phone' }),
        id: 'phone',
        visible: true,
      },
      {
        label: t('form.participants.spreadsheet.template.member_id', { defaultValue: 'Member ID' }),
        id: 'participantNo',
        visible: true,
      },
      {
        label: t('form.participants.spreadsheet.template.national_id', { defaultValue: 'National ID' }),
        id: 'national_id',
        visible: false,
      },
      {
        label: t('form.participants.spreadsheet.template.birth_date', { defaultValue: 'Birth Date' }),
        id: 'birth_date',
        visible: false,
      },
    ],
    [t]
  )

  return (
    <TableProvider data={participants} initialColumns={columns}>
      <MembersTable />
    </TableProvider>
  )
}

export default Members
