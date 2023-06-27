import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Balance, useClient } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import { BiChevronDown, BiLogOut } from 'react-icons/bi'
import { useAccount, useDisconnect } from 'wagmi'
import { addressTextOverflow } from '../../constants'
import { useAccountHealthTools } from '../Account/use-account-health-tools'

export const Account = () => {
  const { isConnected, address } = useAccount()
  const { clear } = useClient()
  const { exists } = useAccountHealthTools()
  const { disconnect } = useDisconnect()
  const { t } = useTranslation()

  if (!isConnected) {
    return <ConnectButton chainStatus='none' showBalance={false} label={t('menu.connect').toString()} />
  }

  return (
    <Menu>
      <MenuButton as={Button} variant='ghost' colorScheme='buttons.primary' rightIcon={<BiChevronDown />}>
        {addressTextOverflow(address as string)}
      </MenuButton>
      <MenuList>
        {isConnected && exists && (
          <MenuItem>
            <Balance />
          </MenuItem>
        )}
        <MenuItem
          icon={<BiLogOut />}
          onClick={() => {
            disconnect()
            clear()
          }}
        >
          {t('logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
