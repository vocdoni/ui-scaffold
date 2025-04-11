import { Button, Icon, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { googleWallet } from '~constants/rainbow'
import { Routes } from '~routes'
import { useAuth } from './useAuth'

const GoogleAuth = () => {
  const { setBearer, updateSigner } = useAuth()
  const { isConnected } = useAccount()
  const { t } = useTranslation()
  const toast = useToast()
  const navigate = useNavigate()

  const { connector } = googleWallet.createConnector()
  const { connectAsync, isLoading } = useConnect()
  const { disconnect } = useDisconnect()

  const handleLogin = async () => {
    try {
      const result = await connectAsync({ connector })
      if ('newAccount' in result && !result.newAccount) {
        return navigate(Routes.auth.organizationCreate)
      }
    } catch (err) {
      console.error('Google OAuth error', err)
      toast({
        status: 'error',
        title: t('google_oauth_error', { defaultValue: 'Google OAuth Error' }),
        description: t('google_oauth_error_description', {
          defaultValue: 'Google OAuth error, please try again',
        }),
      })
      disconnect()
    }
  }

  // Connects the signer when the user is connected
  // This could be moved to the handleLogin method if we refactor the rainbowkit
  // wallets to return this info rather than storing it to local storage
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
      onClick={handleLogin}
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
