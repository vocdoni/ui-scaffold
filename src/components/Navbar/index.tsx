import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
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
import { generatePath, Link as ReactRouterLink, Link as RouterLink, useMatch } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { ColorModeSwitcher } from '~components/Layout/ColorModeSwitcher'
import Logo from '~components/Layout/Logo'
import { Routes } from '~src/router/routes'
import LanguagesListAccordion, { LanguagesMenu } from './LanguagesList'

type MenuItem = {
  icon: any
  label: string
  route?: string
}

const Navbar = () => {
  const { isAuthenticated } = useAuth()
  const isOnProcessesPage = useMatch(Routes.processes.view)
  const reducedMenu = !!isOnProcessesPage && !isAuthenticated
  return (
    <Flex width='full' m='0 auto' mx='auto' py={{ base: 4, md: 6 }} position='relative'>
      <Flex justifyContent='space-between' alignItems='center' zIndex={1} w='100%'>
        <Flex w='248.67px'>
          <Logo />
        </Flex>
        <DesktopNav display={{ base: reducedMenu ? 'flex' : 'none', xl: 'flex' }} />
        {!reducedMenu && <Mobile />}
      </Flex>
    </Flex>
  )
}

const DesktopNav = ({ display }: { display?: any }) => {
  const { isAuthenticated } = useAuth()
  const isOnProcessesPage = useMatch(Routes.processes.view)
  const reducedMenu = !!isOnProcessesPage && !isAuthenticated
  return (
    <>
      {!reducedMenu && <NavMenu display={display} />}
      <Flex alignItems={'center'} display={display ? display : 'flex'}>
        {!reducedMenu && <DashboardButton />}
        <LanguagesMenu ml={'18px'} />
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
                <ListItem>
                  <ListItemColorModeSwitcher />
                </ListItem>
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
        </DrawerContent>
      </Drawer>
    </>
  )
}

const NavMenu = ({ display, children }: { display?: any; children?: any }) => {
  const { t } = useTranslation()
  const isMobile = useBreakpointValue({ base: true, xl: false })
  const { isAuthenticated } = useAuth()
  const isOnProcessesPage = useMatch(Routes.processes.view)
  const reducedMenu = !!isOnProcessesPage && !isAuthenticated
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
    <List as='nav' display={display ? display : 'flex'} flexDirection={{ base: 'column', xl: 'row' }} gap={4}>
      {!reducedMenu && (
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
const ListItemColorModeSwitcher = ({ ...props }) => {
  const { t } = useTranslation()
  const { toggleColorMode } = useColorMode()
  const isLightMode = useColorModeValue(true, false)
  const SwitchIcon = useColorModeValue(IoMdMoon, IoMdSunny)

  return (
    <ButtonGroup
      onClick={toggleColorMode}
      display={'flex'}
      justifyContent={'start'}
      alignItems={'center'}
      fontWeight={'semibold'}
      {...props}
    >
      <Icon as={SwitchIcon} />
      <Text as='span'>{isLightMode ? t('dark_mode') : t('light_mode')}</Text>
    </ButtonGroup>
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
      height='36px'
      fontSize='12px'
      {...props}
    >
      {isAuthenticated ? t('menu.dashboard', { defaultValue: 'Dashboard' }) : t('menu.login')}
    </Button>
  )
}
export default Navbar
