import { Heading, Tab, TabList, Tabs, Text } from '@chakra-ui/react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { useSaasAccount } from '~components/Account/SaasAccountProvider'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { DashboardContents } from '~shared/Dashboard/Contents'
import QueryDataLayout from '~shared/Layout/QueryDataLayout'
import { Routes } from '~src/router/routes'

type MenuItem = {
  label: string
  component?: React.ReactNode
  href?: string
  route?: string
}

const Settings = () => {
  const { t } = useTranslation()
  const { isLoading, isError, error, organization } = useSaasAccount()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  const navigate = useNavigate()
  const location = useLocation()

  const menuItems: MenuItem[] = [
    {
      label: t('organization.organization', { defaultValue: 'Organization Details' }),
      route: Routes.dashboard.settings.organization,
    },
    {
      label: t('team.title', { defaultValue: 'Team' }),
      route: Routes.dashboard.settings.team,
    },
    {
      label: t('subscription.title', { defaultValue: 'Subscription Plan' }),
      route: Routes.dashboard.settings.subscription,
    },
    {
      label: t('support', { defaultValue: 'Support' }),
      route: Routes.dashboard.settings.support,
    },
  ]

  const currentTabIndex = useMemo(
    () => menuItems.findIndex((item) => (item.route ? location.pathname.endsWith(item.route) : false)),
    [location.pathname, menuItems]
  )

  // Set layout variables
  useEffect(() => {
    const currentTab = menuItems[currentTabIndex] || menuItems[0]
    setBreadcrumb([
      { title: t('settings', { defaultValue: 'Settings' }), route: Routes.dashboard.settings.base },
      {
        title: currentTab.label,
      },
    ])
  }, [setBreadcrumb, currentTabIndex])

  return (
    <DashboardContents>
      <Heading size='md' fontWeight='extrabold'>
        {t('organization_settings.title', {
          defaultValue: '{{organization}} Settings',
          organization: organization.account.name.default,
        })}
      </Heading>
      <Text mb={4} color='gray.500'>
        {t('organization_settings.subtitle', {
          defaultValue: 'Manage your organization, team members and your subscription plan',
        })}
      </Text>
      <QueryDataLayout isLoading={isLoading} isError={isError} error={error}>
        <Tabs
          variant='settings'
          index={currentTabIndex === -1 ? 0 : currentTabIndex}
          onChange={(index) => {
            const item = menuItems[index]
            if (!item.route) return
            navigate(item.route)
          }}
        >
          <TabList mb={6}>
            {menuItems.map((item, index) => (
              <Tab key={index}>{item.label}</Tab>
            ))}
          </TabList>
          <Outlet />
        </Tabs>
      </QueryDataLayout>
    </DashboardContents>
  )
}

export default Settings
