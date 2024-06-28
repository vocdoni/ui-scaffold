import { useCallback, useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import { Navigate } from 'react-router-dom'
import { useClient, errorToString } from '@vocdoni/react-providers'
import { useAccount } from 'wagmi'
import { useParams } from 'react-router-dom'
import { t } from 'i18next'
import { Spinner, useToast } from '@chakra-ui/react'

const STRIPE_PUBLIC_KEY = import.meta.env.STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

type CheckoutFormProps = {
  amount?: string
}

export const CheckoutForm = ({ amount }: CheckoutFormProps) => {
  const { address } = useAccount()
  const { client } = useClient()

  const domain = new URL(window.location.href).hostname
  const fetchClientSecret = useCallback(async () => {
    if (address) {
      let uri = `${client.faucetService.url}/createCheckoutSession/${domain}/${address}`
      if (amount && !isNaN(parseInt(amount))) {
        uri = `${uri}/${amount}`
      }
      // Create a Checkout Session
      return await fetch(uri, {
        method: 'POST',
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
  const { client, loaded: accountLoaded, account, fetchAccount } = useClient()
  const toast = useToast()
  const [status, setStatus] = useState(null)
  const [customerEmail, setCustomerEmail] = useState('')
  const [faucetPackage, setFaucetPackage] = useState('')
  const [recipient, setRecipient] = useState('')
  const [packageConsumed, setPackageConsumed] = useState(false)

  // fetch the session status
  useEffect(() => {
    async function getStatus() {
      const res = await fetch(`${client.faucetService.url}/sessionStatus/${sessionId}`)
      const data = await res.json()
      if (data.faucet_package !== null) {
        return data
      }
      if (faucetPackage == null) {
        return await getStatus()
      }
      return null
    }
    getStatus()
      .then((data) => {
        setStatus(data.status)
        setCustomerEmail(data.customer_email)
        setFaucetPackage(data.faucet_package)
        setRecipient(data.recipient)
      })
  }, [sessionId])

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
    }
  }

  if (status === 'open') {
    return <Navigate to='/checkout' />
  }

  if (status === 'complete' && packageConsumed == false && faucetPackage == null) {
    return (
      <div>
        <section id='success'>
          <p>
            <Spinner />
            {t('claim.success_title')}
          </p>
        </section>
      </div>
    )
  }

  if (status === 'complete' && packageConsumed == true) {
    return (
      <div>
        <section id='success'>
          <p>
            We appreciate your business! A confirmation email will be sent to {customerEmail}. If you have any
            questions, please email <a href='mailto:orders@vocdoni.org'>orders@vocdoni.org</a>.
          </p>
        </section>
      </div>
    )
  }

  return null
}
