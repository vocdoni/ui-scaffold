import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Grid, Heading, IconButton, useDisclosure } from '@chakra-ui/react'
import { OrganizationProvider, useClient } from '@vocdoni/react-providers'
import { PropsWithChildren, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Outlet, Link as ReactRouterLink } from 'react-router-dom'
import AccountMenu from '~components/Account/Menu'
import DashboardMenu from '~components/Dashboard/Menu'
import { PricingModalProvider } from '~components/Pricing/PricingModalProvider'

export type DashboardLayoutContext = {
  setTitle: (title: string) => void
  setBack: (back: string) => void
}

const LayoutDashboard: React.FC = () => {
  const [title, setTitle] = useState<string | null>(null)
  const [back, setBack] = useState<string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure() // For mobile sidebar toggle

  return (
    <DashboardLayoutProviders>
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
        height='100vh'
        px={{ base: 2, md: 4, lg: 0 }}
        bg='dashboard.bg.light'
        _dark={{ bg: 'dashboard.bg.dark' }}
        gap={6}
      >
        {/* Top Menu */}
        <Box gridArea='header' pt={6} gap={3} display='flex' alignItems='center' mr={{ base: 0, lg: 6 }}>
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
              colorScheme='brand'
              color='black'
            />
          )}
          {title && (
            <Heading size={'sm'} fontWeight={500} alignSelf='center' mb={0} pl='10px' fontSize='1.5rem'>
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
        <Box
          gridArea='main'
          mr={{ base: 0, lg: 6 }}
          mb={4}
          minW={0}
          boxShadow='0 0 0 1px rgba(56,60,67,.05),0 1px 3px 0 rgba(56,60,67,.15)'
          borderRadius='20px'
        >
          <Outlet context={{ setTitle, setBack } satisfies DashboardLayoutContext} />
        </Box>
      </Grid>
    </DashboardLayoutProviders>
  )
}

const DashboardLayoutProviders = (props: PropsWithChildren) => {
  const { account } = useClient()
  return (
    <OrganizationProvider organization={account}>
      <PricingModalProvider {...props} />
    </OrganizationProvider>
  )
}

export default LayoutDashboard
