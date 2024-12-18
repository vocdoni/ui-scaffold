import { createContext } from '@chakra-ui/react-utils'
import type { SubscriptionPaymentData } from './SubscriptionPayment'
import type { SubscriptionReturnData } from './SubscriptionReturn'

// Define types for the context

export type PaymentModalContextState = {
  modalData: any
}

const [PaymentProviderContext, usePaymentModal] = createContext<PaymentModalContextState>({
  name: 'PaymentModalProvider',
  errorMessage: 'usePaymentModal must be used within a PaymentModalProvider',
  strict: true,
})

export { PaymentProviderContext, usePaymentModal }
