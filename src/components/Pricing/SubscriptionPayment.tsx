import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { Stripe } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js/pure'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { Trans } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { ApiEndpoints } from '~components/Auth/api'
import { useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { Routes } from '~src/router/routes'

const stripePublicKey = import.meta.env.STRIPE_PUBLIC_KEY

export type SubscriptionPaymentData = {
  amount: number
  lookupKey: number
  closeModal: () => void
}

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

type CheckoutResponse = {
  clientSecret: string
  sessionID: string
}

export const SubscriptionPayment = ({ amount, lookupKey, closeModal }: SubscriptionPaymentData) => {
  const { signerAddress, bearedFetch } = useAuth()
  const { subscription } = useSubscription()

  const [stripePromise, _] = useState<Promise<Stripe | null>>(loadStripe(stripePublicKey))
  const [subscriptionCompleted, setSubscriptionCompleted] = useState<boolean>(false)
  // store previous plan and tier to check if the subscription was updated
  const [prevPlan] = useState<number>(subscription.plan.id)
  const [prevTier] = useState<number>(subscription.subscriptionDetails.maxCensusSize)
  const [prevDate] = useState<string>(subscription.subscriptionDetails.renewalDate)

  const queryClient = useQueryClient()

  const fetchClientSecret = useCallback(async () => {
    if (signerAddress) {
      const body = {
        lookupKey,
        amount,
        address: signerAddress,
      }
      // Create a Checkout Session
      return await bearedFetch<CheckoutResponse>(ApiEndpoints.SubscriptionCheckout, {
        method: 'POST',
        body,
      })
        // Return the client secret, required by stripe.js
        .then((data) => data.clientSecret)
    }
    return await Promise.resolve('')
  }, [signerAddress])

  const onComplete = async () => {
    while (
      prevPlan === subscription.plan.id &&
      prevTier === subscription.subscriptionDetails.maxCensusSize &&
      prevDate === subscription.subscriptionDetails.renewalDate
    ) {
      await queryClient.invalidateQueries({ queryKey: ['organizationSubscription'] })
      await new Promise((resolve) => {
        return setTimeout(resolve, 200)
      })
    }
    setSubscriptionCompleted(true)
  }

  const options = { fetchClientSecret, clientSecret: '', onComplete }

  return (
    <Box id='checkout' mt={10} mb={24}>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
      <Button onClick={() => closeModal()} type='submit' isDisabled={!subscriptionCompleted}>
        <Trans i18nKey='close'>Close</Trans>
      </Button>
    </Box>
  )
}

export const SubscriptionPaymentModal = ({ isOpen, onClose, ...props }: ModalProps & SubscriptionPaymentData) => {
  return (
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
            <Button as={ReactRouterLink} to={Routes.contact}>
              <Trans i18nKey='contact_us'>Contact us</Trans>
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
