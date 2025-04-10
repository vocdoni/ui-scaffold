import { useOrganization } from '@vocdoni/react-providers'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'

const OrganizationDashboard = () => {
  const { organization } = useOrganization()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  if (!organization) return null

  useEffect(() => {
    setBreadcrumb([])
  }, [setBreadcrumb])

  return (
    <DashboardContents>
      <p>This would be the org dashboard (empty for now)</p>
    </DashboardContents>
  )
}

export default OrganizationDashboard
