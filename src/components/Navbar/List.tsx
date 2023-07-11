import { AddIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons'
import { Button, List, ListItem, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import { useClient } from '@vocdoni/chakra-components'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { FaEllipsisV, FaGlobeAmericas } from 'react-icons/fa'
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
        <ListItem display={{ lg: 'none' }}>
          <SearchButton displayFullInput={displayFullInput} aria={t('menu.search')} />
        </ListItem>
      )}

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

      {isConnected && (
        <>
          <ListItem display={{ base: 'none', lg: 'inline-block' }}>
            <NavLink to={`/organization/0x${account?.address}`}>
              <Button variant='ghost'>{t('menu.my_list')}</Button>
            </NavLink>
          </ListItem>

          <ListItem>
            <NavLink to='/processes/create'>
              <Button
                colorScheme='primary'
                rightIcon={<AddIcon />}
                title={t('menu.create')}
                sx={{ span: { margin: { base: 0, sm: 1 } } }}
              >
                <Text as='span' display={{ base: 'none', sm: 'inline-block' }}>
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
          {({ isOpen, onClose }) => (
            <>
              <MenuButton
                as={Button}
                variant='ghost'
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
    </>
  )
}

export default NavList
