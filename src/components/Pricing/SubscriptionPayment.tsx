import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { Stripe } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js/pure'
import { useCallback, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAuth } from '~components/Auth/useAuth'

const STRIPE_PUBLIC_KEY = import.meta.env.STRIPE_PUBLIC_KEY
const BACKEND_URL = import.meta.env.SAAS_URL

export type SubscriptionPaymentData = {
  amount: number
  lookupKey: number
  returnURL?: string
}

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

// type StatusData = {
//   status: string | null
//   customer_email: string | null
//   faucet_package: string | undefined
//   recipient: string | null
//   quantity: number | null
// }

export const SubscriptionPayment = ({ amount, returnURL, lookupKey }: SubscriptionPaymentData) => {
  const { signerAddress } = useAuth()

  const [stripePromise, _] = useState<Promise<Stripe | null>>(loadStripe(STRIPE_PUBLIC_KEY))

  const fetchClientSecret = useCallback(async () => {
    if (signerAddress) {
      let uri = `${BACKEND_URL}/subscriptions/checkout`
      let requestBody = {
        returnURL: returnURL || window.location.href,
        lookupKey,
        amount,
        address: signerAddress,
      }
      // Create a Checkout Session
      return await fetch(uri, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((data) => data.clientSecret)
    }
    return await Promise.resolve('')
  }, [signerAddress])

  const options = { fetchClientSecret, clientSecret: '' }

  return (
    <Box id='checkout' mt={10} mb={24}>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </Box>
  )
}

export const SubscriptionPaymentModal = ({ isOpen, onClose, ...props }: ModalProps & SubscriptionPaymentData) => (
  <Modal isOpen={isOpen} onClose={onClose} variant='payment-modal' size='full'>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <SubscriptionPayment {...props} />
      </ModalBody>

      <ModalFooter>
        <Box>
          <Text>
            <Trans i18nKey='pricing.help'>Need some help?</Trans>
          </Text>
          <Button as={ReactRouterLink}>
            <Trans i18nKey='contact_us'>Contact us</Trans>
          </Button>
        </Box>
      </ModalFooter>
    </ModalContent>
  </Modal>
)
