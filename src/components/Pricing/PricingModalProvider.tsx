import { useDisclosure } from '@chakra-ui/hooks'
import React, { ReactNode, useState } from 'react'
import { PlanUpgradeModal, TierUpgradeModal } from './Modals'
import { SubscriptionModal } from './Plans'
import { PlanUpgradeData } from './PlanUpgrade'
import { TierUpgradeData } from './TierUpgrade'
import { PricingModalProviderContext, PricingModalType } from './use-pricing-modal'
import { SubscriptionPaymentData } from './SubscriptionPayment'
import { SubscriptionPaymentModal } from './SubscriptionPayment'

type ModalData = PlanUpgradeData | TierUpgradeData | SubscriptionPaymentData | null

export const PricingModalProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalType, setModalType] = useState<PricingModalType>(null)
  const [modalData, setModalData] = useState<ModalData>(null)

  const openModal = (type: PricingModalType, data?: ModalData) => {
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
      {modalType === 'tierUpgrade' && isOpen && (
        <TierUpgradeModal isOpen onClose={closeModal} {...(modalData as TierUpgradeData)} />
      )}
      {modalType === 'planUpgrade' && isOpen && (
        <PlanUpgradeModal isOpen onClose={closeModal} {...(modalData as PlanUpgradeData)} />
      )}
      {modalType === 'subscription' && isOpen && <SubscriptionModal isOpen onClose={closeModal} />}
      {modalType === 'planUpgrade' && isOpen && (
        <PlanUpgradeModal isOpen onClose={closeModal} {...(modalData as PlanUpgradeData)} />
      )}
      {modalType === 'planUpgrade' && isOpen && (
        <PlanUpgradeModal isOpen onClose={closeModal} {...(modalData as PlanUpgradeData)} />
      )}
      {modalType === 'subscriptionPayment' && isOpen && (
        <SubscriptionPaymentModal isOpen onClose={closeModal} {...(modalData as SubscriptionPaymentData)} />
      )}
    </PricingModalProviderContext>
  )
}
