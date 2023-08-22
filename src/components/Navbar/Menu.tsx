import { MenuItem } from '@chakra-ui/react'
import EditProfile from '@components/Account/EditProfile'
import { Balance, HR } from '@vocdoni/chakra-components'
import { useClient } from '@vocdoni/react-providers'
import { useTranslation } from 'react-i18next'
import { BiLogOut } from 'react-icons/bi'
import { useAccount, useDisconnect } from 'wagmi'
import LanguagesList from './LanguagesList'

const MenuDropdown = () => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { account, clear } = useClient()

  return (
    <>
      <MenuItem display='flex' justifyContent='end'>
        <Balance />
      </MenuItem>

      {account && (
        <MenuItem
          as='a'
          href={`/organization/0x${account?.address}`}
          display={{ base: 'block', lg: 'none' }}
          textAlign='end'
        >
          {t('menu.my_list')}
        </MenuItem>
      )}
      {account && <EditProfile />}

      <MenuItem as='a' href='#' display='block' textAlign='end'>
        {t('menu.support')}
      </MenuItem>

      <HR
        my={1}
        border='none'
        h='1px'
        mb={5}
        bgColor='lightgray'
        _before={{
          content: `"🌎"`,
          position: 'absolute',
          right: 3,
          pt: 2,
        }}
      />

      <LanguagesList />
      {isConnected && (
        <>
          <HR my={1} border='none' h='1px' bgColor='lightgray' />

          <MenuItem
            onClick={() => {
              disconnect()
              clear()
            }}
            minW='full'
            display='flex'
            gap={2}
          >
            <BiLogOut />
            {t('menu.disconnect')}
          </MenuItem>
        </>
      )}
    </>
  )
}

export default MenuDropdown
