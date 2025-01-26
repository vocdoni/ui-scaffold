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
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { LogOut01 } from '@untitled-ui/icons-react'
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import { IoPricetagOutline } from 'react-icons/io5'
import { RiContactsBook3Line } from 'react-icons/ri'
import { generatePath, Link as ReactRouterLink, Link as RouterLink } from 'react-router-dom'
import { isExternal } from 'util/types'
import { useAuth } from '~components/Auth/useAuth'
import { DashboardMenuItem } from '~components/Dashboard/Menu/Item'
import { ColorModeSwitcher } from '~components/Layout/ColorModeSwitcher'
import Logo from '~components/Layout/Logo'
import { Routes } from '~src/router/routes'
import LanguagesListAccordion, { LanguagesMenu } from './LanguagesList'

type MenuItem = {
  icon: any
  label: string
  route?: string
  isExternal?: boolean
}

const Navbar = () => {
  return (
    <Flex
      width='full'
      m='0 auto'
      maxW='1920px'
      px={{
        base: 2,
        sm: 4,
        lg: 6,
      }}
      w='full'
      mx='auto'
      py={{ base: 4, md: 6 }}
      position='relative'
    >
      <Flex justifyContent='space-between' alignItems='center' zIndex={1} w='100%'>
        <Logo />
        <DesktopNav display={{ base: 'none', xl: 'flex' }} />
        <Mobile />
      </Flex>
    </Flex>
  )
}

const DesktopNav = ({ display }: { display?: any }) => {
  return (
    <>
      <NavMenu display={display} />
      <Flex alignItems={'center'} display={display ? display : 'flex'}>
        <DashboardButton />
        <LanguagesMenu />
        <ColorModeSwitcher />
      </Flex>
    </>
  )
}

const Mobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { logout } = useAuth()
  const isXlSize = useBreakpointValue({
    base: false,
    xl: true,
  })

  useEffect(() => {
    if (isXlSize) onClose()
  }, [isXlSize])

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        onClick={onOpen}
        aria-label='Open menu'
        display={{ base: 'block', xl: 'none' }}
      />
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg='dashboard.sidebar.bg.light' _dark={{ bg: 'dashboard.sidebar.bg.dark' }}>
          <DrawerContent bg='dashboard.sidebar.bg.light' _dark={{ bg: 'dashboard.sidebar.bg.dark' }}>
            <Box p={4} display='flex' flexDirection='column' gap={4}>
              <NavMenu>
                <Divider />
                <ListItem>
                  <DashboardButton />
                </ListItem>
                <Divider />
                <ListItem>
                  <LanguagesListAccordion />
                </ListItem>
                <ListItemColorModeSwitcher />
                <Divider />
                <ListItem>
                  <Button
                    variant={'unstyled'}
                    onClick={logout}
                    display={'flex'}
                    alignItems={'center'}
                    gap={2}
                    h='fit-content'
                  >
                    <Icon as={LogOut01} />
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

          {/* <DashboardButton variant={'unstyled'} /> */}
        </DrawerContent>
      </Drawer>
    </>
  )
}

const NavMenu = ({ display, children }: { display?: any; children?: any }) => {
  const { t } = useTranslation()
  const isMobile = useBreakpointValue({ base: true, xl: false })
  const menuItems: MenuItem[] = [
    {
      icon: <IoPricetagOutline />,
      label: t('navbar.pricing', { defaultValue: 'Pricing' }),
      route: Routes.plans,
      isExternal: true,
    },
    {
      icon: <RiContactsBook3Line />,
      label: t('navbar.contact', { defaultValue: 'Contact Us' }),
      route: Routes.contact,
    },
  ]
  return (
    <List as='nav' display={display ? display : 'flex'} flexDirection={{ base: 'column', xl: 'row' }} gap={4}>
      {menuItems.map((item, index) => (
        <ListItem key={index}>
          <DashboardMenuItem
            label={item.label}
            route={item.route}
            variant='unstyled'
            fontWeight='semibold'
            display='flex'
            alignItems='center'
            fontSize={'md'}
            h={'fit-content'}
            leftIcon={isMobile ? item.icon : undefined}
            isExternal={isExternal}
          />
        </ListItem>
      ))}
      <>{children}</>
    </List>
  )
}
const ListItemColorModeSwitcher = ({ ...props }) => {
  const { t } = useTranslation()
  const { toggleColorMode } = useColorMode()
  const isLightMode = useColorModeValue(true, false)
  const SwitchIcon = useColorModeValue(IoMdMoon, IoMdSunny)

  return (
    <ListItem
      onClick={toggleColorMode}
      display={'flex'}
      justifyContent={'start'}
      alignItems={'center'}
      gap={2}
      fontWeight={'semibold'}
      role='button'
      {...props}
    >
      <Icon as={SwitchIcon} />
      <Text as='span'>{isLightMode ? t('dark_mode') : t('light_mode')}</Text>
    </ListItem>
  )
}
const DashboardButton = (props?: ButtonProps) => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()

  return (
    <Button
      as={ReactRouterLink}
      to={isAuthenticated ? generatePath(Routes.dashboard.base) : Routes.auth.signIn}
      size={'lg'}
      colorScheme='gradient'
      variant='primary'
      p='10px 30px'
      {...props}
    >
      {isAuthenticated ? t('menu.dashboard', { defaultValue: 'Dashboard' }) : t('menu.login')}
    </Button>
  )
}
export default Navbar
