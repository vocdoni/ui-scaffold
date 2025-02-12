import { createContext } from '@chakra-ui/react-utils'
import type { PlanUpgradeData } from './PlanUpgrade'
import type { SubscriptionPaymentData } from './SubscriptionPayment'
import type { TierUpgradeData } from './TierUpgrade'

// Define types for the context
export type PricingModalType = 'tierUpgrade' | 'planUpgrade' | 'subscription' | 'subscriptionPayment' | null

export type PricingModalContextState = {
  openModal: (
    type: PricingModalType,
    modalData?: PlanUpgradeData | TierUpgradeData | SubscriptionPaymentData | null
  ) => void
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
