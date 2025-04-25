import {
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Spinner,
  Text,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { MdHowToVote } from 'react-icons/md'
import { generatePath, Navigate, Link as ReactRouterLink } from 'react-router-dom'
import { Routes } from '~src/router/routes'
import { useAuth } from '~components/Auth/useAuth'

const BACKEND_URL = import.meta.env.SAAS_URL

export type SubscriptionReturnData = {
  sessionID: string
  backendURL?: string
}

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const SubscriptionReturn = ({ sessionID }: SubscriptionReturnData) => {
  const { t } = useTranslation()
  const { signerAddress } = useAuth()
  const toast = useToast()
  const [status, setStatus] = useState<string | null>(null)
  const [customerEmail, setCustomerEmail] = useState<string | null>('')
  const [subscriptionStatus, setSubscrptionStatus] = useState<string | null>('')
  const [error, setError] = useState(false)

  // fetch the session status
  useEffect(() => {
    if (!signerAddress) return
    ;(async () => {
      let url = `${BACKEND_URL}/subscriptions/checkout/${sessionID}`
      const res = await fetch(url)
      const data = await res.json()

      // data.subscription_status exists in the response iff
      // the response comes from the saas service
      if (data.subscription_status !== null) {
        setStatus(data.status)
        setCustomerEmail(data.customer_email)
        setSubscrptionStatus(data.subscription_status)
      }

      if (data) setError(true)
    })()
  }, [signerAddress])

  // subscription
  if (status === 'success') {
    return (
      <Box as='section' id='success' className='site-wrapper' mt={10} textAlign='center'>
        <Text> Subscription successful</Text>
        <Button as={ReactRouterLink} to={`/organization`} width='min-content' mx='auto'>
          <Icon as={MdHowToVote} boxSize={{ base: 4, sm2: 3 }} />
          <Text as='span' display={{ base: 'none', sm2: 'inline-block' }}>
            {t('menu.my_org')}
          </Text>
        </Button>
      </Box>
    )
  }
  return null
}

export const SubscriptionReturnModal = ({ isOpen, onClose, ...props }: ModalProps & SubscriptionReturnData) => (
  <Modal isOpen={isOpen} onClose={onClose} variant='payment-return-modal' size='full'>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <SubscriptionReturn {...props} />
      </ModalBody>

      <ModalFooter>
        <Box>
          <Text>
            <Trans i18nKey='pricing.help'>Need some help?</Trans>
          </Text>
          <Button as={ReactRouterLink}>
            <Trans i18nKey='contact_us'>Contact us</Trans>
          </Button>
        </Box>
      </ModalFooter>
    </ModalContent>
  </Modal>
)
