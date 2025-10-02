import { createContext } from '@chakra-ui/react-utils'
import { PlanUpgradeData } from './Modals'
import type { SubscriptionPaymentData } from './SubscriptionPayment'

// Define types for the context
export type PricingModalType = 'planUpgrade' | 'subscriptionPayment' | null

export type PricingModalContextState = {
  openModal: (type: PricingModalType, modalData?: PlanUpgradeData | SubscriptionPaymentData | null) => void
  closeModal: () => void
  modalType: PricingModalType
  modalData: any
}

const [PricingModalProviderContext, usePricingModal] = createContext<PricingModalContextState>({
  name: 'PricingModalProvider',
  errorMessage: 'usePricingModal must be used within a PricingModalProvider',
  strict: true,
})

export { PricingModalProviderContext, usePricingModal }
