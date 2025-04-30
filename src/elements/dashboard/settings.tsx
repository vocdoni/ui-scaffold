import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { useSaasAccount } from '~components/Account/useSaasAccount'
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
    <Box p={6}>
      <Heading size={'xs'} fontWeight={'extrabold'}>
        Vocdoni Coop Settings
      </Heading>
      <Text mb={4} color='rgb(115, 115, 115)'>
        Manage your organization, team members and your subscription plan
      </Text>
      <QueryDataLayout isLoading={isLoading} isError={isError} error={error}>
        <Tabs variant={'settings'}>
          <TabList mb={6}>
            {menuItems.map((item, index) => (
              <Tab key={index}>{item.label}</Tab>
            ))}
          </TabList>

          <TabPanels>
            {menuItems.map((item, index) => (
              <TabPanel key={index}>{item.component}</TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </QueryDataLayout>
    </Box>
  )
}

export default Settings
