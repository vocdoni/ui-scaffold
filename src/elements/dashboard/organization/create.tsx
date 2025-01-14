import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'
import { DashboardContents } from '~components/Layout/Dashboard'
import { OrganizationCreate } from '~components/Organization/Create'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~src/router/routes'

const DashBoardCreateOrg = () => {
  const { t } = useTranslation()
  const [onSuccessRoute, setOnSuccessRoute] = useState<number>(null)
  const { setTitle } = useOutletContext<DashboardLayoutContext>()
  const { exists } = useAccountHealthTools()
  const navigate = useNavigate()

  // Set layout title and subtitle and back button
  useEffect(() => {
    setTitle(t('create_org.title', { defaultValue: 'Organization' }))
    // redirect to profile if organization already exists
    if (exists) {
      navigate(Routes.dashboard.organization)
    }
    if (window.history.state.idx) {
      setOnSuccessRoute(-1)
    }
  }, [])

  return (
    <DashboardContents>
      <OrganizationCreate onSuccessRoute={onSuccessRoute} />
    </DashboardContents>
  )
}

export default DashBoardCreateOrg
