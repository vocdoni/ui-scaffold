import { createContext } from '@chakra-ui/react-utils'
import { SubscriptionCheckoutFormValues } from './Plans'

export type CheckoutView = 'plans' | 'checkout'

export type SubscriptionCheckoutContextState = {
  view: CheckoutView
  checkout: SubscriptionCheckoutFormValues | undefined
  showCheckout: (checkout: SubscriptionCheckoutFormValues) => void
  showPlans: () => void
}

const [SubscriptionCheckoutProviderContext, useSubscriptionCheckout] = createContext<SubscriptionCheckoutContextState>({
  name: 'SubscriptionCheckoutProvider',
  errorMessage: 'useSubscriptionCheckout must be used within a SubscriptionCheckoutProvider',
  strict: false,
})

export { SubscriptionCheckoutProviderContext, useSubscriptionCheckout }
