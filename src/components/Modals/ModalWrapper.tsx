import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react'
import { PublishedElection } from '@vocdoni/sdk'
import { ModalType } from '../../constants'
import ModalAddTokens from './ModalAddTokens'
import ModalLoading from './ModalLoading'
import ModalProcessInfo from './ModalProcessInfo'
import ModalSuccess from './ModalSuccess'

interface Props {
  el?: PublishedElection
  type: number
  isOpen: boolean
  onClose: () => void
}

const ModalWrapper = ({ el, type, isOpen, onClose }: Props) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    closeOnOverlayClick={type !== ModalType.Loading}
  >
    <ModalOverlay />
    <ModalContent py={12}>
      {type !== ModalType.Loading && <ModalCloseButton />}
      <ModalBody>
        {type === ModalType.Info && el && <ModalProcessInfo el={el} />}
        {type === ModalType.Loading && <ModalLoading />}
        {type === ModalType.AddTokens && <ModalAddTokens />}
        {type === ModalType.Success && <ModalSuccess />}
      </ModalBody>
    </ModalContent>
  </Modal>
)

export default ModalWrapper
