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
import { Outlet, Link as ReactRouterLink, useLocation } from 'react-router-dom'
import { HSeparator } from '~components/Auth/SignIn'
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
  return (
    <OrganizationProvider organization={account}>
      <Wrapper gap='10px'>
        <Flex
          position='sticky'
          zIndex={10}
          h='50px'
          w={['100%', '100%', '100%', 'calc(100% - 285px)']}
          ml='auto'
          justifyContent='end'
          alignItems='center'
          gap='10px'
          bgColor={bg}
          pt='6vh'
          pb='4vh'
          top='0'
          pl='15px'
        >
          {getTitle()}
          <Settings />
          <IconButton
            display={{ base: 'flex', lg: 'none' }}
            icon={<HamburgerIcon />}
            aria-label='Open Menu'
            onClick={onOpen}
            h='36px'
            w='36px'
            borderRadius='full'
            bgColor={textColorBrand}
            fontSize='18px'
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
                p='15px'
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
                    position='relative'
                    display='flex'
                    justifyContent='center'
                    gap='10px'
                    borderRadius='full'
                    boxShadow='2px 2px 8px 0px gray'
                    w='full'
                    my='20px'
                    bgColor={bg}
                    color={textColor}
                    _hover={{
                      bgColor: bg,
                    }}
                  >
                    <Flex
                      position='absolute'
                      left='20px'
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
                    >
                      {t('menu.logout')}
                    </Button>
                  </VStack>
                </Box>
              </Flex>
              <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                  <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>
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
            pl={['0px', '0px', '0px', 4]}
            gap={6}
            display='flex'
            flexDir='column'
            maxW={{ lg: 'calc(100% - 285px)' }}
            w='full'
            ml='auto'
            pt='30px'
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
  const cards: CardProps[] = [
    {
      popular: false,
      title: 'Essential',
      subtitle: 'Small or medium-sized orgs or community groups with basic voting needs.',
      price: '99',
      features: [
        'Core voting features',
        'Up to 3 Admins and 1 org',
        '5 yearly voting processes',
        'Basic reporting and analytics',
        'Ticket support',
        'GDPR compliance',
      ],
    },
    {
      popular: true,
      title: 'Premium',
      subtitle: 'Larger amount thay require more advanced features.',
      price: '389',
      features: [
        'All essential plan features',
        'Up to 5 Admins',
        '10 yearly voting processes',
        'Custom subdomain & branding',
        'Advanced reporting & analytics',
        'Ticket and chat support',
        'GDPR compliance',
      ],
    },
    {
      popular: false,
      title: 'Custom Plan',
      subtitle: 'Large organizations enterprises, and institutions requiring extensive customization and support.',
      price: '999',
      features: [
        'All faetures & voting types',
        'Unlimited Admins & suborgs',
        'Unlimited yearly votingprocesses',
        'White-label solution',
        'Advances securtity features',
        'Dedicated account manager',
        'Full technical support (ticket, chat, email)',
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
