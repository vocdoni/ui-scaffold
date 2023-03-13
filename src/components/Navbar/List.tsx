import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTranslation } from 'react-i18next'
import { FaGlobeAmericas } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useAccount } from 'wagmi'

interface Props {
  mobile: boolean
  onClose?: () => void
}

const NavList = ({ mobile, onClose }: Props) => {
  const { isConnected } = useAccount()
  const { i18n, t } = useTranslation()

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
            <MenuItem onClick={() => i18n.changeLanguage('eng')}>
              English
            </MenuItem>
            <MenuItem onClick={() => i18n.changeLanguage('cat')}>
              Català
            </MenuItem>
            <MenuItem onClick={() => i18n.changeLanguage('esp')}>
              Español
            </MenuItem>
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
