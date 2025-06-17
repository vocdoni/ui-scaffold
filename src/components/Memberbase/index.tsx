import { Flex, Heading, Tab, TabList, Tabs, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'

export type MemberbaseTabsContext = {
  setJobId: (jobId: string | null) => void
  jobId: string | null
  search: string
  setSearch: (search: string) => void
  debouncedSearch: string
} & DashboardLayoutContext

const useDebouncedValue = (value, delay) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debounced
}

export const MemberbaseTabs = () => {
  const [jobId, setJobId] = useState(null)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search, 500)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()

  const menuItems = [
    {
      label: t('memberbase.members.title', { defaultValue: 'Members' }),
      route: generatePath(Routes.dashboard.memberbase.members, { page: 1 }),
    },
    { label: t('memberbase.groups.title', { defaultValue: 'Groups' }), route: Routes.dashboard.memberbase.groups },
  ]
  const currentTabIndex = menuItems.findIndex((item) => location.pathname.endsWith(item.route))

  return (
    <>
      <Flex align='center' gap={2}>
        <Flex flex={1} direction='column'>
          <Heading size='md' fontWeight='extrabold'>
            {t('memberbase.title', {
              defaultValue: 'Memberbase',
            })}
          </Heading>
          <Text mb={4} color='texts.subtle'>
            {t('memberbase.subtitle', {
              defaultValue: "Manage your organization's members and create censuses",
            })}
          </Text>
        </Flex>
      </Flex>
      <Tabs
        variant='settings'
        index={currentTabIndex === -1 ? 0 : currentTabIndex}
        onChange={(index) => {
          const item = menuItems[index]
          navigate(item.route)
        }}
      >
        <TabList mb={6}>
          {menuItems.map((item, index) => (
            <Tab key={index}>{item.label}</Tab>
          ))}
        </TabList>
        <Outlet context={{ setBreadcrumb, setJobId, jobId, search, setSearch, debouncedSearch }} />
      </Tabs>
    </>
  )
}
