import { Tab, TabList, Tabs } from '@chakra-ui/react'
import { ElectionStatus } from '@vocdoni/sdk'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'
import { DashboardContents, Heading, SubHeading } from '~shared/Dashboard/Contents'

const OrganizationVotings = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const navigate = useNavigate()
  const location = useLocation()
  const menuItems = [
    {
      label: t('all_processes', { defaultValue: 'All' }),
      route: generatePath(Routes.dashboard.processes.all, { page: 1 }),
    },
    {
      label: t('ended_processes', { defaultValue: 'Ended' }),
      route: generatePath(Routes.dashboard.processes.ended, { page: 1, status: ElectionStatus.RESULTS }),
    },
    {
      label: t('draft_processes', { defaultValue: 'Drafts' }),
      route: generatePath(Routes.dashboard.processes.drafts, { page: 1 }),
    },
  ]
  const currentTabIndex = menuItems.findIndex((item) => location.pathname.endsWith(item.route))

  // Set page title
  useEffect(() => {
    setBreadcrumb([
      {
        title: t('voting_processes', { defaultValue: 'Voting processes' }),
      },
    ])
  }, [setBreadcrumb])

  return (
    <DashboardContents>
      <Heading textTransform='capitalize'>{t('voting_processes')}</Heading>
      <SubHeading>{t('voting_processes_description')}</SubHeading>
      <Tabs
        variant='settings'
        index={currentTabIndex === -1 ? 0 : currentTabIndex}
        onChange={(index) => {
          const item = menuItems[index]
          navigate(item.route)
        }}
        isLazy
      >
        <TabList mb={6}>
          {menuItems.map((item, index) => (
            <Tab key={index}>{item.label}</Tab>
          ))}
        </TabList>
        <Outlet context={{ setBreadcrumb }} />
      </Tabs>
    </DashboardContents>
  )
}

export default OrganizationVotings
