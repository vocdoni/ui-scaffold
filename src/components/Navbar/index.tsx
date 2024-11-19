import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonProps,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  List,
  ListItem,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, Link as ReactRouterLink } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'
import { DashboardMenuItem } from '~components/Dashboard/Menu/Item'
import { ColorModeSwitcher } from '~components/Layout/ColorModeSwitcher'
import Logo from '~components/Layout/Logo'
import { Routes } from '~src/router/routes'

type MenuItem = {
  label: string
  route?: string
  children?: MenuItem[]
}

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex justifyContent='space-between' alignItems='center' p={4}>
      <Logo />
      <NavbarMenu isOpen={isOpen} onClose={onClose} />
      <Box display={{ base: 'none', xl: 'flex' }} alignItems='center' gap={2}>
        <NavbarMenuButtons />
      </Box>
      <IconButton icon={<HamburgerIcon />} onClick={onOpen} display={{ xl: 'none' }} aria-label='Open menu' />
    </Flex>
  )
}

const NavbarMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <>
      <Box display={{ base: 'none', xl: 'flex' }} justifyContent='space-between' alignItems='center'>
        <NavbarMenuContent />
      </Box>

      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg='dashboard.sidebar.bg.light' _dark={{ bg: 'dashboard.sidebar.bg.dark' }} overflow='auto'>
          <Box p={4} display='flex' flexDirection='column' alignItems='start' gap={4}>
            <NavbarMenuContent />
            <NavbarMenuButtons alignSelf='center' />
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const NavbarMenuContent = () => {
  const { t } = useTranslation()
  const [openSection, setOpenSection] = useState<string | null>(null)
  const isLargerThanXL = useBreakpointValue({ base: false, xl: true })

  const handleToggle = (label: string) => {
    setOpenSection((prev) => (prev === label ? null : label))
  }
  const menuItems: MenuItem[] = [
    {
      label: t('navbar.use_cases', { defaultValue: 'Use Cases' }),
      children: [
        { label: 'Use case 1', route: '' },
        { label: 'Use case 2', route: '' },
        { label: 'Use case 3', route: '' },
        { label: 'Use case 1', route: '' },
        { label: 'Use case 2', route: '' },
        { label: 'Use case 3', route: '' },
      ],
    },
    {
      label: t('navbar.features', { defaultValue: 'Features' }),
      route: '',
    },
    {
      label: t('navbar.pricing', { defaultValue: 'Pricing' }),
      route: '',
    },
    {
      label: t('navbar.technolgy', { defaultValue: 'Technology' }),
      route: '',
    },
    {
      label: t('navbar.demos', { defaultValue: 'Demos' }),
      route: '',
    },
    {
      label: t('navbar.contact_us', { defaultValue: 'Contact Us' }),
      route: '',
    },
  ]

  return (
    <List as='nav' display='flex' flexDirection={{ base: 'column', xl: 'row' }} gap={4}>
      {menuItems.map((item, index) => (
        <ListItem key={index}>
          {item.children ? (
            <>
              <DashboardMenuItem
                label={item.label}
                route={item.route}
                isOpen={isLargerThanXL ? openSection === item.label : true}
                onToggle={() => handleToggle(item.label)}
                hasChildren
              />
              <Collapse in={isLargerThanXL ? openSection === item.label : true}>
                <List
                  zIndex={20}
                  position={{ base: 'relative', xl: 'absolute' }}
                  gap={6}
                  px={6}
                  pt={{ base: 0, xl: 6 }}
                  bgColor={'navbar.bg_light'}
                  _dark={{ bgColor: 'navbar.bg_dark' }}
                >
                  {item.children.map((child, idx) => (
                    <DashboardMenuItem key={idx} label={child.label} route={child.route} />
                  ))}
                </List>
              </Collapse>
            </>
          ) : (
            <DashboardMenuItem label={item.label} route={item.route} />
          )}
        </ListItem>
      ))}
    </List>
  )
}

const NavbarMenuButtons = (props?: ButtonProps) => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Button
        as={ReactRouterLink}
        to={isAuthenticated ? generatePath(Routes.dashboard.processes) : Routes.auth.signIn}
        width='175px'
        height='50px'
        {...props}
      >
        {isAuthenticated ? t('menu.dashboard', { defaultValue: 'Dashboard' }) : t('menu.login')}
      </Button>
      <ColorModeSwitcher ml='auto' />
    </>
  )
}

export default Navbar
