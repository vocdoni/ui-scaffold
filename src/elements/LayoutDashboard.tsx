import { Flex, IconButton, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { useLocalStorage } from '@uidotdev/usehooks'
import { OrganizationProvider, useClient } from '@vocdoni/react-providers'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LuPanelLeft } from 'react-icons/lu'
import { Outlet } from 'react-router-dom'
import { PricingModalProvider } from '~components/Pricing/PricingModalProvider'
import AnnouncementBanner from '~components/shared/Layout/AnnouncementBanner'
import { LocalStorageKeys, MaxWindowWidth } from '~constants'
import { BreadcrumbItem } from '~shared/Dashboard/Breadcrumb'
import DashboardMenu from '~shared/Dashboard/Menu'

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

          {/* Sidebar toggle button - positioned next to sidebar */}
          <IconButton
            icon={<LuPanelLeft />}
            aria-label={t('menu.open')}
            variant='ghost'
            size='sm'
            onClick={isMobile ? onOpen : () => setReduced((prev) => !prev)}
            position='fixed'
            top={3}
            left={{ base: 3, md: reduced ? '56px' : '263px' }}
            zIndex={1000}
            transition='left 0.3s ease'
          />

          <Flex flex='1 1 0' flexDirection='column' minW={0} pt={6}>
            <AnnouncementBanner />
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
