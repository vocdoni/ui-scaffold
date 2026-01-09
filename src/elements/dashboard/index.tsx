import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import OrganizationDashboard from '~components/Organization/Dashboard'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { DashboardContents } from '~shared/Dashboard/Contents'

const Dashboard = () => {
  return (
    <DashboardContents>
      <OrganizationDashboard />
    </DashboardContents>
  )
}

export default Dashboard
