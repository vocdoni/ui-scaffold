import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import OrganizationDashboard from '~components/Organization/Dashboard'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { DashboardContents } from '~shared/Dashboard/Contents'

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
