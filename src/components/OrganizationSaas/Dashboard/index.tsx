import { useOrganization } from '@vocdoni/react-providers'

const OrganizationDashboard = () => {
  const { organization } = useOrganization()

  if (!organization) return null

  return null
}

export default OrganizationDashboard
