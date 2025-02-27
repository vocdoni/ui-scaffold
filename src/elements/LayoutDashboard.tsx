import { AddIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Button, Grid, Heading, IconButton, useDisclosure } from '@chakra-ui/react'
import { OrganizationProvider, useClient } from '@vocdoni/react-providers'
import { PropsWithChildren, useState } from 'react'
import { Trans } from 'react-i18next'
import { MdKeyboardArrowLeft, MdWavingHand } from 'react-icons/md'
import { Outlet, Link as ReactRouterLink, Link as RouterLink, generatePath } from 'react-router-dom'
import DashboardMenu from '~components/Dashboard/Menu'
import { PricingModalProvider } from '~components/Pricing/PricingModalProvider'
import { Routes } from '~src/router/routes'

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
          xl: `"sidebar header" "sidebar main"`,
        }}
        templateColumns={{
          base: '1fr',
          xl: '250px 1fr',
        }}
        templateRows='auto 1fr'
        minH='100vh'
        height='100%'
        px={{ base: 2, md: 4, xl: 0 }}
        bg='dashboard.bg.light'
        _dark={{ bg: 'dashboard.bg.dark' }}
        columnGap={6}
      >
        {/* Top Menu */}
        <Box gridArea='header' pt={0} gap={3} display='flex' alignItems='center' mr={{ base: 0, xl: 6 }}>
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
            <Button
              as={RouterLink}
              to={generatePath(Routes.processes.create)}
              w='full'
              my={5}
              leftIcon={<AddIcon />}
              variant='primary'
            >
              <Trans i18nKey='new_voting'>New voting</Trans>
            </Button>
            <Button
              as={RouterLink}
              to={generatePath(Routes.processes.create)}
              w='full'
              my={5}
              leftIcon={<MdWavingHand />}
              variant='transparent'
              display={{ base: 'none', xl: 'block' }}
            >
              <Trans i18nKey='need_help'>Do you need help?</Trans>
            </Button>
            {/* Hamburger button to open sidebar on small screens */}
            <IconButton icon={<HamburgerIcon />} onClick={onOpen} display={{ xl: 'none' }} aria-label='Open menu' />
          </Box>
        </Box>

        {/* Sidebar for large screens */}
        <DashboardMenu isOpen={isOpen} onClose={onClose} />

        {/* Main Content */}
        <Box gridArea='main' mr={{ base: 0, xl: 6 }} mb={4} minW={0}>
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
