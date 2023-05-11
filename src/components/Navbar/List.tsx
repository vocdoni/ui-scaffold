import { AddIcon, ChevronDownIcon, CloseIcon } from '@chakra-ui/icons'
import { Button, List, ListItem, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import { useClient } from '@vocdoni/chakra-components'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FaEllipsisV, FaGlobe } from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { SearchInputContext } from '../../Providers'
import SearchButton from '../Search/Button'
import { Account } from './Account'
import LanguagesList from './Lngs'
import MenuDropdown from './Menu'

type Props = {
  displayFullInput?: () => void
}

const NavList = ({ displayFullInput }: Props) => {
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const { account } = useClient()
  const location = useLocation()

  const searchInputValues = useContext(SearchInputContext)

  return (
    <>
      {!searchInputValues?.isSearchInScreen && location.pathname === '/' && (
        <ListItem display={{ md: 'none' }}>
          <SearchButton displayFullInput={displayFullInput} aria={t('menu.search')} />
        </ListItem>
      )}

      <ListItem display={{ base: 'none', md: 'inline-block' }}>
        <Menu>
          <MenuButton
            as={Button}
            variant='unstyled'
            sx={{ span: { margin: 'px' } }}
            leftIcon={<FaGlobe />}
            rightIcon={<ChevronDownIcon />}
            pt={1}
          />
          <MenuList minW='none'>
            <List display='flex' flexDirection='column' alignItems='center' gap={4} px={8} py={2} textAlign='end'>
              <LanguagesList />
            </List>
          </MenuList>
        </Menu>
      </ListItem>
      {isConnected && (
        <>
          <ListItem display={{ base: 'none', md: 'inline-block' }}>
            <NavLink to={`/organization/0x${account?.address}`}>
              <Button variant='unstyled'>{t('menu.my_list')}</Button>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to='/processes/create'>
              <Button
                variant='solid'
                rightIcon={<AddIcon />}
                sx={{ span: { margin: 0 } }}
                colorScheme='navbar.btn_create'
              >
                <Text as='span' display={{ base: 'none', md: 'inline-block' }} pr={2}>
                  {t('menu.create')}
                </Text>
              </Button>
            </NavLink>
          </ListItem>
        </>
      )}
      <ListItem>
        <Account />
      </ListItem>
      {!isConnected && (
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                variant='unstyled'
                sx={{ span: { margin: 'px' } }}
                rightIcon={isOpen ? <CloseIcon /> : <FaEllipsisV />}
                minW='none'
                pt={1}
              />
              <MenuList minW='none'>
                <MenuDropdown />
              </MenuList>
            </>
          )}
        </Menu>
      )}
    </>
  )
}

export default NavList
