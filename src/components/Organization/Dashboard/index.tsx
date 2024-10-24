import { useOrganization } from '@vocdoni/react-providers'
import { DashboardContents } from '~components/Layout/Dashboard'

const OrganizationDashboard = () => {
  const { organization } = useOrganization()

  if (!organization) return null

  return (
    <DashboardContents>
      <p>This would be the org dashboard (empty for now)</p>
    </DashboardContents>
  )
}

export default OrganizationDashboard
