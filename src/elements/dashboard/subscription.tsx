import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import { Subscription } from '~components/Organization/Subscription'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'

const SubscriptionPage = () => {
  const { t } = useTranslation()
  const { setTitle } = useOutletContext<DashboardLayoutContext>()

  useEffect(() => {
    setTitle(t('subscription.title', { defaultValue: 'Subscription' }))
  }, [])

  return (
    <DashboardContents display='flex' flexDir='column'>
      <Subscription />
    </DashboardContents>
  )
}

export default SubscriptionPage
