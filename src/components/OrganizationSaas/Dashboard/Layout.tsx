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
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { OrganizationAvatar, OrganizationName } from '@vocdoni/chakra-components'
import { OrganizationProvider, useClient } from '@vocdoni/react-providers'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation } from 'react-router-dom'
import { HSeparator } from '~components/Auth/SignIn'
import DarkModeToggle from '~src/themes/saas/components/DarkMode'
import Wrapper from '~src/themes/saas/components/wrapper'
import useDarkMode from '~src/themes/saas/hooks/useDarkMode'
import { Logo } from '~theme/icons'
import OrganizationDashboardMenu from './Menu'
import Settings from './Settings'

const OrganizationDashboardLayout: React.FC = () => {
  const { t } = useTranslation()
  const { bgSecondary, textColorBrand, bg, textColorSecondary } = useDarkMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { account } = useClient()
  const location = useLocation()

  const getTitle = () => {
    if (location.pathname.includes('/votings')) {
      return (
        <Heading mr='auto' fontSize='2xl'>
          {t('org_saas.votings_list')}
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
                    variant=''
                    display='flex'
                    justifyContent='start'
                    gap='10px'
                    borderRadius='full'
                    boxShadow='2px 2px 8px 0px gray'
                    w='full'
                    my='20px'
                  >
                    <Flex
                      justifyContent='center'
                      alignItems='center'
                      bgColor='brand.500'
                      px={2}
                      py={2}
                      mr={2}
                      borderRadius='full'
                    >
                      <AddIcon boxSize={3} color='white' />
                    </Flex>
                    {t('org_saas.new_voting')}
                  </Button>
                  <VStack>
                    <Button color={textColorSecondary} textDecoration='underline' _hover={{ textDecoration: 'none' }}>
                      {t('org_saas.logout')}
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
          >
            <Outlet />
          </Box>
        </Flex>
      </Wrapper>
    </OrganizationProvider>
  )
}

export default OrganizationDashboardLayout
