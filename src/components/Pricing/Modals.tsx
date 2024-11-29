import { useDisclosure } from '@chakra-ui/hooks'
import { createContext } from '@chakra-ui/react-utils'
import React, { ReactNode, useState } from 'react'
import { SubscriptionModal } from './Plans'
import { PlanUpgradeData, PlanUpgradeModal, TierUpgradeData, TierUpgradeModal } from './Upgrading'

// Define types for the context
type PricingModalType = 'tierUpgrade' | 'planUpgrade' | 'subscription' | null

type PricingModalContextState = {
  openModal: (type: PricingModalType, modalData?: PlanUpgradeData | TierUpgradeData | null) => void
  closeModal: () => void
  modalType: PricingModalType
  modalData: any
}

const [PricingModalProviderContext, usePricingModal] = createContext<PricingModalContextState>({
  name: 'PricingModalProvider',
  errorMessage: 'usePricingModal must be used within a PricingModalProvider',
  strict: true,
})

export const PricingModalProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalType, setModalType] = useState<PricingModalType>(null)
  const [modalData, setModalData] = useState<PlanUpgradeData | null>(null)

  const openModal = (type: PricingModalType, data?: PlanUpgradeData | null) => {
    setModalType(type)
    setModalData(data || null)
    onOpen()
  }

  const closeModal = () => {
    setModalType(null)
    setModalData(null)
    onClose()
  }

  return (
    <PricingModalProviderContext value={{ openModal, closeModal, modalType, modalData }}>
      {children}

      {/* Render modals dynamically based on the modalType */}
      {modalType === 'tierUpgrade' && isOpen && <TierUpgradeModal isOpen onClose={closeModal} {...modalData} />}
      {modalType === 'planUpgrade' && isOpen && <PlanUpgradeModal isOpen onClose={closeModal} {...modalData} />}
      {modalType === 'subscription' && isOpen && <SubscriptionModal isOpen onClose={closeModal} />}
    </PricingModalProviderContext>
  )
}

export { usePricingModal }
