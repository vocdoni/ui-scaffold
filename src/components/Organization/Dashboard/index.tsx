import { useOrganization } from '@vocdoni/react-providers'

const OrganizationDashboard = () => {
  const { organization } = useOrganization()

  if (!organization) return null

  return <p>This would be the org dashboard (empty for now)</p>
}

export default OrganizationDashboard
