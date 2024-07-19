import { Box, Button, Flex, Link, Spinner, Text, useToast } from '@chakra-ui/react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { errorToString, useClient } from '@vocdoni/react-providers'
import { useCallback, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from 'react-router-dom'
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
    <div id='checkout'>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

type CheckoutReturnProps = {
  sessionId: string
}

export const CheckoutReturn = ({ sessionId }: CheckoutReturnProps) => {
  const navigate = useNavigate()
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

  console.log('CheckoutReturn')

  // fetch the session status
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getStatus = async (): Promise<StatusData | null> => {
      const res = await fetch(`${client.faucetService.url}/sessionStatus/${sessionId}`, { signal })
      const data = await res.json()

      if (data.faucet_package !== null) {
        return data
      }
      if (!faucetPackage) {
        return await getStatus()
      }
      return null
    }
    getStatus().then((data) => {
      if (!data) return
      setStatus(data.status)
      setCustomerEmail(data.customer_email)
      setFaucetPackage(data.faucet_package)
      setRecipient(data.recipient)
    })

    return () => {
      abortController.abort()
    }
  }, [])

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
    const tloading = toast({
      title: t('claim.loading_title'),
      description: t('claim.loading_description'),
      status: 'loading',
      duration: null,
    })

    try {
      // get the faucet receipt
      let successMsgTitle = t('claim.success_faucetPackage_title')
      // claim the tokens with the SDK
      await client.collectFaucetTokens(faucetPackage)
      setPackageConsumed(true)
      // and update stored balance
      await fetchAccount()
      successMsgTitle = t('claim.success_title')

      toast.close(tloading)
      toast({
        title: successMsgTitle,
        description: t('claim.success_description'),
        status: 'success',
        duration: 3000,
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
        <Text>Has abortat l'operaciò</Text>
        <Flex justifyContent='center' gap={5} mt={10}>
          <Button>Resignar</Button>
          <Button>Refund</Button>
        </Flex>
      </Box>
    )
  }

  if (!packageConsumed || !faucetPackage) {
    return (
      <Box as='section' id='success' className='site-wrapper' mt={10} textAlign='center'>
        <Spinner color='spinner' />
      </Box>
    )
  }

  if (status === 'complete' && packageConsumed == true) {
    return (
      <Box as='section' id='success' className='site-wrapper' mt={10} textAlign='center'>
        <Trans
          i18nKey='claim.purchase_success'
          components={{
            customLink: <Link href='mailto:orders@vocdoni.org' />,
            title: <Text fontSize='xl' mb={5}></Text>,
            text: <Text mb={5}></Text>,
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
