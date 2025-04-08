import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import { Subscription } from '~components/Organization/Subscription'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'

const SubscriptionPage = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  useEffect(() => {
    setBreadcrumb([
      { title: t('subscription.title', { defaultValue: 'Subscription' }), route: Routes.dashboard.subscription },
    ])
  }, [setBreadcrumb])

  return (
    <DashboardContents display='flex' flexDir='column'>
      <Subscription />
    </DashboardContents>
  )
}

export default SubscriptionPage
