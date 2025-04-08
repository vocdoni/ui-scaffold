import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Link,
  ListItem,
  OrderedList,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { ChevronRight, HelpCircle, LayoutRight, Plus } from '@untitled-ui/icons-react'
import { OrganizationProvider, useClient } from '@vocdoni/react-providers'
import { PropsWithChildren, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { generatePath, Outlet, Link as ReactRouterLink } from 'react-router-dom'
import DashboardMenu from '~components/Dashboard/Menu'
import { PricingModalProvider } from '~components/Pricing/PricingModalProvider'
import { Routes } from '~routes'

export type DashboardLayoutContext = {
  setBreadcrumb: any
}
type BreadcrumbItem = {
  title: string
  route: string
}

const LayoutDashboard: React.FC = () => {
  const { t } = useTranslation()
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure() // For mobile sidebar toggle
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [reduced, setReduced] = useState(false)

  return (
    <DashboardLayoutProviders>
      <Flex minH='100svh' w='full'>
        {/* Sidebar for large screens */}
        <DashboardMenu isOpen={isOpen} onClose={onClose} reduced={reduced} />

        {/* Main Content */}
        <Flex flex='1 1 0' flexDirection={'column'}>
          {/* Top Menu */}
          <Box
            position={'sticky'}
            bgColor='white'
            top={0}
            px={4}
            gap={4}
            display='flex'
            h={16}
            flexShrink={0}
            alignItems='center'
            borderBottom='var(--border)'
          >
            <IconButton
              icon={<LayoutRight />}
              aria-label='Open menu'
              variant={'transparent'}
              colorScheme='gray'
              size={'xs'}
              onClick={isMobile ? onOpen : () => setReduced((prev) => !prev)}
            />

            <Box borderRight={'var(--border)'} h={6} />

            <Box as='nav'>
              <OrderedList display={'flex'} alignItems={'center'} gap={1.5} styleType={"''"} ml={0}>
                {!!breadcrumb.length ? (
                  <>
                    <ListItem>
                      <Link
                        as={ReactRouterLink}
                        to={generatePath(Routes.dashboard.base)}
                        variant={'breadcrumb'}
                        fontSize={'sm'}
                        onClick={() => setBreadcrumb([])}
                      >
                        {t('organization.dashboard')}
                      </Link>
                    </ListItem>
                    <ListItem display={'flex'} justifyContent={'center'} alignItems={'center'} fontSize={'sm'}>
                      <Icon as={ChevronRight} />
                    </ListItem>
                  </>
                ) : (
                  <ListItem>{t('organization.dashboard')}</ListItem>
                )}
                {breadcrumb.map((el, idx) => (
                  <>
                    <ListItem key={idx}>
                      {idx === breadcrumb.length - 1 ? (
                        <Text as='span' fontSize={'sm'}>
                          {el.title}
                        </Text>
                      ) : (
                        <Link as={ReactRouterLink} to={generatePath(el.route)} variant={'breadcrumb'} fontSize={'sm'}>
                          {el.title}
                        </Link>
                      )}
                    </ListItem>
                    <ListItem display={'flex'} justifyContent={'center'} alignItems={'center'}>
                      {idx < breadcrumb.length - 1 && <Icon as={ChevronRight} />}
                    </ListItem>
                  </>
                ))}
              </OrderedList>
            </Box>

            <Flex gap={2} ml='auto' alignItems={'center'}>
              <Button
                as={ReactRouterLink}
                to={generatePath(Routes.processes.create)}
                leftIcon={<HelpCircle />}
                colorScheme='gray'
                size={'sm'}
              >
                <Trans i18nKey='help'>Do you need help?</Trans>
              </Button>
              <Button leftIcon={<Plus />} colorScheme='black' size={'sm'}>
                <Trans i18nKey='new_voting'>New vote</Trans>
              </Button>
            </Flex>
          </Box>
          <Outlet context={{ setBreadcrumb } satisfies DashboardLayoutContext} />
        </Flex>
      </Flex>
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
