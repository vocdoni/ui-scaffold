import { Button, List, ListItem } from '@chakra-ui/react'
import EditProfile from '@components/Account/EditProfile'
import { Balance, HR } from '@vocdoni/chakra-components'
import { useClient } from '@vocdoni/react-providers'
import { useTranslation } from 'react-i18next'
import { BiLogOut } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import { useAccount, useDisconnect } from 'wagmi'
import LanguagesList from './LanguagesList'

const MenuDropdown = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { account, clear } = useClient()

  return (
    <List position='relative' cursor='pointer'>
      <ListItem textAlign='end' pr={4}>
        <Balance />
      </ListItem>

      {account && (
        <>
          <ListItem display={{ lg: 'none' }} minW='full'>
            <NavLink to={`/organization/0x${account?.address}`}>
              <Button display='flex' justifyContent='end' variant='dropdown'>
                {t('menu.my_list')}
              </Button>
            </NavLink>
          </ListItem>
          <ListItem minW='full'>
            <EditProfile />
          </ListItem>
        </>
      )}

      <ListItem minW='full'>
        <Button display='flex' justifyContent='end' variant='dropdown'>
          {t('menu.support')}
        </Button>
      </ListItem>

      <HR m={1} display={{ base: 'block', lg: 'none' }} border='none' h='1px' bgColor='lightgray' />

      <List display={{ base: 'flex', lg: 'none' }} flexDirection='column' alignItems='end' minW='full'>
        <LanguagesList />
      </List>
      {isConnected && (
        <>
          <HR m={1} border='none' h='1px' bgColor='lightgray' />

          <ListItem
            onClick={() => {
              disconnect()
              clear()
            }}
            minW='full'
          >
            <Button leftIcon={<BiLogOut />} display='flex' justifyContent='end' variant='dropdown'>
              {t('menu.disconnect')}
            </Button>
          </ListItem>
        </>
      )}
    </List>
  )
}

export default MenuDropdown
