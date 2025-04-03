import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Drawer, DrawerContent, DrawerOverlay, Flex, Link } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { Link as RouterLink, generatePath } from 'react-router-dom'
import LogoutBtn from '~components/Account/LogoutBtn'
import { HSeparator } from '~components/Auth/SignIn'
import { VocdoniLogo } from '~components/Layout/Logo'
import { Routes } from '~src/router/routes'
import { DashboardMenuOptions } from './Options'

const DashboardMenu = ({ isOpen, onClose, reduced }: { isOpen: boolean; onClose: () => void; reduced: boolean }) => (
  <>
    {/* Sidebar for large screens */}
    <Box
      display={{ base: 'none', md: reduced ? 'none' : 'block' }}
      position={'sticky'}
      top={0}
      maxW={'256px'}
      w='full'
      h='100vh'
      borderRight='var(--border)'
      p={2}
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
      <VocdoniLogo w='130px' mx='5px' />
    </Link>
    <HSeparator mb='10px' />
    <DashboardMenuOptions />
    <Flex mt='auto' flexDirection='column' alignItems='center'>
      <Button
        as={RouterLink}
        to={generatePath(Routes.processes.create)}
        w='full'
        my={5}
        leftIcon={<AddIcon />}
        variant='primary'
      >
        <Trans i18nKey='new_voting'>New vote</Trans>
      </Button>
      <LogoutBtn />
    </Flex>
  </>
)

export default DashboardMenu
