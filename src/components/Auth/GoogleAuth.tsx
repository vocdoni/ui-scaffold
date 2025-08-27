import { Button, Icon, useToast } from '@chakra-ui/react'
import { saasOAuthWallet } from '@vocdoni/rainbowkit-wallets'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BsGoogle } from 'react-icons/bs'
import { useAccount, useConnect } from 'wagmi'
import { useAuth } from './useAuth'

const GoogleAuth = () => {
  const { setBearer, updateSigner } = useAuth()
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const toast = useToast()

  const { connect, isPending, isError, error } = useConnect()

  useEffect(() => {
    if (isError) {
      console.error('Google OAuth error', error?.message || '')
      toast({
        status: 'error',
        title: t('google_oauth_error', { defaultValue: 'Google OAuth Error' }),
        description: t('google_oauth_error_description', {
          defaultValue: 'Google OAuth error, please try again',
        }),
      })
      return
    }
    if (isConnected) {
      const token = localStorage.getItem('authToken')
      setBearer(token)
      updateSigner(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isError])

  return (
    <Button
      variant={'outline'}
      isLoading={isPending}
      onClick={() => {
        const wallet = saasOAuthWallet({
          id: 'google',
          name: 'Google',
          iconUrl: 'https://authjs.dev/img/providers/google.svg',
          options: {
            oAuthServiceUrl: import.meta.env.OAUTH_URL,
            oAuthServiceProvider: 'google',
            saasBackendUrl: import.meta.env.SAAS_URL,
          },
        })
        connect({ connector: wallet.createConnector({} as any) })
      }}
      w='full'
      fontWeight={'bold'}
      leftIcon={<Icon as={BsGoogle} />}
    >
      {t('signin_google')}
    </Button>
  )
}

export default GoogleAuth
