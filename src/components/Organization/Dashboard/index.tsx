import { useOrganization } from '@vocdoni/react-providers'
import { useTranslation } from 'react-i18next'
import { DashboardContents } from '~components/Layout/Dashboard'

const OrganizationDashboard = () => {
  const { t } = useTranslation()
  const { organization } = useOrganization()

  if (!organization) return null

  return (
    <DashboardContents>
      <p>This would be the org dashboard (empty for now)</p>
    </DashboardContents>
  )
}

export default OrganizationDashboard
