import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  AspectRatio,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  useDisclosure,
} from '@chakra-ui/react'
import { OrganizationAvatar, OrganizationName } from '@vocdoni/chakra-components'
import { OrganizationProvider, useClient } from '@vocdoni/react-providers'
import { Outlet } from 'react-router-dom'
import OrganizationDashboardMenu from './Menu'
import fallback from '/assets/default-avatar.png'

const OrganizationDashboardLayout: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { account } = useClient()

  return (
    <OrganizationProvider organization={account}>
      <Flex flexDirection='column' bg='process_create.bg' flexGrow={1}>
        <Flex
          className='site-wrapper'
          direction={['column', 'column', 'column', 'row']}
          flexGrow={1}
          py={6}
          minH='80vh'
        >
          {account && (
            <>
              <Box
                w={['100%', '100%', '100%', '250px']}
                p={4}
                bg='white'
                borderRadius='lg'
                display={['none', 'none', 'none', 'block']}
              >
                <Flex direction='row' gap={3} alignItems='center' mb='43px'>
                  {account?.account.avatar ? (
                    <OrganizationAvatar />
                  ) : (
                    <AspectRatio w='55px' minW='55px' ratio={1 / 1} borderRadius='lg' overflow='hidden'>
                      <Image src={fallback} />
                    </AspectRatio>
                  )}
                  <OrganizationName
                    fontSize='text'
                    fontWeight={600}
                    m={0}
                    color='dashboard.org_name'
                    isTruncated
                    title={account?.account.name.default}
                  />
                </Flex>
                <OrganizationDashboardMenu />
              </Box>
              <Box w='auto'>
                <IconButton
                  icon={<HamburgerIcon />}
                  aria-label='Open Menu'
                  display={['flex', 'flex', 'flex', 'none']}
                  onClick={onOpen}
                  mb={4}
                  maxW='10px'
                />
              </Box>

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
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
            </>
          )}

          <Box flex={1} pl={['0px', '0px', '0px', 4]} gap={6} display='flex' flexDir='column'>
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </OrganizationProvider>
  )
}

export default OrganizationDashboardLayout
