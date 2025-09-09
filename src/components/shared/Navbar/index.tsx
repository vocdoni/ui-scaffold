import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonProps,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  List,
  ListItem,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { IoPricetagOutline } from 'react-icons/io5'
import { LuLogOut } from 'react-icons/lu'
import { RiContactsBook3Line } from 'react-icons/ri'
import { generatePath, Link as ReactRouterLink, Link as RouterLink, useMatch, useMatches } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { ColorModeSwitcher, ColorModeSwitcherDetailed } from '~shared/Layout/ColorModeSwitcher'
import Logo from '~shared/Layout/Logo'
import { Routes } from '~src/router/routes'
import LanguagesListAccordion, { LanguagesMenu } from './LanguagesList'

type MenuItem = {
  icon: any
  label: string
  route?: string
}

type RouteHandle = {
  hideNavbar?: boolean
}

const BREAKPOINT = 'lg'

export function useHideNavbar() {
  const matches = useMatches() as Array<{ handle?: RouteHandle }>
  return Boolean(matches.some((m) => m.handle?.hideNavbar))
}

const Navbar = () => {
  const { isAuthenticated } = useAuth()
  const isOnProcessesPage = useMatch(Routes.processes.view)
  const reducedMenu = !!isOnProcessesPage && !isAuthenticated
  return (
    <Flex width='full' m='0 auto' mx='auto' py={3} position='relative'>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        zIndex={1}
        w='100%'
        display='grid'
        gridTemplateColumns='minmax(0, 1fr) auto minmax(0, 1fr)'
      >
        <Logo />
        <DesktopNav display={{ base: reducedMenu ? 'flex' : 'none', [BREAKPOINT]: 'flex' }} />
        {!reducedMenu && <Mobile />}
      </Flex>
    </Flex>
  )
}

const DesktopNav = ({ display }: { display?: any }) => {
  const { isAuthenticated } = useAuth()
  const isOnProcessesPage = useMatch(Routes.processes.view)
  const reducedMenu = !!isOnProcessesPage && !isAuthenticated
  const hideNavbar = useHideNavbar()
  return (
    <>
      {!hideNavbar && !reducedMenu && <NavMenu display={display} />}
      <Flex alignItems='center' display={display ? display : 'flex'} gap={2} justifySelf='end'>
        {!hideNavbar && !reducedMenu && <DashboardButton />}
        <LanguagesMenu />
        <ColorModeSwitcher />
      </Flex>
    </>
  )
}

const Mobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { logout } = useAuth()
  const { t } = useTranslation()
  const isBreakpointSize = useBreakpointValue({
    base: false,
    [BREAKPOINT]: true,
  })
  const hideNavbar = useHideNavbar()

  useEffect(() => {
    if (isBreakpointSize) onClose()
  }, [isBreakpointSize])

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        onClick={onOpen}
        aria-label={t('menu.open', { defaultValue: 'Open Menu' })}
        display={{ base: 'block', [BREAKPOINT]: 'none' }}
      />
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <Box p={4} display='flex' flexDirection='column' gap={4}>
            <NavMenu>
              {!hideNavbar && (
                <>
                  <Divider />
                  <ListItem>
                    <DashboardButton />
                  </ListItem>
                  <Divider />
                </>
              )}

              <ListItem>
                <LanguagesListAccordion />
              </ListItem>
              <ListItem>
                <ColorModeSwitcherDetailed />
              </ListItem>
              <Divider />
              <ListItem>
                <Button variant='unstyled' onClick={logout} display='flex' alignItems='center' gap={2} h='fit-content'>
                  <Icon as={LuLogOut} />
                  <Text as={'span'} fontWeight={'semibold'}>
                    <Trans i18nKey='logout'>Logout</Trans>
                  </Text>
                </Button>
              </ListItem>
              <Divider />
              <ListItem>
                <Text fontSize={'xs'} fontWeight={'semibold'} as={RouterLink} to={Routes.terms}>
                  <Trans i18nKey='menu.terms'>Terms</Trans>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize={'xs'} fontWeight={'semibold'} as={RouterLink} to={Routes.privacy}>
                  <Trans i18nKey='menu.privacy'>Privacy</Trans>
                </Text>
              </ListItem>
            </NavMenu>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const NavMenu = ({ display, children }: { display?: any; children?: any }) => {
  const { t } = useTranslation()
  const isMobile = useBreakpointValue({ base: true, [BREAKPOINT]: false })
  const { isAuthenticated } = useAuth()
  const isOnProcessesPage = useMatch(Routes.processes.view)
  const reducedMenu = !!isOnProcessesPage && !isAuthenticated
  const hideNavbar = useHideNavbar()
  const menuItems: MenuItem[] = [
    {
      icon: <IoPricetagOutline />,
      label: t('navbar.pricing', { defaultValue: 'Pricing' }),
      route: Routes.plans,
    },
    {
      icon: <RiContactsBook3Line />,
      label: t('navbar.contact', { defaultValue: 'Contact Us' }),
      route: Routes.contact,
    },
    {
      icon: <RiContactsBook3Line />,
      label: t('navbar.usecases', { defaultValue: 'Use Cases' }),
      route: Routes.usecases.base,
    },
  ]
  return (
    <List as='nav' display={display ? display : 'flex'} flexDirection={{ base: 'column', [BREAKPOINT]: 'row' }} gap={4}>
      {!hideNavbar && !reducedMenu && (
        <>
          {menuItems.map((item, index) => (
            <ListItem key={index}>
              <Button
                as={ReactRouterLink}
                to={item.route}
                variant='unstyled'
                fontWeight='semibold'
                display='flex'
                alignItems='center'
                justifyContent={'start'}
                fontSize={'md'}
                h={'fit-content'}
                leftIcon={isMobile ? item.icon : undefined}
              >
                {item.label}
              </Button>
            </ListItem>
          ))}
        </>
      )}

      <>{children}</>
    </List>
  )
}
const DashboardButton = (props?: ButtonProps) => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()

  return (
    <Button
      as={ReactRouterLink}
      to={isAuthenticated ? generatePath(Routes.dashboard.base) : Routes.auth.signIn}
      colorScheme='black'
      px={6}
      fontSize='xs'
      {...props}
    >
      {isAuthenticated ? t('menu.dashboard', { defaultValue: 'Dashboard' }) : t('menu.login')}
    </Button>
  )
}
export default Navbar
