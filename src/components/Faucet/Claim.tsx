import {
  Button,
  Collapse,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Icon,
  Input,
  Text,
  Textarea,
  Tooltip,
  useClipboard,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { errorToString, useClient } from '@vocdoni/react-providers'
import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { useAccount } from 'wagmi'
import { signinUrlParams, useFaucet } from './use-faucet'

type ClaimProps = {
  signinUrlParams?: signinUrlParams[]
}

export const Claim = (props: ClaimProps) => {
  const { t } = useTranslation()
  const { account, client, connected } = useClient()
  const { address } = useAccount()
  const { loading, handleSignIn, faucetPackage, isValidAddress } = useClaim()
  const { onCopy, hasCopied } = useClipboard(faucetPackage)
  const { isOpen, onToggle } = useDisclosure()

  const [recipientAddress, setRecipientAddress] = useState<string>('')

  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    setRecipientAddress(address as string)
  }, [address])

  const auth = useCallback(
    (provider: string) => {
      const additionalParams = props.signinUrlParams || []
      handleSignIn(provider, recipientAddress, [{ param: 'connected', value: connected }, ...additionalParams])
    },
    [recipientAddress, connected]
  )

  return (
    <Flex direction='column' gap={3} fontSize='sm'>
      {!connected && (
        <>
          <Text>
            <Trans i18nKey='faucet.connect' />
          </Text>
          <Flex as='form' direction='row' gap='2'>
            <ConnectButton chainStatus='none' showBalance={false} label={t('menu.connect').toString()} />
            <Button variant='link' ml={4} size='xs' onClick={onToggle}>
              <Trans i18nKey='faucet.advanced_settings' />
            </Button>
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <FormControl isInvalid={!!errors.address}>
              <Input
                type='text'
                {...register('address', {
                  validate: async (val: string) => {
                    if (val) {
                      if (await isValidAddress(val)) {
                        setRecipientAddress(val)
                        return true
                      } else {
                        setRecipientAddress('')
                        return t('form.error.recipient_address_invalid')
                      }
                    }
                  },
                })}
                placeholder={'0x...'}
              />
              {!errors.address ? (
                <FormHelperText>{t('faucet.recipient_address')}</FormHelperText>
              ) : (
                <FormErrorMessage>{t('form.error.recipient_address_invalid')}</FormErrorMessage>
              )}
            </FormControl>
          </Collapse>
        </>
      )}

      {recipientAddress && (
        <>
          <Trans
            i18nKey='faucet.request_description'
            components={{
              span: <Text as='span' />,
            }}
            values={{ balance: account?.balance }}
          />
          <Flex direction='row' gap='2'>
            <Button type='submit' w='full' isLoading={loading} colorScheme='primary' onClick={() => auth('github')}>
              <Icon mr={2} as={FaGithub} />
              {t('login.github')}
            </Button>

            <Tooltip label={t('get_voc_tokens.coming_soon')}>
              <Button
                type='submit'
                w='full'
                isLoading={loading}
                colorScheme='facebook'
                onClick={() => auth('facebook')}
              >
                <Icon mr={2} as={FaFacebook} />
                {t('login.facebook')}
              </Button>
            </Tooltip>

            <Tooltip label={t('get_voc_tokens.coming_soon')}>
              <Button type='submit' w='full' isLoading={loading} colorScheme='red' onClick={() => auth('google')}>
                <Icon mr={2} as={FaGoogle} />
                {t('login.google')}
              </Button>
            </Tooltip>
          </Flex>
        </>
      )}

      {!connected && faucetPackage && (
        <Flex direction='column'>
          <Text>
            <Trans i18nKey='faucet.faucetPackage_success' />
          </Text>
          <Textarea mt={2} value={faucetPackage} readOnly />
          <Button onClick={onCopy}>
            {hasCopied ? t('faucet.copy_faucetPackage_done') : t('faucet.copy_faucetPackage')}
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export type HandleSignInFunction = (
  provider: string,
  recipient: string,
  signinUrlParams: signinUrlParams[]
) => Promise<void>

export type IsValidAddressFunction = (address: string) => Promise<boolean>

export const useClaim = () => {
  const { client, loading: accoutLoading, loaded: accoutLoaded, fetchAccount } = useClient()

  const toast = useToast()
  const { t } = useTranslation()
  const { oAuthSignInURL, faucetReceipt } = useFaucet()
  const [loading, setLoading] = useState<boolean>(false)
  const [pendingClaim, setPendingClaim] = useState<boolean>(true)
  const [faucetPackage, setFaucetPackage] = useState('')
  const [oauthStateParams, setOauthStateParams] = useState<{
    code: string
    provider: string
    recipient: string
    connected: boolean
  }>()

  // Received code from OAuth provider (github, google, etc.)
  useEffect(() => {
    const url = new URL(window.location.href)
    let state: string | null = url.searchParams.get('state')
    const code: string | null = url.searchParams.get('code')

    state = atob(state || '')
    const stateParams = JSON.parse(state || '[]')
    const provider = stateParams.find((p: any) => p.param === 'provider')?.value
    const recipient = stateParams.find((p: any) => p.param === 'recipient')?.value
    const connected = stateParams.find((p: any) => p.param === 'connected')?.value

    if (!code || !provider || !recipient) return

    setOauthStateParams({ code, provider, recipient, connected })

    // Remove the querystring from the browser current url
    window.history.replaceState({}, '', `${window.location.pathname}`)
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!pendingClaim) return
      if (oauthStateParams?.connected === undefined) return

      if (oauthStateParams.connected) {
        if (!client.wallet) return
        if (accoutLoading.account) return // If it's loading, we know it's not ready yet
        if (!accoutLoaded.account) return // We need the account to be loaded (final status)
      }

      claimTokens(
        oauthStateParams.connected,
        oauthStateParams.provider,
        oauthStateParams.code,
        oauthStateParams.recipient
      )
    })()
  }, [oauthStateParams?.connected, client.wallet, accoutLoading])

  const handleSignIn: HandleSignInFunction = async (provider, recipient, signinUrlParams) => {
    setLoading(true)
    try {
      window.location.href = await oAuthSignInURL(provider, recipient, signinUrlParams)
    } catch (error) {}
    setLoading(false)
  }

  const isValidAddress: IsValidAddressFunction = async (address: string) => {
    if (!ethers.utils.isAddress(address)) return false

    try {
      return !!(await client.accountService.fetchAccountInfo(address))
    } catch (error) {
      return false
    }
  }

  const claimTokens = async (collectFaucetTokens: boolean, provider: string, code: string, recipient: string) => {
    setPendingClaim(false)
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

      let successMsgTitle = t('claim.success_faucetPackage_title')
      if (collectFaucetTokens) {
        let validRecipientAccount = await isValidAddress(recipient)
        // claim the tokens with the SDK
        if (validRecipientAccount) {
          await client.collectFaucetTokens(faucetPackage)
        } else {
          await client.createAccount({ faucetPackage })
        }

        // and update stored balance
        await fetchAccount()
        successMsgTitle = t('claim.success_title')
      } else {
        setFaucetPackage(faucetPackage)
      }

      toast.close(tloading)
      toast({
        title: successMsgTitle,
        description: t('claim.success_description'),
        status: 'success',
        duration: 6000,
      })
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
    faucetPackage,
    isValidAddress,
  }
}
