import { AddIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons'
import { Button, Flex, List, ListItem, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import Logo from '@components/Layout/Logo'
import { useClient } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import { FaEllipsisV, FaGlobeAmericas } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { Account } from './Account'
import LanguagesList from './LanguagesList'
import MenuDropdown from './Menu'

const Navbar = ({ ...props }) => {
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const { account } = useClient()

  return (
    <Flex as='nav' justifyContent='space-between' alignItems='center' gap={4} {...props}>
      <Logo />
      <List display='flex' alignItems='center' gap={4}>
        <ListItem display={{ base: 'none', lg: 'inline-block' }}>
          <Menu>
            {({ isOpen, onClose }) => (
              <>
                <MenuButton
                  as={Button}
                  variant='ghost'
                  sx={{ span: { margin: 'px' } }}
                  leftIcon={<FaGlobeAmericas />}
                  rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  p={2}
                />
                <MenuList minW={24} w='full' p={0} onClick={onClose}>
                  <List display='flex' flexDirection='column' alignItems='center' textAlign='end'>
                    <LanguagesList />
                  </List>
                </MenuList>
              </>
            )}
          </Menu>
        </ListItem>

        {account && (
          <ListItem display={{ base: 'none', lg: 'inline-block' }}>
            <NavLink to={`/organization/0x${account?.address}`}>
              <Button variant='ghost'>{t('menu.my_list')}</Button>
            </NavLink>
          </ListItem>
        )}

        {isConnected && (
          <ListItem>
            <NavLink to='/processes/create'>
              <Button
                colorScheme='primary'
                rightIcon={<AddIcon ml={{ base: 0, sm: 2 }} />}
                sx={{ span: { margin: 0 } }}
                title={t('menu.create')}
              >
                <Text as='span' display={{ base: 'none', sm: 'inline-block' }}>
                  {t('menu.create')}
                </Text>
              </Button>
            </NavLink>
          </ListItem>
        )}

        <ListItem>
          <Account />
        </ListItem>

        {!isConnected && (
          <Menu>
            {({ isOpen, onClose }) => (
              <>
                <MenuButton
                  as={Button}
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
        )}
      </List>
    </Flex>
  )
}

export default Navbar
