import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, ListItem, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react'
import { useClient } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import { FaGlobeAmericas } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { LanguagesSlice } from '../../i18n/languages.mjs'
import { useAccountHealthTools } from '../Account/use-account-health-tools'
import { Account } from './Account'

interface Props {
  mobile: boolean
  onClose?: () => void
}

const NavList = ({ mobile, onClose }: Props) => {
  const { isConnected } = useAccount()
  const { i18n, t } = useTranslation()
  const { account } = useClient()
  const { exists } = useAccountHealthTools()

  const languages = LanguagesSlice as { [key: string]: string }

  return (
    <>
      {isConnected && (
        <>
          <ListItem order={mobile ? 2 : undefined} listStyleType='none' onClick={onClose} whiteSpace='nowrap'>
            <NavLink to='/processes/create'>
              <Button colorScheme='buttons.primary'>{t('menu.create_process')}</Button>
            </NavLink>
          </ListItem>
          {exists && (
            <ListItem order={mobile ? 1 : undefined} listStyleType='none' onClick={onClose} whiteSpace='nowrap'>
              <NavLink to={`/organization/0x${account?.address}`}>
                <Button variant='ghost' colorScheme='buttons.primary'>
                  {t('menu.my_list')}
                </Button>
              </NavLink>
            </ListItem>
          )}
        </>
      )}
      <ListItem order={mobile ? 4 : undefined} listStyleType='none' display='flex' cursor='pointer'>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <FaGlobeAmericas />
          </MenuButton>
          <MenuList>
            <MenuOptionGroup type='radio' defaultValue={i18n.language}>
              {Object.keys(languages).map((k) => (
                <MenuItemOption
                  value={k}
                  key={k}
                  onClick={() => {
                    if (window && 'localStorage' in window) {
                      window.localStorage.setItem('vocdoni.lang', k)
                    }
                    i18n.changeLanguage(k)
                  }}
                >
                  {languages[k]}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </ListItem>
      <ListItem order={mobile ? 1 : undefined} listStyleType='none'>
        <Account />
      </ListItem>
    </>
  )
}

export default NavList
