import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { OrganizationAvatar, OrganizationName } from '@vocdoni/chakra-components'
import { useClient } from '@vocdoni/react-providers'
import { Outlet } from 'react-router-dom'
import OrganizationDashboardMenu from './Menu'

export type OrganizationDashboardLayoutProps = {
  id?: string
}

const OrganizationDashboardLayout: React.FC = ({ id }: OrganizationDashboardLayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { account } = useClient()

  return (
    <Flex direction={['column', 'column', 'row']} minH='100vh' bg='process_create.bg' py={6}>
      {account && (
        <>
          <Box
            w={['100%', '100%', '250px']}
            p={4}
            mx={4}
            bg='white'
            borderRadius='lg'
            display={['none', 'none', 'block']}
          >
            <Flex direction='row' gap={3} alignItems='center' mb={4}>
              <OrganizationAvatar />
              <OrganizationName size='sm' fontWeight={600} m={0} />
            </Flex>
            <OrganizationDashboardMenu />
          </Box>
          <IconButton
            icon={<HamburgerIcon />}
            aria-label='Open Menu'
            display={['block', 'block', 'none']}
            onClick={onOpen}
            m={4}
          />

          <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>
                  <Flex justify='space-between' align='center'>
                    <Flex direction='row' gap={3} alignItems='center'>
                      <OrganizationAvatar />
                      <OrganizationName />
                    </Flex>
                    <IconButton icon={<CloseIcon />} aria-label='Close Menu' onClick={onClose} />
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

      <Box flex={1} px={4} gap={6} display='flex' flexDir='column'>
        <Outlet />
      </Box>
    </Flex>
  )
}

export default OrganizationDashboardLayout
