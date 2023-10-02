import { Button, Flex, Icon, useToast } from '@chakra-ui/react'
import { urlParam } from '@constants'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useClient } from '@vocdoni/react-providers'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaGithub } from 'react-icons/fa'
import { useFaucet } from './use-faucet'

export const Claim = () => {
  const { client, connected, account, loading: accoutLoading, loaded: accoutLoaded } = useClient()

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
    const provider: string | null = urlParam('provider')
    const code: string | null = urlParam('code')
    const recipient: string | null = urlParam('recipient')

    if (!code || !provider || !recipient) return

    claimTokens(provider, code, recipient)
  }, [pendingClaim])

  const handleSignIn = async (provider: string) => {
    setLoading(true)
    try {
      window.location.href = await oAuthSignInURL(provider, [{ param: 'loadDraft', value: 1 }])
    } catch (error) {
      console.error('could not generate OAuth signin URL', error)
    }
    setLoading(false)
  }

  const claimTokens = async (provider: string, code: string, recipient: string) => {
    setLoading(true)
    const loadingToast = toast({
      title: t('form.claim.loading_title'),
      description: t('form.claim.loading_description'),
      status: 'loading',
    })

    try {
      // Get the faucet receipt
      const { faucetPackage } = await faucetReceipt(provider, code, recipient)

      // Claim the tokens with the SDK
      if (typeof account !== 'undefined') {
        await client.collectFaucetTokens(faucetPackage)
      } else {
        await client.createAccount({ faucetPackage })
      }

      toast.close(loadingToast)
      toast({
        title: t('form.claim.success_title'),
        description: t('form.claim.success_description'),
        status: 'success',
        duration: 4000,
      })
    } catch (error) {
      console.error('could not claim faucet package:', error)
      toast.close(loadingToast)
      toast({
        title: t('form.claim.error_title'),
        description: t('form.claim.error_description'),
        status: 'error',
        duration: 4000,
      })
    }

    setLoading(false)
    setPendingClaim(false)
  }

  return (
    <Flex direction='column' gap={3}>
      {connected && (
        <Flex direction='row' gap='2'>
          <Button type='submit' isLoading={loading} colorScheme='purple' onClick={() => handleSignIn('github')}>
            <Icon mr={2} as={FaGithub} />
            {t('login.github')}
          </Button>
        </Flex>
      )}

      {!connected && <ConnectButton chainStatus='none' showBalance={false} label={t('menu.connect').toString()} />}
    </Flex>
  )
}
