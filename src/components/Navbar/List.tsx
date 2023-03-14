import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Icon,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTranslation } from 'react-i18next'
import { FaCheck, FaGlobeAmericas } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { LanguagesSlice } from '../../i18n/languages.mjs'

interface Props {
  mobile: boolean
  onClose?: () => void
}

const NavList = ({ mobile, onClose }: Props) => {
  const { isConnected } = useAccount()
  const { i18n, t } = useTranslation()

  const languages = LanguagesSlice as { [key: string]: string }

  return (
    <>
      {isConnected && (
        <ListItem
          order={mobile ? 2 : undefined}
          listStyleType='none'
          onClick={onClose}
        >
          <NavLink to='/processes/create'>{t('menu.create_process')}</NavLink>
        </ListItem>
      )}
      <ListItem
        order={mobile ? 3 : undefined}
        listStyleType='none'
        display='flex'
        cursor='pointer'
      >
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bgColor='transparent'
          >
            <FaGlobeAmericas />
          </MenuButton>
          <MenuList>
            {Object.keys(languages).map((k) => (
              <MenuItem
                key={k}
                onClick={() => {
                  if (window && 'localStorage' in window) {
                    window.localStorage.setItem('vocdoni.lang', k)
                  }
                  i18n.changeLanguage(k)
                }}
              >
                {languages[k]}
                {k === i18n.language && <Icon ml={3} as={FaCheck} />}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </ListItem>
      <ListItem
        order={mobile ? 1 : undefined}
        listStyleType='none'
        onClick={onClose}
      >
        <ConnectButton
          chainStatus='none'
          showBalance={false}
          label={t('menu.connect').toString()}
        />
      </ListItem>
    </>
  )
}

export default NavList
