import { createContext } from '@chakra-ui/react-utils'

export type CheckoutView = 'plans' | 'checkout'

export type SubscriptionCheckoutContextState = {
  view: CheckoutView
  selectedPlanId: number | null
  showCheckout: (planId: number) => void
  showPlans: () => void
}

const [SubscriptionCheckoutProviderContext, useSubscriptionCheckout] = createContext<SubscriptionCheckoutContextState>({
  name: 'SubscriptionCheckoutProvider',
  errorMessage: 'useSubscriptionCheckout must be used within a SubscriptionCheckoutProvider',
  strict: true,
})

export { SubscriptionCheckoutProviderContext, useSubscriptionCheckout }
