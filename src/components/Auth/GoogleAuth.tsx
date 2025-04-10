import { Button, Icon } from '@chakra-ui/react'
import { saasOAuthWallet } from '@vocdoni/rainbowkit-wallets'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FcGoogle } from 'react-icons/fc'
import { useAccount, useConnect } from 'wagmi'
import { chains } from '~constants/rainbow'
import { useAuth } from './useAuth'

const GoogleAuth = () => {
  const { setBearer, updateSigner } = useAuth()
  const { isConnected } = useAccount()
  const { t } = useTranslation()

  const oauthWallet = saasOAuthWallet({
    id: 'google',
    chains,
    name: 'Google',
    iconUrl: 'https://authjs.dev/img/providers/google.svg',
    options: {
      oAuthServiceUrl: import.meta.env.OAUTH_URL,
      oAuthServiceProvider: 'google',
      saasBackendUrl: import.meta.env.SAAS_URL,
    },
  })
  const { connector } = oauthWallet.createConnector()

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
