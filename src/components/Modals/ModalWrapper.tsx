import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const ModalWrapper = ({ isOpen, onClose, children }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent py={12}>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
    </ModalContent>
  </Modal>
)

export default ModalWrapper
