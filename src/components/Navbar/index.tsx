import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { Button, Flex, Link, List, ListItem, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import Logo from '@components/Layout/Logo'
import { useClient } from '@vocdoni/react-providers'
import { useTranslation } from 'react-i18next'
import { FaEllipsisV } from 'react-icons/fa'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { Account } from './Account'
import MenuDropdown from './Menu'

const Navbar = ({ ...props }) => {
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const { account } = useClient()

  return (
    <Flex as='nav' justifyContent='space-between' alignItems='center' gap={4} {...props}>
      <Logo />
      <List display='flex' alignItems='center' gap={4}>
        {isConnected && (
          <ListItem>
            <Link
              as={ReactRouterLink}
              to='/processes/create'
              variant='button'
              colorScheme='primary'
              aria-label={t('menu.create')}
              title={t('menu.create')}
            >
              <Text as='span' display={{ base: 'none', sm: 'inline-block' }}>
                {t('menu.create')}
              </Text>
              <AddIcon />
            </Link>
          </ListItem>
        )}

        {account && (
          <ListItem display={{ base: 'none', lg: 'inline-block' }}>
            <Link
              as={ReactRouterLink}
              to={`/organization/0x${account?.address}`}
              variant='button'
              colorScheme='transparent'
              aria-label={t('menu.create')}
              title={t('menu.create')}
            >
              {t('menu.my_list')}
            </Link>
          </ListItem>
        )}

        <ListItem>
          <Account />
        </ListItem>

        {!isConnected && (
          <ListItem>
            <Menu>
              {({ isOpen, onClose }) => (
                <>
                  <MenuButton
                    as={Button}
                    aria-label={t('menu.main_menu')}
                    sx={{ span: { margin: 'px' } }}
                    rightIcon={isOpen ? <CloseIcon /> : <FaEllipsisV />}
                    minW='none'
                    pt={1}
                  />
                  <MenuList minW='none' onClick={onClose}>
                    <MenuDropdown />
                  </MenuList>
                </>
              )}
            </Menu>
          </ListItem>
        )}
      </List>
    </Flex>
  )
}

export default Navbar
