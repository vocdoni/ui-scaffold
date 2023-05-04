import { Box, List, ListItem } from '@chakra-ui/react'
import { useClientContext } from '@vocdoni/react-components'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useAccount, useDisconnect } from 'wagmi'
import LanguagesList from './Lngs'

const MenuDropdown = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { account } = useClientContext()

  return (
    <List display='flex' flexDirection='column' alignItems='end' gap={2} px={4} py={2} textAlign='end' cursor='pointer'>
      {isConnected && (
        <ListItem display={{ md: 'none' }}>
          <NavLink to={`/organization/0x${account?.address}`}>{t('menu.my_list')}</NavLink>
        </ListItem>
      )}
      <ListItem>FAQ's</ListItem>
      <ListItem>{t('menu.support')}</ListItem>
      <Box display={{ base: 'block', md: 'none' }} h='1px' w='100%' bgColor='lightgray' />
      <List display={{ base: 'flex', md: 'none' }} flexDirection='column' gap={2} alignItems='end'>
        <LanguagesList />
      </List>
      {isConnected && (
        <>
          <Box h='1px' w='100%' bgColor='lightgray' />
          <ListItem onClick={() => disconnect()}>{t('menu.disconnect')}</ListItem>
        </>
      )}
    </List>
  )
}

export default MenuDropdown
