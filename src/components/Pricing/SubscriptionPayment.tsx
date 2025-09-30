import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useToast } from '@chakra-ui/react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAnalytics } from '~components/AnalyticsProvider'
import { ApiEndpoints } from '~components/Auth/api'
import { SubscriptionType, useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { QueryKeys } from '~src/queries/keys'
import { AnalyticsEvent } from '~utils/analytics'
import { usePricingModal } from './use-pricing-modal'

const stripePublicKey = import.meta.env.STRIPE_PUBLIC_KEY

export type SubscriptionPaymentData = {
  lookupKey: number
}

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

type CheckoutResponse = {
  clientSecret: string
  sessionId: string
}

const useUpdateSubscription = () => {
  const { bearedFetch } = useAuth()
  const { account } = useClient()

  return useMutation<SubscriptionType>({
    mutationFn: async () =>
      await bearedFetch(ApiEndpoints.OrganizationSubscription.replace('{address}', ensure0x(account?.address))),
  })
}

export const SubscriptionPayment = ({ lookupKey }: SubscriptionPaymentData) => {
  const { bearedFetch } = useAuth()
  const { signer } = useClient()
  const { t, i18n } = useTranslation()
  const { subscription } = useSubscription()
  const { mutateAsync: checkSubscription } = useUpdateSubscription()
  const { closeModal } = usePricingModal()
  const toast = useToast()
  const { trackPlausibleEvent } = useAnalytics()

  const [stripePromise] = useState<Promise<Stripe | null>>(
    loadStripe(stripePublicKey, {
      locale: i18n.resolvedLanguage as any,
    })
  )
  const queryClient = useQueryClient()

  const fetchClientSecret = useCallback(async () => {
    const signerAddress = await signer.getAddress()
    if (signerAddress) {
      const body = {
        lookupKey,
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
            title: t('pricing.error'),
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
      nsub.subscriptionDetails.renewalDate === subscription.subscriptionDetails.renewalDate
    ) {
      await new Promise((resolve) => {
        return setTimeout(resolve, 200)
      })
      nsub = await checkSubscription()
    }
    await queryClient.invalidateQueries({ queryKey: QueryKeys.organization.subscription() })
    trackPlausibleEvent({
      name: AnalyticsEvent.SubscriptionSuccessful,
    })
  }

  const options = {
    fetchClientSecret,
    clientSecret: '',
    onComplete,
  }

  return (
    <Box id='checkout' mt={{ base: '24rem', sm: '15rem', lg: '5rem', xl: 0 }}>
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
    </ModalContent>
  </Modal>
)
