import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import { Memberbase } from '~components/Members'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'

const Members = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  // Set layout variables
  useEffect(() => {
    setBreadcrumb([{ title: t('memberbase.title'), route: Routes.dashboard.memberbase.base }])
  }, [setBreadcrumb])

  return (
    <DashboardContents>
      <Memberbase />
    </DashboardContents>
  )
}

export default Members
