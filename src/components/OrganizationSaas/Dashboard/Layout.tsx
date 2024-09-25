import { AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { OrganizationAvatar, OrganizationName } from '@vocdoni/chakra-components'
import { OrganizationProvider, useClient } from '@vocdoni/react-providers'
import { Trans, useTranslation } from 'react-i18next'
import { Outlet, Link as ReactRouterLink, useLocation, useNavigate } from 'react-router-dom'
import { HSeparator } from '~components/Auth/SignIn'
import { useAuth } from '~components/Auth/useAuth'
import DarkModeToggle from '~src/themes/saas/components/DarkMode'
import PricingCard from '~src/themes/saas/components/Saas/PricingCard'
import Wrapper from '~src/themes/saas/components/Saas/Wapper'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import { Logo } from '~theme/icons'
import OrganizationDashboardMenu from './Menu'
import Settings from './Settings'

type CardProps = {
  popular: boolean
  title: string
  subtitle: string
  price: string
  features: string[]
}

const OrganizationDashboardLayout: React.FC = () => {
  const { t } = useTranslation()
  const { logout: authLogout } = useAuth()
  const navigate = useNavigate()

  const { textColor, bgSecondary, textColorBrand, bg, textColorSecondary } = useDarkMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
  const { account } = useClient()
  const location = useLocation()

  const getTitle = () => {
    if (location.pathname.includes('/votings')) {
      return (
        <Heading mr='auto' fontSize='2xl'>
          {t('organization.votings_list')}
        </Heading>
      )
    } else if (location.pathname.includes('/team')) {
      return (
        <Heading mr='auto' fontSize='2xl'>
          Team
        </Heading>
      )
    }
  }

  const logout = () => {
    authLogout()
    navigate('/')
  }

  return (
    <OrganizationProvider organization={account}>
      <Wrapper gap={2.5}>
        <Flex
          position='sticky'
          zIndex={10}
          h={12}
          w={['100%', '100%', '100%', 'calc(100% - 285px)']}
          ml='auto'
          justifyContent='end'
          alignItems='center'
          gap={2.5}
          bgColor={bg}
          pt='6vh'
          pb='4vh'
          top={0}
          pl={3.5}
        >
          {getTitle()}
          <Settings />
          <IconButton
            display={{ base: 'flex', lg: 'none' }}
            icon={<HamburgerIcon />}
            aria-label='Open Menu'
            onClick={onOpen}
            h={10}
            w={10}
            borderRadius='full'
            bgColor={textColorBrand}
            fontSize='xl'
          />
          <Box display={{ base: 'none', lg: 'block' }}>
            <DarkModeToggle />
          </Box>
        </Flex>

        <Flex direction={{ base: 'column', lg: 'row' }} flexGrow={1}>
          {account && (
            <>
              <Flex
                w={{ base: '100%', md: '285px' }}
                flexDirection='column'
                justifyContent='space-between'
                p={3.5}
                bg={bgSecondary}
                borderRadius='lg'
                display={{ base: 'none', lg: 'flex' }}
                position='fixed'
                minH='96vh'
                maxH='96vh'
                top='2vh'
                overflowY='auto'
              >
                <VStack>
                  <Logo />
                </VStack>
                <HSeparator my='15px' />

                <OrganizationDashboardMenu />

                <Box mt='auto'>
                  <Button
                    as={ReactRouterLink}
                    to='/processes/create'
                    position='relative'
                    display='flex'
                    justifyContent='center'
                    gap={2.5}
                    borderRadius='full'
                    boxShadow='2px 2px 8px 0px gray'
                    w='full'
                    my={5}
                    bgColor={bg}
                    color={textColor}
                    _hover={{
                      bgColor: bg,
                    }}
                  >
                    <Flex
                      position='absolute'
                      left={5}
                      justifyContent='center'
                      alignItems='center'
                      bgColor='brand.500'
                      px={1}
                      py={1}
                      borderRadius='full'
                    >
                      <AddIcon boxSize={3} color='white' />
                    </Flex>
                    {t('new_voting')}
                  </Button>
                  <VStack>
                    <Button
                      variant='outline'
                      border='none'
                      color={textColorSecondary}
                      textDecoration='underline'
                      _hover={{ textDecoration: 'none' }}
                      onClick={logout}
                    >
                      {t('menu.logout')}
                    </Button>
                  </VStack>
                </Box>
              </Flex>
              <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                  <DrawerContent>
                    <DrawerHeader borderBottomWidth='px'>
                      <Flex justify='space-between' align='center'>
                        <Flex direction='row' gap={3} alignItems='center' minW={0} pr={5}>
                          <OrganizationAvatar />
                          <OrganizationName
                            fontSize='md'
                            fontWeight={600}
                            m={0}
                            color='dashboard.org_name'
                            isTruncated
                          />
                        </Flex>
                        <IconButton
                          icon={<CloseIcon />}
                          aria-label='Close Menu'
                          onClick={onClose}
                          alignSelf='start'
                          size='xs'
                        />
                      </Flex>
                    </DrawerHeader>
                    <DrawerBody>
                      <OrganizationDashboardMenu />
                    </DrawerBody>
                    <DrawerFooter>
                      <DarkModeToggle />
                    </DrawerFooter>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
            </>
          )}

          <Box
            flex={1}
            pl={[0, 0, 0, 4]}
            gap={6}
            display='flex'
            flexDir='column'
            maxW={{ lg: 'calc(100% - 285px)' }}
            w='full'
            ml='auto'
            pt={7}
            mb='2vh'
          >
            <Outlet />
          </Box>
        </Flex>
      </Wrapper>
      <PricingModal isOpenModal={isOpenModal} onCloseModal={onCloseModal} />
    </OrganizationProvider>
  )
}

const PricingModal = ({ isOpenModal, onCloseModal }: { isOpenModal: boolean; onCloseModal: () => void }) => {
  const { t } = useTranslation()

  const cards: CardProps[] = [
    {
      popular: false,
      title: t('pricing_modal.essential_title', { defaultValue: 'Essential' }),
      subtitle: t('pricing_modal.essential_subtitle', {
        defaultValue: 'Small or medium-sized orgs or community groups with basic voting needs.',
      }),
      price: '99',
      features: [
        t('pricing_modal.essential_feat.core_voting', { defaultValue: 'Core voting features' }),
        t('pricing_modal.essential_feat.up_to_admins', { defaultValue: 'Up to 3 Admins and 1 org' }),
        t('pricing_modal.essential_feat.yearly_processes', { defaultValue: '5 yearly voting processes' }),
        t('pricing_modal.essential_feat.report_analytitcs', { defaultValue: 'Basic reporting and analytics' }),
        t('pricing_modal.essential_feat.ticket_support', { defaultValue: 'Ticket support' }),
        t('pricing_modal.essential_feat.gpdr_compilance', { defaultValue: 'GDPR compliance' }),
      ],
    },
    {
      popular: true,
      title: t('pricing_modal.premium_title', { defaultValue: 'Premium' }),
      subtitle: t('pricing_modal.premium_subtitle', {
        defaultValue: 'Larger amount that require more advanced features.',
      }),
      price: '389',
      features: [
        t('pricing_modal.premium_feat.all_essential', { defaultValue: 'All essential plan features' }),
        t('pricing_modal.premium_feat.up_to_admins', { defaultValue: 'Up to 5 Admins' }),
        t('pricing_modal.premium_feat.yearly_processes', { defaultValue: '10 yearly voting processes' }),
        t('pricing_modal.premium_feat.custom_subdomain', { defaultValue: 'Custom subdomain & branding' }),
        t('pricing_modal.premium_feat.report_analytitcs', { defaultValue: 'Advanced reporting & analytics' }),
        t('pricing_modal.premium_feat.ticket_support', { defaultValue: 'Ticket and chat support' }),
        t('pricing_modal.premium_feat.gpdr_compilance', { defaultValue: 'GDPR compliance' }),
      ],
    },
    {
      popular: false,
      title: t('pricing_modal.custom_title', { defaultValue: 'Custom Plan' }),
      subtitle: t('pricing_modal.custom_subtitle', {
        defaultValue:
          'Large organizations enterprises, and institutions requiring extensive customization and support.',
      }),
      price: '999',
      features: [
        t('pricing_modal.custom_feat.all_votings', { defaultValue: 'All faetures & voting types' }),
        t('pricing_modal.custom_feat.unlimited_admins', { defaultValue: 'Unlimited Admins & suborgs' }),
        t('pricing_modal.custom_feat.unlimited_processes', { defaultValue: 'Unlimited yearly voting processes' }),
        t('pricing_modal.custom_feat.white_label_solution', { defaultValue: 'White-label solution' }),
        t('pricing_modal.custom_feat.advanced_security', { defaultValue: 'Advanced security features' }),
        t('pricing_modal.custom_feat.account_manager', { defaultValue: 'Dedicated account manager' }),
        t('pricing_modal.custom_feat.full_tech_support', {
          defaultValue: 'Full technical support (ticket, chat, email)',
        }),
      ],
    },
  ]
  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal} variant='dashboard-plans'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Trans i18nKey='pricing_modal.title'>You need to upgrade to use this feature</Trans>
        </ModalHeader>
        <ModalCloseButton fontSize='lg' />
        <ModalBody>
          {cards.map((card, idx) => (
            <PricingCard key={idx} {...card} />
          ))}
        </ModalBody>

        <ModalFooter>
          <Box>
            <Text>
              <Trans i18nKey='pricing_modal.more_voters'>If you need more voters, you can select it here:</Trans>
            </Text>
            <Select>
              <option>1-500 members</option>
            </Select>
          </Box>
          <Text>
            <Trans i18nKey='pricing_modal.your_plan'>
              Currently you are subscribed to the 'Your plan' subscription. If you upgrade, we will only charge the
              yearly difference. In the next billing period, starting on 'dd/mm/yy' you will pay for the new select
              plan.
            </Trans>
          </Text>
          <Box>
            <Text>
              <Trans i18nKey='pricing_modal.help'>Need some help?</Trans>
            </Text>
            <Button as={ReactRouterLink} colorScheme='white'>
              <Trans i18nKey='contact_us'>Contact us</Trans>
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OrganizationDashboardLayout
