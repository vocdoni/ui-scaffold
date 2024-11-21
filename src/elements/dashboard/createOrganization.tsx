import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import { OrganizationCreate } from '~components/Organization/CreateOrg'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'

const DashBoardCreateOrg = () => {
  const { t } = useTranslation()
  const [onSuccessRoute, setOnSuccessRoute] = useState<number>(null)
  const { setTitle } = useOutletContext<DashboardLayoutContext>()

  // Set layout title and subtitle and back button
  useEffect(() => {
    setTitle(t('create_org.title', { defaultValue: 'Organization' }))
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
