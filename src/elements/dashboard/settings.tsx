import { Button, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { useSaasAccount } from '~components/Account/useSaasAccount'
import { DashboardContents } from '~components/Layout/Dashboard'
import QueryDataLayout from '~components/Layout/QueryDataLayout'
import OrganizationEdit from '~components/Organization/Dashboard/Organization'
import SubscriptionPage from '~components/Organization/Dashboard/Subscription'
import OrganizationTeam from '~components/Organization/Dashboard/Team'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~src/router/routes'

type MenuItem = {
  label: string
  component: any
}
const Settings = () => {
  const { t } = useTranslation()
  const { isLoading, isError, error } = useSaasAccount()
  const [view, setView] = useState<any>()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  const menuItems: MenuItem[] = [
    { label: t('organization.organization'), component: <OrganizationEdit /> },
    { label: t('team.title'), component: <OrganizationTeam /> },
    // { label: t('billing'), route: '#billing' },
    { label: t('subscription.title'), component: <SubscriptionPage /> },
  ]

  // Set layout variables
  useEffect(() => {
    setBreadcrumb([{ title: t('settings', { defaultValue: 'settings' }), route: Routes.dashboard.settings }])
  }, [setBreadcrumb])

  return (
    <QueryDataLayout isLoading={isLoading} isError={isError} error={error}>
      <DashboardContents>
        <HStack>
          {menuItems.map((item, index) => (
            <Button key={index} onClick={() => setView(item.component)} variant={'transparent'}>
              {item.label}
            </Button>
          ))}
        </HStack>
        {view && <>{view}</>}
      </DashboardContents>
    </QueryDataLayout>
  )
}

export default Settings
