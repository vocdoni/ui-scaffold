import { Box, Heading, Tab, TabList, Tabs, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { useSaasAccount } from '~components/Account/useSaasAccount'
import QueryDataLayout from '~components/Layout/QueryDataLayout'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
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
      label: t('personalization.title', { defaultValue: 'Personalization' }),
      route: Routes.dashboard.settings.personalization,
    },
    {
      label: t('subscription.title', { defaultValue: 'Subscription Plan' }),
      route: Routes.dashboard.settings.subscription,
    },
    {
      label: t('billing_details', { defaultValue: 'Billing Details' }),
      href: 'https://vocdoni.org',
    },
    {
      label: t('support', { defaultValue: 'Support' }),
      route: Routes.dashboard.settings.support,
    },
  ]

  const currentTabIndex = menuItems.findIndex((item) => (item.route ? location.pathname.endsWith(item.route) : false))

  // Set layout variables
  useEffect(() => {
    setBreadcrumb([{ title: t('settings', { defaultValue: 'Settings' }), route: Routes.dashboard.settings.base }])
  }, [setBreadcrumb])

  return (
    <Box p={6}>
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
            {menuItems.map((item, index) =>
              item.href ? (
                <Tab key={index} as='a' href={item.href} target='_blank' rel='noopener noreferrer'>
                  {item.label}
                </Tab>
              ) : (
                <Tab key={index}>{item.label}</Tab>
              )
            )}
          </TabList>
          <Outlet />
        </Tabs>
      </QueryDataLayout>
    </Box>
  )
}

export default Settings
