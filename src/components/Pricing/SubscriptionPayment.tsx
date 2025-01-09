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
  useToast,
} from '@chakra-ui/react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { useCallback, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { ApiEndpoints } from '~components/Auth/api'
import { SubscriptionType, useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { QueryKeys } from '~src/queries/keys'
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
  const { bearedFetch } = useAuth()
  const { account } = useClient()

  return useMutation<SubscriptionType>({
    mutationFn: async () =>
      await bearedFetch(ApiEndpoints.OrganizationSubscription.replace('{address}', ensure0x(account?.address))),
  })
}

export const SubscriptionPayment = ({ amount, lookupKey }: SubscriptionPaymentData) => {
  const { bearedFetch } = useAuth()
  const { signer } = useClient()
  const { i18n } = useTranslation()
  const { subscription } = useSubscription()
  const { mutateAsync: checkSubscription } = useUpdateSubscription()
  const { closeModal } = usePricingModal()
  const toast = useToast()

  const [stripePromise] = useState<Promise<Stripe | null>>(
    loadStripe(stripePublicKey, {
      locale: i18n.resolvedLanguage as any,
    })
  )
  const [subscriptionCompleted, setSubscriptionCompleted] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const fetchClientSecret = useCallback(async () => {
    const signerAddress = await signer.getAddress()
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
        .catch((e) => {
          toast({
            status: 'error',
            title: i18n.t('pricing.error'),
            description: e.message,
          })
          closeModal()

          return null
        })
    }
    return await Promise.resolve('')
  }, [signer])

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
    await queryClient.invalidateQueries({ queryKey: QueryKeys.organization.subscription() })
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
