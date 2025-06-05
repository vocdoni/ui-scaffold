import { Flex, Heading, Tab, TabList, Tabs, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { Routes } from '~routes'

export const MemberbaseTabs = () => {
  const { t } = useTranslation()
  const context = useOutletContext()
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { label: t('memberbase.members.title', { defaultValue: 'Members' }), route: Routes.dashboard.memberbase.members },
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
          <Text mb={4} color='text.subtle'>
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
        <Outlet context={context} />
      </Tabs>
    </>
  )
}
