import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Balance } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import { BiChevronDown, BiCoinStack, BiLogOut } from 'react-icons/bi'
import { useAccount, useDisconnect } from 'wagmi'

const addressTextOverflow = (address: string) =>
  `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`

export const Account = () => {
  const { isConnected, address } = useAccount()
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
        <MenuItem icon={<BiCoinStack />}>
          <Balance />
        </MenuItem>
        <MenuItem icon={<BiLogOut />} onClick={() => disconnect()}>
          {t('logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
