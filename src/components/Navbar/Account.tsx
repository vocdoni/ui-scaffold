import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Button, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import MenuDropdown from './Menu'

export const Account = () => {
  const { isConnected } = useAccount()
  const { t } = useTranslation()

  if (!isConnected) {
    return (
      <Box as='span' whiteSpace='nowrap'>
        <ConnectButton chainStatus='none' showBalance={false} label={t('menu.login').toString()} />
      </Box>
    )
  }

  return (
    <Menu>
      {({ isOpen, onClose }) => (
        <>
          <MenuButton as={Button} p={2}>
            <Box as='span' display='flex' alignItems='center'>
              <Box as='span' display='inline-block' w={6} h={6} borderRadius='50%' border='2px solid green' />
              {isOpen ? <ChevronUpIcon boxSize={8} /> : <ChevronDownIcon boxSize={8} />}
            </Box>
          </MenuButton>

          <MenuList minW='none' onClick={onClose}>
            <MenuDropdown />
          </MenuList>
        </>
      )}
    </Menu>
  )
}
