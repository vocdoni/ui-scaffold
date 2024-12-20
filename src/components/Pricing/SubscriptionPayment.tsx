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
import { useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { Routes } from '~src/router/routes'

const STRIPE_PUBLIC_KEY = import.meta.env.STRIPE_PUBLIC_KEY
const BACKEND_URL = import.meta.env.SAAS_URL

export type SubscriptionPaymentData = {
  amount: number
  lookupKey: number
  closeModal: () => void
}

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const SubscriptionPayment = ({ amount, lookupKey, closeModal }: SubscriptionPaymentData) => {
  const { signerAddress } = useAuth()
  const { subscription } = useSubscription()

  const [stripePromise, _] = useState<Promise<Stripe | null>>(loadStripe(STRIPE_PUBLIC_KEY))
  const [sessionID, setSessionID] = useState<string | null>(null)
  const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false)
  const [subscriptionCompleted, setSubscriptionCompleted] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const fetchClientSecret = useCallback(async () => {
    if (signerAddress) {
      let uri = `${BACKEND_URL}/subscriptions/checkout`
      let requestBody = {
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
        .then((data) => {
          setSessionID(data.sessionID)
          return data.clientSecret
        })
    }
    return await Promise.resolve('')
  }, [signerAddress])

  const onComplete = async () => {
    setPaymentCompleted(true)
    while (!subscription.subscriptionDetails.active) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await queryClient.invalidateQueries({ queryKey: ['organizationSubscription'] })
    }
    setSubscriptionCompleted(true)
    // let qc = queryClient.getQueryCache()
    // let query = qc.find(['organizationSubscription'] as any)
    // if (query) {
    //   const queryOpts = query.options
    //   const newQueryOpts = queryOptions({
    //     queryKey: queryOpts.queryKey,
    //     queryFn: queryOpts.queryFn,
    //     refetchInterval: (qu) => {
    //       if (qu.state.data['subscriptionDetails']['active']) {
    //         query.setOptions(queryOpts)
    //         queryClient.invalidateQueries({ queryKey: ['organizationSubscription'] })
    //       } else {
    //         return 1000
    //       }
    //     },
    //   })
    //   query.setOptions(newQueryOpts)
    //   queryClient.invalidateQueries({ queryKey: ['organizationSubscription'] })
    // }
  }

  const options = { fetchClientSecret, clientSecret: '', onComplete }

  return (
    <Box id='checkout' mt={10} mb={24}>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
      <Button onClick={() => closeModal()} type='submit' isDisabled={!subscriptionCompleted}>
        <Trans i18nKey='pricing.close'>Close</Trans>
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
