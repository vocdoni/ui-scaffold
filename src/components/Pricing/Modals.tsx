import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Routes } from '~routes'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export type PlanUpgradeData = {
  memberLimit: string
}

export const PlanUpgradeModal = ({ isOpen, onClose, ...props }: ModalProps & PlanUpgradeData) => {
  const { memberLimit } = props

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='md'>
      <ModalOverlay />
      <ModalContent p={5}>
        <ModalCloseButton />
        <ModalHeader p={0}>
          <Flex flexDirection='column' gap={3}>
            <Heading size='sm'>
              <Trans i18nKey='plan_upgrade.title'>Upgrade to add more team members</Trans>
            </Heading>
            <Box fontSize='sm' color='texts.subtle'>
              <Trans i18nKey='plan_upgrade.subtitle' values={{ memberLimit }}>
                Your current plan allows only {memberLimit} for collaboration. Upgrade your plan to add more team
                members and unlock advanced features.
              </Trans>
            </Box>
          </Flex>
        </ModalHeader>
        <ModalBody p={0}>
          <Flex justifyContent='flex-end' mt={4} gap={2}>
            <Button variant='outline' onClick={onClose}>
              <Trans i18nKey='plan_upgrade.cancel'>Cancel</Trans>
            </Button>
            <Button variant='primary' as={Link} to={Routes.dashboard.settings.subscription} onClick={onClose}>
              <Trans i18nKey='plan_upgrade.see_plans'>See plans</Trans>
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
