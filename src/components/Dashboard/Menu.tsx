import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import LogoutBtn from '~components/Account/LogoutBtn'
import { HSeparator } from '~components/Auth/SignIn'
import { VocdoniLogo } from '~components/Layout/Logo'
import { Routes } from '~src/router/routes'

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import { OrganizationName } from '@vocdoni/chakra-components'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiMiniPencil, HiSquares2X2 } from 'react-icons/hi2'
import { IoIosSettings } from 'react-icons/io'
import { generatePath, Link, useLocation } from 'react-router-dom'
import { ColorModeSwitcher } from '~components/Layout/ColorModeSwitcher'

export const DashboardMenuOptions = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [menuVotings, setMenuVotings] = useState(false)
  const [menuSettings, setMenuSettings] = useState(false)

  return (
    <Box>
      <OrganizationName color='text.secondary' mb={2.5} />
      <Button
        as={Link}
        to={generatePath(Routes.dashboard.base)}
        isActive={location.pathname === Routes.dashboard.base}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={FaHouse} />}
      >
        {t('organization.dashboard')}
      </Button>
      <Button
        onClick={() => setMenuVotings((prev) => !prev)}
        isActive={location.pathname.includes(generatePath(Routes.dashboard.processes))}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={HiSquares2X2} />}
        rightIcon={menuVotings ? <ChevronUpIcon mt={1} /> : <ChevronDownIcon mt={1} />}
      >
        {t('voting_processes')}
      </Button>
      {menuVotings && (
        <Box pl={6}>
          <Button
            as={Link}
            to={generatePath(Routes.dashboard.processes)}
            isActive={location.pathname.includes(generatePath(Routes.dashboard.processes))}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            {t('all')}
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('active')}
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('finished')}
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('draft')}
          </Button>
        </Box>
      )}
      <Button as={Link} justifyContent='start' variant='dashboard' w='full' leftIcon={<Icon as={GiHamburgerMenu} />}>
        {t('organization.census')}
      </Button>
      <Button as={Link} justifyContent='start' variant='dashboard' w='full' leftIcon={<Icon as={HiMiniPencil} />}>
        {t('user_managment')}
      </Button>
      <Button
        onClick={() => setMenuSettings((prev) => !prev)}
        isActive={location.pathname.includes(Routes.dashboard.team)}
        justifyContent='start'
        variant='dashboard'
        w='full'
        leftIcon={<Icon as={IoIosSettings} />}
        rightIcon={menuSettings ? <ChevronUpIcon mt={1} /> : <ChevronDownIcon mt={1} />}
      >
        {t('settings')}
      </Button>
      {menuSettings && (
        <Box pl={6}>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('organization.organization')}
          </Button>
          <Button
            as={Link}
            to={Routes.dashboard.team}
            isActive={location.pathname.includes(Routes.dashboard.team)}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            {t('team')}
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('billing')}
          </Button>
          <Button justifyContent='start' variant='dashboard' w='full'>
            {t('subscription')}
          </Button>
          <Button
            as={Link}
            to={Routes.dashboard.profile}
            isActive={location.pathname.includes(Routes.dashboard.profile)}
            justifyContent='start'
            variant='dashboard'
            w='full'
          >
            {t('profile')}
          </Button>
        </Box>
      )}
      <Button as={Link} justifyContent='start' variant='dashboard' w='full' leftIcon={<Icon as={FaPhoneAlt} />}>
        {t('help_and_support')}
      </Button>
    </Box>
  )
}

const DashboardMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <>
    {/* Sidebar for large screens */}
    <Box
      gridArea='sidebar'
      p={4}
      display={{ base: 'none', lg: 'flex' }}
      flexDirection='column'
      alignItems='center'
      gap={4}
      bg='dashboard.sidebar.bg.light'
      _dark={{ bg: 'dashboard.sidebar.bg.dark' }}
    >
      <VocdoniLogo w='180px' />
      <HSeparator />

      <DashboardMenuOptions />

      <Button
        as={ReactRouterLink}
        to={Routes.processes.create}
        variant='box-shadow'
        w='full'
        my={5}
        leftIcon={<AddIcon />}
      >
        <Trans i18nKey='new_voting'>New voting</Trans>
      </Button>
      <LogoutBtn />
      <ColorModeSwitcher ml='auto' />
    </Box>

    {/* Sidebar as a drawer for small screens */}
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg='dashboard.sidebar.bg.light' _dark={{ bg: 'dashboard.sidebar.bg.dark' }}>
        <Box p={4} display='flex' flexDirection='column' alignItems='center' gap={4}>
          <VocdoniLogo w='180px' />
          <HSeparator />

          <DashboardMenuOptions />

          <Button
            as={ReactRouterLink}
            to={Routes.processes.create}
            variant='box-shadow'
            w='full'
            my={5}
            leftIcon={<AddIcon />}
          >
            <Trans i18nKey='new_voting'>New voting</Trans>
          </Button>
          <LogoutBtn />
          <ColorModeSwitcher ml='auto' />
        </Box>
      </DrawerContent>
    </Drawer>
  </>
)

export default DashboardMenu
