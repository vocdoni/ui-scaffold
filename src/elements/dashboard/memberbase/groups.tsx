import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import GroupsBoard from '~components/Members/GroupsBoard'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'

const Groups = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  useEffect(() => {
    setBreadcrumb([
      { title: t('memberbase.title', { defaultValue: 'Memberbase' }), route: Routes.dashboard.memberbase.base },
      { title: t('memberbase.groups.title', { defaultValue: 'Groups' }) },
    ])
  }, [setBreadcrumb])

  return <GroupsBoard />
}

export default Groups
