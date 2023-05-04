import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, ListItem, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react'
import { useClient } from '@vocdoni/chakra-components'
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
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { i18n, t } = useTranslation()
  const { account } = useClient()

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
            variant='unstyled'
            as={Button}
            sx={{ span: { margin: 'px' } }}
            pt={1}
            leftIcon={<FaGlobe />}
            rightIcon={<ChevronDownIcon />}
          />
          <MenuList minW='none'>
            <List display='flex' flexDirection='column' alignItems='center' gap={2} textAlign='end' px={4} py={2}>
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
                rightIcon={<AddIcon />}
                variant='solid'
                colorScheme='navbar.btn_create'
                sx={{ span: { margin: 0 } }}
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
                variant='unstyled'
                minW='none'
                as={Button}
                sx={{ span: { margin: 'px' } }}
                pt={1}
                rightIcon={isOpen ? <CloseIcon /> : <FaEllipsisV />}
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
