import { Box, Button, Flex, Icon, IconButton, Text, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { OrganizationProvider, useClient } from '@vocdoni/react-providers'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { Trans } from 'react-i18next'
import { LuCircleHelp, LuPanelLeft, LuPlus } from 'react-icons/lu'
import { generatePath, Outlet, Link as ReactRouterLink } from 'react-router-dom'
import { BookerModalButton } from '~components/Dashboard/Booker'
import Breadcrumb, { BreadcrumbItem } from '~components/Dashboard/Breadcrumb'
import DashboardMenu from '~components/Dashboard/Menu'
import { PricingModalProvider } from '~components/Pricing/PricingModalProvider'
import { Routes } from '~routes'

export type DashboardLayoutContext = {
  setBreadcrumb: (items: BreadcrumbItem[]) => void
}

export type DashboardLayoutContextType = {
  reduced: boolean
}

export const DashboardLayoutContext = createContext<DashboardLayoutContextType | undefined>(undefined)

const LayoutDashboard: React.FC = () => {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [reduced, setReduced] = useState(false)

  // Close/reduce the sidebar when the screen size changes
  useEffect(() => {
    if (isMobile) setReduced(false)
    if (!isMobile) onClose()
  }, [isMobile])

  return (
    <DashboardLayoutContext.Provider value={{ reduced }}>
      <DashboardLayoutProviders>
        <Flex minH='100svh' w='full' _dark={{ bg: 'black.650' }}>
          {/* Sidebar for large screens */}
          <DashboardMenu isOpen={isOpen} onClose={onClose} />

          <Flex flex='1 1 0' flexDirection='column'>
            {/* Top Menu */}
            <Box
              position='sticky'
              borderBottom='1px solid'
              _dark={{ borderBottomColor: 'black.700' }}
              _light={{ borderBottomColor: 'gray.200' }}
              bgColor='chakra.body.bg'
              top={0}
              pr={4}
              pl={2}
              gap={4}
              display='flex'
              h={16}
              flexShrink={0}
              alignItems='center'
              zIndex={100}
            >
              <IconButton
                icon={<LuPanelLeft />}
                aria-label='Open menu'
                colorScheme='gray'
                size='xs'
                onClick={isMobile ? onOpen : () => setReduced((prev) => !prev)}
              />

              <Box borderRight={'var(--border)'} h={6} />

              <Breadcrumb breadcrumb={breadcrumb} setBreadcrumb={setBreadcrumb} />

              <Flex gap={2} ml='auto' alignItems='center'>
                <BookerModalButton leftIcon={<Icon as={LuCircleHelp} />} colorScheme='gray' variant='solid' size='sm'>
                  <Text as='span' display={{ base: 'none', lg: 'flex' }} fontSize='sm'>
                    <Trans i18nKey='do_you_need_help'>Do you need help?</Trans>
                  </Text>
                </BookerModalButton>
                <Button
                  as={ReactRouterLink}
                  to={generatePath(Routes.processes.create)}
                  leftIcon={<Icon as={LuPlus} />}
                  colorScheme='black'
                  size='sm'
                >
                  <Text as='span' fontSize='sm' display={{ base: 'none', lg: 'flex' }}>
                    <Trans i18nKey='new_voting'>New vote</Trans>
                  </Text>
                </Button>
              </Flex>
            </Box>
            <Outlet context={{ setBreadcrumb } satisfies DashboardLayoutContext} />
          </Flex>
        </Flex>
      </DashboardLayoutProviders>
    </DashboardLayoutContext.Provider>
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
