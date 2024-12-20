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
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ensure0x } from '@vocdoni/sdk'
import { useCallback, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { ApiEndpoints } from '~components/Auth/api'
import { SubscriptionType, useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { Routes } from '~src/router/routes'
import { usePricingModal } from './use-pricing-modal'

const stripePublicKey = import.meta.env.STRIPE_PUBLIC_KEY

export type SubscriptionPaymentData = {
  amount: number
  lookupKey: number
}

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

type CheckoutResponse = {
  clientSecret: string
  sessionID: string
}

const useUpdateSubscription = () => {
  const { bearedFetch, signerAddress } = useAuth()

  return useMutation<SubscriptionType>({
    mutationFn: async () =>
      await bearedFetch(ApiEndpoints.OrganizationSubscription.replace('{address}', ensure0x(signerAddress))),
  })
}

export const SubscriptionPayment = ({ amount, lookupKey }: SubscriptionPaymentData) => {
  const { signerAddress, bearedFetch } = useAuth()
  const { i18n } = useTranslation()
  const { subscription } = useSubscription()
  const { mutateAsync: checkSubscription } = useUpdateSubscription()
  const { closeModal } = usePricingModal()

  const [stripePromise] = useState<Promise<Stripe | null>>(
    loadStripe(stripePublicKey, {
      locale: i18n.resolvedLanguage as any,
    })
  )
  const [subscriptionCompleted, setSubscriptionCompleted] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const fetchClientSecret = useCallback(async () => {
    if (signerAddress) {
      const body = {
        lookupKey,
        amount,
        address: signerAddress,
        locale: i18n.resolvedLanguage,
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
    let nsub = await checkSubscription()
    while (
      nsub.plan.id === subscription.plan.id &&
      nsub.subscriptionDetails.maxCensusSize === subscription.subscriptionDetails.maxCensusSize &&
      nsub.subscriptionDetails.renewalDate === subscription.subscriptionDetails.renewalDate
    ) {
      await new Promise((resolve) => {
        return setTimeout(resolve, 200)
      })
      nsub = await checkSubscription()
    }
    setSubscriptionCompleted(true)
    await queryClient.invalidateQueries({ queryKey: ['organizationSubscription'] })
  }

  const options = {
    fetchClientSecret,
    clientSecret: '',
    onComplete,
  }

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
