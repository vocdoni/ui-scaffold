import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Drawer, DrawerContent, DrawerOverlay, Link } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { Link as RouterLink, generatePath } from 'react-router-dom'
import LogoutBtn from '~components/Account/LogoutBtn'
import { HSeparator } from '~components/Auth/SignIn'
import { ColorModeSwitcher } from '~components/Layout/ColorModeSwitcher'
import { VocdoniLogo } from '~components/Layout/Logo'
import { Routes } from '~src/router/routes'
import { DashboardMenuOptions } from './Options'

const DashboardMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <>
    {/* Sidebar for large screens */}
    <Box
      gridArea='sidebar'
      p={4}
      display={{ base: 'none', lg: 'flex' }}
      flexDirection='column'
      gap={4}
      bg='dashboard.sidebar.bg.light'
      _dark={{ bg: 'dashboard.sidebar.bg.dark' }}
    >
      <DashboardMenuContent />
    </Box>

    {/* Sidebar for small screens */}
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg='dashboard.sidebar.bg.light' _dark={{ bg: 'dashboard.sidebar.bg.dark' }}>
        <Box p={4} display='flex' flexDirection='column' gap={4}>
          <DashboardMenuContent />
        </Box>
      </DrawerContent>
    </Drawer>
  </>
)

// Common menu contents
const DashboardMenuContent = () => (
  <>
    <Link as={RouterLink} to={Routes.dashboard.base} alignSelf='center'>
      <VocdoniLogo w='180px' />
    </Link>
    <HSeparator />
    <DashboardMenuOptions />
    <Button as={RouterLink} to={generatePath(Routes.processes.create)} w='full' my={5} leftIcon={<AddIcon />}>
      <Trans i18nKey='new_voting'>New voting</Trans>
    </Button>
    <LogoutBtn />
    <ColorModeSwitcher ml='auto' />
  </>
)

export default DashboardMenu
