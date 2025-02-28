import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useElection } from '@vocdoni/react-providers'
import { InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { Trans } from 'react-i18next'
import { CspAuthProvider, useCspAuthContext } from './CSPStepsProvider'
import { Step0Base } from './Step0'
import { Step1Base } from './Step1'

export const CspAuthModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { election } = useElection()
  const { currentStep } = useCspAuthContext()

  if (election instanceof InvalidElection) return null

  return (
    <>
      <Button onClick={onOpen}>Login</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center' pt={0}>
            {currentStep === 0 ? (
              <Trans i18nKey='csp_census.auth.step0.title'>Authentication Step 1</Trans>
            ) : (
              <Trans i18nKey='csp_census.auth.step1.title'>Authentication Step 2</Trans>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {currentStep === 0 ? (
              <Step0Base election={election as PublishedElection} />
            ) : (
              <Step1Base election={election as PublishedElection} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export const CspAuth = () => (
  <CspAuthProvider>
    <CspAuthModal />
  </CspAuthProvider>
)
