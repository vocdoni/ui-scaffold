import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import OrganizationDashboard from '~components/Organization/Dashboard'
import { DashboardContents } from '~components/shared/Dashboard/Contents'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'

const Dashboard = () => {
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  useEffect(() => {
    setBreadcrumb([])
  }, [setBreadcrumb])

  return (
    <DashboardContents>
      <OrganizationDashboard />
    </DashboardContents>
  )
}

export default Dashboard
