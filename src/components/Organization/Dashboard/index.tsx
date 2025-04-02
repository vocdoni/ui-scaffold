import { useOrganization } from '@vocdoni/react-providers'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'

const OrganizationDashboard = () => {
  const { t } = useTranslation()
  const { organization } = useOrganization()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  // Set layout variables
  useEffect(() => {
    setBreadcrumb([{ title: t('organization.dashboard'), route: Routes.dashboard.base }])
  }, [setBreadcrumb])

  if (!organization) return null

  return (
    <DashboardContents>
      <p>This would be the org dashboard (empty for now)</p>
    </DashboardContents>
  )
}

export default OrganizationDashboard
