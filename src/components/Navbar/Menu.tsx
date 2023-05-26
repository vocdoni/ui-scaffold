import { Box, Button, List, ListItem } from '@chakra-ui/react'
import { useClient } from '@vocdoni/chakra-components'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useAccount, useDisconnect } from 'wagmi'
import LanguagesList from './Lngs'

const MenuDropdown = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { account } = useClient()

  return (
    <List position='relative' cursor='pointer'>
      {isConnected && (
        <ListItem display={{ lg: 'none' }} minW='full'>
          <NavLink to={`/organization/0x${account?.address}`}>
            <Button display='flex' justifyContent='end' variant='dropdown'>
              {t('menu.my_list')}
            </Button>
          </NavLink>
        </ListItem>
      )}
      <ListItem minW='full'>
        <Button display='flex' justifyContent='end' variant='dropdown'>
          {t('menu.support')}
        </Button>
      </ListItem>
      <Box display={{ base: 'block', lg: 'none' }} h='1px' w='100%' bgColor='lightgray' />
      <List display={{ base: 'flex', lg: 'none' }} flexDirection='column' alignItems='end' minW='full'>
        <LanguagesList />
      </List>
      {isConnected && (
        <>
          <Box h='1px' w='100%' bgColor='lightgray' />
          <ListItem onClick={() => disconnect()} minW='full'>
            <Button display='flex' justifyContent='end' variant='dropdown'>
              {t('menu.disconnect')}
            </Button>
          </ListItem>
        </>
      )}
    </List>
  )
}

export default MenuDropdown
