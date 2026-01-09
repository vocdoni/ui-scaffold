import { Box, Button, Flex, Icon, IconButton, Text, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { useLocalStorage } from '@uidotdev/usehooks'
import { OrganizationProvider, useClient } from '@vocdoni/react-providers'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { LuCircleHelp, LuPanelLeft, LuPlus } from 'react-icons/lu'
import { generatePath, Outlet, Link as ReactRouterLink } from 'react-router-dom'
import { PricingModalProvider } from '~components/Pricing/PricingModalProvider'
import AnnouncementBanner from '~components/shared/Layout/AnnouncementBanner'
import { LocalStorageKeys, MaxWindowWidth } from '~constants'
import { Routes } from '~routes'
import { DashboardBookerModalButton } from '~shared/Dashboard/Booker'

import DashboardMenu from '~shared/Dashboard/Menu'



export type DashboardLayoutContextType = {
  reduced: boolean
}

export const DashboardLayoutContext = createContext<DashboardLayoutContextType | undefined>(undefined)

const LayoutDashboard: React.FC = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [reduced, setReduced] = useLocalStorage(LocalStorageKeys.DashboardMenuReduced, false)
  const { t } = useTranslation()

  // Close the mobile drawer when the screen size changes
  useEffect(() => {
    if (!isMobile) onClose()
  }, [isMobile])

  return (
    <DashboardLayoutContext.Provider value={{ reduced: reduced && !isMobile }}>
      <DashboardLayoutProviders>
        <Flex minH='100svh' w='full' _dark={{ bg: 'black.650' }} maxW={MaxWindowWidth} margin='0 auto'>
          {/* Sidebar for large screens */}
          <DashboardMenu isOpen={isOpen} onClose={onClose} />

          <Flex flex='1 1 0' flexDirection='column' minW={0} position='relative'>
            <AnnouncementBanner />
            {/* Sidebar Toggle Button - Relocated */}
            <Box position='absolute' top={4} left={{ base: 4, md: 2 }} zIndex={100}>
              <IconButton
                icon={<LuPanelLeft />}
                aria-label={t('menu.open')}
                colorScheme='gray'
                size='xs'
                onClick={isMobile ? onOpen : () => setReduced((prev) => !prev)}
              />
            </Box>

            <Outlet />
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
