import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLoaderData, useOutletContext } from 'react-router-dom'
import { Memberbase } from '~components/Members'
import { MembersTableProvider } from '~components/Members/MembersTableProvider'
import { DashboardContents } from '~components/shared/Dashboard/Contents'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'

const Members = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const data = useLoaderData()

  // Set layout variables
  useEffect(() => {
    setBreadcrumb([{ title: t('memberbase.title'), route: Routes.dashboard.memberbase.base }])
  }, [setBreadcrumb])

  return (
    <MembersTableProvider>
      <DashboardContents>
        <Memberbase />
      </DashboardContents>
    </MembersTableProvider>
  )
}

export default Members
