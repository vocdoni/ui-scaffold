import { Box, Button, Flex, Link, Spinner, Text, useToast } from '@chakra-ui/react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { errorToString, useClient } from '@vocdoni/react-providers'
import { useCallback, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { useAccount } from 'wagmi'

const STRIPE_PUBLIC_KEY = import.meta.env.STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

type CheckoutFormProps = {
  amount?: string
  returnURL?: string
}

type StatusData = {
  status: string | null
  customer_email: string | null
  faucet_package: string | undefined
  recipient: string | null
  quantity: number | null
}

export const CheckoutForm = ({ amount, returnURL }: CheckoutFormProps) => {
  const { address } = useAccount()
  const { client } = useClient()
  const origin = window.location.origin

  const fetchClientSecret = useCallback(async () => {
    if (address) {
      let uri = `${client.faucetService.url}/createCheckoutSession/${address}`
      if (amount && !isNaN(parseInt(amount))) {
        uri = `${uri}/${amount}`
      }
      // Create a Checkout Session
      return await fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
          returnURL: returnURL || `${origin}/stripe/return`,
          referral: origin,
        }),
      })
        .then((res) => res.json())
        .then((data) => data.clientSecret)
    }
    return await Promise.resolve('')
  }, [address])

  const options = { fetchClientSecret, clientSecret: '' }

  return (
    <Box id='checkout' mt={10} mb={24}>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </Box>
  )
}

type CheckoutReturnProps = {
  sessionId: string
}

export const CheckoutReturn = ({ sessionId }: CheckoutReturnProps) => {
  const { t } = useTranslation()
  const { client, loaded: accountLoaded, account, fetchAccount } = useClient()
  const toast = useToast()
  const [status, setStatus] = useState<string | null>(null)
  const [customerEmail, setCustomerEmail] = useState<string | null>('')
  const [faucetPackage, setFaucetPackage] = useState<string | undefined>('')
  const [recipient, setRecipient] = useState<string | null>('')
  const [packageConsumed, setPackageConsumed] = useState(false)
  const [abortedSignature, setAbortedSignature] = useState(false)
  const [aborted, setAborted] = useState(false)
  const [error, setError] = useState(false)

  // fetch the session status
  useEffect(() => {
    if (!accountLoaded.account) return
    ;(async () => {
      const res = await fetch(`${client.faucetService.url}/sessionStatus/${sessionId}`)
      const data = await res.json()

      if (data.faucet_package !== null) {
        setStatus(data.status)
        setCustomerEmail(data.customer_email)
        setFaucetPackage(data.faucet_package)
        setRecipient(data.recipient)
        return null
      }
      setError(true)
    })()
  }, [accountLoaded.account])

  // claim the tokens if the package is not consumed
  useEffect(() => {
    if (
      !faucetPackage ||
      !recipient ||
      !accountLoaded ||
      packageConsumed ||
      `0x${account?.address}` !== recipient.toLowerCase()
    ) {
      return
    }
    claimTokens()
  }, [faucetPackage, recipient, accountLoaded])

  const claimTokens = async () => {
    toast.closeAll()

    try {
      setAborted(false)
      // get the faucet receipt
      let successMsgTitle = t('claim.success_faucetPackage_title')

      toast({
        title: t('claim.toast.loading_title'),
        description: t('claim.toast.loading_description'),
        status: 'loading',
        duration: null,
      })
      // claim the tokens with the SDK
      await client.collectFaucetTokens(faucetPackage)

      toast.closeAll()

      setPackageConsumed(true)
      // and update stored balance
      await fetchAccount()

      successMsgTitle = t('claim.toast.success_title')

      toast.closeAll()
      toast({
        title: successMsgTitle,
        description: t('claim.toast.success_description'),
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      toast.closeAll()
      console.error('could not claim faucet package:', error)
      toast({
        title: t('claim.toast.error_title'),
        description: errorToString(error),
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      setAborted(true)
    }
  }

  useEffect(() => {
    if (!abortedSignature) return

    const navigateTimeout = setTimeout(() => {
      navigate('/calculator')
    }, 5000)

    return () => {
      clearTimeout(navigateTimeout)
    }
  }, [abortedSignature])

  if (status === 'open') {
    return <Navigate to='/checkout' />
  }

  if (aborted) {
    return (
      <Box as='section' id='success' className='site-wrapper' mt={10} textAlign='center'>
        <Text>
          <Trans
            i18nKey='claim.signature_aborted'
            components={{
              p: <Text mb={5} />,
              strong: <Text fontWeight='bold' />,
            }}
          />
        </Text>
        <Flex justifyContent='center' gap={5} mt={10}>
          <Button onClick={async () => claimTokens()}>{t('claim.signature_aborted_sign')}</Button>
        </Flex>
      </Box>
    )
  }

  if (!packageConsumed && !faucetPackage) {
    return (
      <Box as='section' id='success' className='site-wrapper' textAlign='center' mt={10}>
        <Spinner color='spinner' mb={5} />
        <Box w='fit-content' mx='auto'>
          <Trans
            i18nKey='claim.loading_description'
            components={{
              h3: <Text as='h3' fontSize='md' fontWeight='bold' />,
              p: <Text mb={5} />,
              strong: <Text fontWeight='bold' />,
              line: <Box h='1px' backgroundColor='black' my={10} />,
            }}
          />
        </Box>
      </Box>
    )
  }

  if (packageConsumed) {
    return (
      <Box as='section' id='success' className='site-wrapper' mt={10} textAlign='center'>
        <Trans
          i18nKey='claim.purchase_success'
          components={{
            mailto: <Link href='mailto:orders@vocdoni.org' />,
            title: <Text fontSize='xl' mb={5}></Text>,
            p: <Text mb={5}></Text>,
          }}
          values={{
            customerEmail: customerEmail,
          }}
        />
      </Box>
    )
  }

  return null
}
