import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Grid, Heading, IconButton, useDisclosure } from '@chakra-ui/react'
import { OrganizationProvider, useClient } from '@vocdoni/react-providers'
import { useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Outlet, Link as ReactRouterLink } from 'react-router-dom'
import AccountMenu from '~components/Account/Menu'
import DashboardMenu from '~components/Dashboard/Menu'

export type DashboardLayoutContext = {
  setTitle: (title: string) => void
  setBack: (back: string) => void
}

const LayoutDashboard: React.FC = () => {
  const { account } = useClient()
  const [title, setTitle] = useState<string | null>(null)
  const [back, setBack] = useState<string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure() // For mobile sidebar toggle

  return (
    <OrganizationProvider organization={account}>
      <Grid
        templateAreas={{
          base: `"header" "main"`,
          lg: `"sidebar header" "sidebar main"`,
        }}
        templateColumns={{
          base: '1fr',
          lg: '250px 1fr',
        }}
        templateRows='auto 1fr'
        minH='100vh'
        px={{ base: 2, md: 4, lg: 0 }}
        bg='dashboard.bg.light'
        _dark={{ bg: 'dashboard.bg.dark' }}
        gap={6}
      >
        {/* Top Menu */}
        <Box gridArea='header' pt={6} gap={3} display='flex' mr={{ base: 0, lg: 6 }}>
          {back && (
            <IconButton
              as={ReactRouterLink}
              to={back}
              onClick={() => {
                setBack(null)
                setTitle(null)
              }}
              aria-label='Back'
              icon={<MdKeyboardArrowLeft />}
            />
          )}
          {title && (
            <Heading fontSize='x-large' fontWeight={600} alignSelf='center'>
              {title}
            </Heading>
          )}
          <Box ml='auto' display='flex' gap={3} alignItems='center'>
            {/* User profile & menu */}
            <AccountMenu />
            {/* Hamburger button to open sidebar on small screens */}
            <IconButton icon={<HamburgerIcon />} onClick={onOpen} display={{ lg: 'none' }} aria-label='Open menu' />
          </Box>
        </Box>

        {/* Sidebar for large screens */}
        <DashboardMenu isOpen={isOpen} onClose={onClose} />

        {/* Main Content */}
        <Box gridArea='main' mr={{ base: 0, lg: 6 }}>
          <Outlet context={{ setTitle, setBack } satisfies DashboardLayoutContext} />
        </Box>
      </Grid>
    </OrganizationProvider>
  )
}

export default LayoutDashboard
