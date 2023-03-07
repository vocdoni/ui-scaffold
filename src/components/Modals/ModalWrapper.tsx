import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import { PublishedElection } from '@vocdoni/sdk'
import { MODAL_TYPE } from '../../constants/modalType'
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
    closeOnOverlayClick={type !== MODAL_TYPE.LOADING}
  >
    <ModalOverlay />
    <ModalContent py={12}>
      {type !== MODAL_TYPE.LOADING && <ModalCloseButton />}
      <ModalBody>
        {type === MODAL_TYPE.INFO && el && <ModalProcessInfo el={el} />}
        {type === MODAL_TYPE.LOADING && <ModalLoading />}
        {type === MODAL_TYPE.ADD_TOKENS && <ModalAddTokens />}
        {type === MODAL_TYPE.SUCCESS && <ModalSuccess />}
      </ModalBody>
    </ModalContent>
  </Modal>
)

export default ModalWrapper
