import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Button, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import { addressTextOverflow } from '@constants'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import MenuDropdown from './Menu'

export const Account = () => {
  const { isConnected, address } = useAccount()
  const { t } = useTranslation()

  if (!isConnected) {
    return (
      <Box as='span' whiteSpace='nowrap'>
        <ConnectButton chainStatus='none' showBalance={false} label={t('menu.connect').toString()} />
      </Box>
    )
  }

  return (
    <Menu>
      {({ isOpen, onClose }) => (
        <>
          <MenuButton as={Button} variant='ghost' p={2}>
            <Box as='span' display='flex' gap={1} alignItems='center'>
              <Box as='span' display='inline-block' w={6} h={6} borderRadius='50%' background='navbar.account_icon' />
              <Text fontWeight='light'>{addressTextOverflow(address as string)}</Text>
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
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
