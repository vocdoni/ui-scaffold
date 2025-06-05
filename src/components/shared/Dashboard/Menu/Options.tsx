import { Box, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { LuBookOpen, LuHouse, LuLifeBuoy, LuPhone, LuSettings, LuUsers, LuVote } from 'react-icons/lu'
import { matchPath, useLocation } from 'react-router-dom'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~src/router/routes'
import { DashboardMenuItem, DashboardMenuItemButton } from './Item'

export const DashboardMenuOptions = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { reduced } = useContext(DashboardLayoutContext)

  const menuItemsPlatform: DashboardMenuItem[] = [
    {
      label: t('organization.dashboard'),
      icon: LuHouse,
      route: Routes.dashboard.base,
    },
    {
      label: t('voting_processes'),
      icon: LuVote,
      route: Routes.dashboard.processes,
    },
    {
      label: t('memberbase.title', { defaultValue: 'Memberbase' }),
      icon: LuUsers,
      route: Routes.dashboard.memberbase.base,
    },
    {
      label: t('settings'),
      icon: LuSettings,
      route: Routes.dashboard.settings.base,
    },
  ]
  const menuItemsHelp: DashboardMenuItem[] = [
    {
      label: t('support'),
      icon: LuLifeBuoy,
      route: Routes.dashboard.settings.support,
    },
    {
      label: t('call_us', { defaultValue: 'Call us' }),
      icon: LuPhone,
      route: '',
    },
    {
      label: t('guides', { defaultValue: 'Guides' }),
      icon: LuBookOpen,
      route: '',
    },
  ]

  return (
    <Flex flexDirection={'column'} gap={8}>
      <Box>
        {!reduced && (
          <Text mx={2} mb={2} fontWeight={'bold'} size={'xs'}>
            {t('section.platform', { defaultValue: 'Platform' })}
          </Text>
        )}
        <UnorderedList display={'flex'} flexDirection={'column'} gap={1} listStyleType={"''"} ml={'0'}>
          {menuItemsPlatform.map((item, index) => (
            <ListItem key={index}>
              <DashboardMenuItemButton
                item={item}
                reduced={reduced}
                isActive={Boolean(matchPath({ path: item.route || '', end: true }, location.pathname)) && true}
              />
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      {!reduced && (
        <Box>
          <Text mx={2} mb={2} fontWeight={'bold'} size={'xs'}>
            {t('section.help', { defaultValue: 'Help' })}
          </Text>

          <UnorderedList display={'flex'} flexDirection={'column'} gap={1} listStyleType={"''"} ml={0}>
            {menuItemsHelp.map((item, index) => {
              return (
                <ListItem key={index}>
                  <DashboardMenuItemButton item={item} reduced={reduced} />
                </ListItem>
              )
            })}
          </UnorderedList>
        </Box>
      )}
    </Flex>
  )
}
