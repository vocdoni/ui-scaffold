import { Button, Flex, Icon, useToast } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { errorToString, useClient } from '@vocdoni/react-providers'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { signinUrlParams, useFaucet } from './use-faucet'

type ClaimProps = {
  signinUrlParams?: signinUrlParams[]
}

export const Claim = (props: ClaimProps) => {
  const { t } = useTranslation()
  const { connected } = useClient()
  const { loading, handleSignIn } = useClaim()

  return (
    <Flex direction='column' gap={3} fontSize='sm'>
      {connected && (
        <Flex direction='row' gap='2'>
          <Button
            type='submit'
            w='full'
            isLoading={loading}
            colorScheme='primary'
            onClick={() => handleSignIn('github', props.signinUrlParams || [])}
          >
            <Icon mr={2} as={FaGithub} />
            {t('login.github')}
          </Button>

          <Button
            type='submit'
            w='full'
            isLoading={loading}
            colorScheme='facebook'
            onClick={() => handleSignIn('facebook', props.signinUrlParams || [])}
          >
            <Icon mr={2} as={FaFacebook} />
            {t('login.facebook')}
          </Button>

          <Button
            type='submit'
            w='full'
            isLoading={loading}
            colorScheme='red'
            onClick={() => handleSignIn('google', props.signinUrlParams || [])}
          >
            <Icon mr={2} as={FaGoogle} />
            {t('login.google')}
          </Button>
        </Flex>
      )}

      {!connected && <ConnectButton chainStatus='none' showBalance={false} label={t('menu.connect').toString()} />}
    </Flex>
  )
}

export const useClaim = () => {
  const { client, account, loading: accoutLoading, loaded: accoutLoaded, fetchAccount } = useClient()

  const toast = useToast()
  const { t } = useTranslation()
  const { oAuthSignInURL, faucetReceipt } = useFaucet()
  const [loading, setLoading] = useState<boolean>(false)
  const [pendingClaim, setPendingClaim] = useState<boolean>(false)

  // Received code from OAuth provider (github, google, etc.)
  useEffect(() => {
    if (!client.wallet) return
    if (accoutLoading.account || pendingClaim) return // If it's loading, we know it's not ready yet
    if (!accoutLoaded.account) return // We need the account to be loaded (final status)
    setPendingClaim(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, accoutLoading])

  useEffect(() => {
    if (!pendingClaim) return
    const url = new URL(window.location.href)
    let state: string | null = url.searchParams.get('state')
    const code: string | null = url.searchParams.get('code')

    state = atob(state || '')
    const stateParams = JSON.parse(state || '[]')
    const provider = stateParams.find((p: any) => p.param === 'provider')?.value
    const recipient = stateParams.find((p: any) => p.param === 'recipient')?.value

    if (!code || !provider || !recipient) return

    // Remove the querystring from the browser current url
    window.history.replaceState({}, '', `${window.location.pathname}${window.location.hash}`)

    claimTokens(provider, code, recipient)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingClaim])

  const handleSignIn = async (provider: string, signinUrlParams: signinUrlParams[]) => {
    setLoading(true)
    try {
      window.location.href = await oAuthSignInURL(provider, signinUrlParams)
    } catch (error) {
      console.error('could not generate OAuth signin URL', error)
    }
    setLoading(false)
  }

  const claimTokens = async (provider: string, code: string, recipient: string) => {
    setLoading(true)
    const tloading = toast({
      title: t('claim.loading_title'),
      description: t('claim.loading_description'),
      status: 'loading',
      duration: null,
    })

    try {
      // get the faucet receipt
      const { faucetPackage } = await faucetReceipt(provider, code, recipient)

      // claim the tokens with the SDK
      if (typeof account !== 'undefined') {
        await client.collectFaucetTokens(faucetPackage)
      } else {
        await client.createAccount({ faucetPackage })
      }

      toast.close(tloading)
      toast({
        title: t('claim.success_title'),
        description: t('claim.success_description'),
        status: 'success',
        duration: 6000,
      })

      // cleanup params from url
      const url = new URL(window.location.href)
      window.history.replaceState({}, '', `/${url.hash}`)

      // and update stored balance
      await fetchAccount()
    } catch (error) {
      toast.close(tloading)
      console.error('could not claim faucet package:', error)
      toast({
        title: t('claim.error_title'),
        description: errorToString(error),
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    }

    setLoading(false)
    setPendingClaim(false)
  }

  return {
    loading,
    handleSignIn,
  }
}
