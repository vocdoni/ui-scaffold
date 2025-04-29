import { Box, Button, Flex, Icon, ListItem, Text, Tooltip, UnorderedList } from '@chakra-ui/react'
import { BookOpen01, Home02, LifeBuoy01, Mail04, Phone, Settings01, Users01 } from '@untitled-ui/icons-react'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink, generatePath, matchPath, useLocation } from 'react-router-dom'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~src/router/routes'

type MenuItems = {
  label: string
  icon?: any
  route?: string
  children?: MenuItem[]
}

type MenuItem = {
  label: string
  icon?: any
  route?: string
}

export const DashboardMenuOptions = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { reduced } = useContext(DashboardLayoutContext)

  const menuItemsPlatform: MenuItem[] = [
    {
      label: t('organization.dashboard'),
      icon: Home02,
      route: Routes.dashboard.base,
    },
    {
      label: t('voting_processes'),
      icon: Mail04,
      route: Routes.dashboard.processes,
    },
    {
      label: t('memberbase'),
      icon: Users01,
      route: '',
    },
    {
      label: t('settings'),
      icon: Settings01,
      route: Routes.dashboard.settings,
    },
  ]
  const menuItemsHelp: MenuItem[] = [
    {
      label: t('support'),
      icon: LifeBuoy01,
      route: '',
    },
    {
      label: t('call_us', { defaultValue: 'Call us' }),
      icon: Phone,
      route: '',
    },
    {
      label: t('guides', { defaultValue: 'Guides' }),
      icon: BookOpen01,
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
          {menuItemsPlatform.map((item, index) => {
            const isDisabled = !item.route
            const as = isDisabled ? 'button' : ReactRouterLink

            return (
              <React.Fragment key={index}>
                {reduced ? (
                  <ListItem>
                    <Tooltip label={item.label} placement='right-end'>
                      <Button
                        as={as}
                        {...(!isDisabled && { to: generatePath(item.route) })}
                        onClick={(e) => {
                          if (isDisabled) e.preventDefault()
                        }}
                        leftIcon={<Icon as={item.icon} width='16px' height='16px' />}
                        variant='transparent'
                        size='xs'
                        colorScheme='gray'
                        justifyContent='start'
                        gap={4}
                        p={2}
                        isDisabled={isDisabled}
                      >
                        {!reduced && item.label}
                      </Button>
                    </Tooltip>
                  </ListItem>
                ) : (
                  <ListItem>
                    <Button
                      as={as}
                      {...(!isDisabled && { to: generatePath(item.route) })}
                      onClick={(e) => {
                        if (isDisabled) e.preventDefault()
                      }}
                      leftIcon={<Icon as={item.icon} width='16px' height='16px' />}
                      variant='transparent'
                      size='xs'
                      colorScheme='gray'
                      justifyContent='start'
                      gap={4}
                      p={2}
                      fontWeight={400}
                      isActive={Boolean(matchPath({ path: item.route || '', end: true }, location.pathname)) && true}
                      isDisabled={isDisabled}
                    >
                      {!reduced && item.label}
                    </Button>
                  </ListItem>
                )}
              </React.Fragment>
            )
          })}
        </UnorderedList>
      </Box>
      {!reduced && (
        <Box>
          <Text mx={2} mb={2} fontWeight={'bold'} size={'xs'}>
            {t('section.help', { defaultValue: 'Help' })}
          </Text>

          <UnorderedList display={'flex'} flexDirection={'column'} gap={1} listStyleType={"''"} ml={0}>
            {menuItemsHelp.map((item, index) => {
              const isDisabled = !item.route
              const as = isDisabled ? 'button' : ReactRouterLink
              return (
                <ListItem key={index}>
                  <Button
                    as={as}
                    {...(!isDisabled && { to: generatePath(item.route) })}
                    onClick={(e) => {
                      if (isDisabled) e.preventDefault()
                    }}
                    leftIcon={<Icon as={item.icon} width='16px' height='16px' />}
                    variant={'transparent'}
                    size='xs'
                    colorScheme='gray'
                    justifyContent={'start'}
                    gap={4}
                    p={2}
                    fontWeight={400}
                    isActive={Boolean(matchPath({ path: item.route || '', end: true }, location.pathname)) && true}
                    isDisabled
                  >
                    {item.label}
                  </Button>
                </ListItem>
              )
            })}
          </UnorderedList>
        </Box>
      )}
    </Flex>
  )
}
