import { Tab, TabList, Tabs } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { Heading, SubHeading } from '~components/shared/Dashboard/Contents'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'

export type MemberbaseTabsContext = {
  setJobId: (jobId: JobId) => void
  jobId: JobId
  search: string
  setSearch: (search: string) => void
  debouncedSearch: string
  submitSearch: () => void
} & DashboardLayoutContext

export type JobId = string | null

export const MemberbaseTabs = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const [jobId, setJobIdState] = useState<JobId>(() => localStorage.getItem('memberbaseImportJobId'))
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const menuItems = [
    {
      label: t('memberbase.members.title', { defaultValue: 'Members' }),
      route: generatePath(Routes.dashboard.memberbase.members, { page: 1 }),
    },
    { label: t('memberbase.groups.title', { defaultValue: 'Groups' }), route: Routes.dashboard.memberbase.groups },
  ]
  const currentTabIndex = menuItems.findIndex((item) => location.pathname.endsWith(item.route))

  const submitSearch = () => {
    setDebouncedSearch(search)
  }

  const setJobId = (newJobId: string | null) => {
    if (newJobId) {
      localStorage.setItem('memberbaseImportJobId', newJobId)
    } else {
      localStorage.removeItem('memberbaseImportJobId')
    }
    setJobIdState(newJobId)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  return (
    <>
      <Heading>
        {t('memberbase.title', {
          defaultValue: 'Memberbase',
        })}
      </Heading>
      <SubHeading>
        {t('memberbase.subtitle', {
          defaultValue: "Manage your organization's members and create groups",
        })}
      </SubHeading>
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
        <Outlet context={{ setBreadcrumb, setJobId, jobId, search, setSearch, debouncedSearch, submitSearch }} />
      </Tabs>
    </>
  )
}
