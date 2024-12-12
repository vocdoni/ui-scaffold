import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { PlanUpgrade, PlanUpgradeData } from './PlanUpgrade'
import { TierUpgrade, TierUpgradeData } from './TierUpgrade'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const TierUpgradeModal = ({ isOpen, onClose }: ModalProps & TierUpgradeData) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <TierUpgrade />
      </ModalBody>
    </ModalContent>
  </Modal>
)

export const PlanUpgradeModal = ({ isOpen, onClose, ...props }: ModalProps & PlanUpgradeData) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <PlanUpgrade {...props} />
      </ModalBody>
    </ModalContent>
  </Modal>
)
