import { Box, Drawer, DrawerContent, DrawerOverlay, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import AccountMenu from '~components/Account/Menu'
import { HSeparator } from '~components/Auth/SignIn'
import { Routes } from '~src/router/routes'
import { LogoMbl } from '~theme/icons'
import { DashboardMenuOptions } from './Options'

const DashboardMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <>
    {/* Sidebar for large screens */}
    <Box
      gridArea='sidebar'
      p={4}
      display={{ base: 'none', xl: 'flex' }}
      flexDirection='column'
      gap={4}
      bg='dashboard.sidebar.bg.light'
      _dark={{ bg: 'dashboard.sidebar.bg.dark' }}
      boxShadow='3px 0 5px -6px #6c6d75'
      position='fixed'
      height='100vh'
      gridAutoColumns='auto 1fr auto'
      w='250px'
      overflowY={'auto'}
    >
      <DashboardMenuContent />
    </Box>

    {/* Sidebar for small screens */}
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg='dashboard.sidebar.bg.light' _dark={{ bg: 'dashboard.sidebar.bg.dark' }} overflowY={'auto'}>
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
    <Link as={RouterLink} to={Routes.root} alignSelf='center'>
      <LogoMbl />
    </Link>
    <HSeparator mb='10px' />
    <DashboardMenuOptions />
    {/* User profile & menu */}
    <AccountMenu mt='auto' display={{ base: 'none', xl: 'block' }} />
  </>
)

export default DashboardMenu
