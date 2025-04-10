import { Button, Icon } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FcGoogle } from 'react-icons/fc'
import { useAccount, useConnect } from 'wagmi'
import { googleWallet } from '~constants/rainbow'
import { useAuth } from './useAuth'

const GoogleAuth = () => {
  const { setBearer, updateSigner } = useAuth()
  const { isConnected } = useAccount()
  const { t } = useTranslation()

  const { connector } = googleWallet.createConnector()
  const { connect, isLoading } = useConnect()

  useEffect(() => {
    if (isConnected) {
      const token = localStorage.getItem('authToken')
      setBearer(token)
      updateSigner(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected])

  return (
    <Button
      fontSize='sm'
      bg={'google.bg.dark'}
      fontWeight='500'
      isLoading={isLoading}
      onClick={() => connect({ connector })}
      _hover={'google.hover.light'}
      _active={'google.active.light'}
      _focus={'google.active.light'}
      _dark={{
        bg: 'google.bg.dark',
        _hover: {
          bg: 'google.hover.dark',
        },
        _active: {
          bg: 'google.hover.dark',
        },
      }}
    >
      <Icon as={FcGoogle} w={5} h={5} me={2} />
      {t('signin_google')}
    </Button>
  )
}

export default GoogleAuth
