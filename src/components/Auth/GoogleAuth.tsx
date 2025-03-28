import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { useAuth } from './useAuth'

const GoogleAuth = () => {
  const { t } = useTranslation()
  const { setBearer, updateSigner } = useAuth()
  const { isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) {
      const t = localStorage.getItem('authToken')
      setBearer(t)
      updateSigner(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected])

  return (
    // <Button
    //   fontSize='sm'
    //   bg={'google.bg.light'}
    //   isDisabled
    //   fontWeight='500'
    //   _hover={'google.hover.light'}
    //   _active={'google.active.light'}
    //   _focus={'google.active.light'}
    //   _dark={{
    //     bg: 'google.bg.dark',

    //     _hover: {
    //       bg: 'google.hover.dark',
    //     },
    //     _active: {
    //       bg: 'google.hover.dark',
    //     },
    //   }}
    // >
    //   <Icon as={FcGoogle} w={5} h={5} me={2} />

    //   {t('signin_google')}
    // </Button>
    <ConnectButton chainStatus='none' label='google'></ConnectButton>
  )
}

export default GoogleAuth
