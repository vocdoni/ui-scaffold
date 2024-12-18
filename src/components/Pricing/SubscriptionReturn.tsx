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
import { errorToString, useClient } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { MdHowToVote } from 'react-icons/md'
import { generatePath, Navigate, Link as ReactRouterLink } from 'react-router-dom'
import { Routes } from '~src/router/routes'

type StatusData = {
  status: string | null
  customer_email: string | null
  faucet_package: string | undefined
  recipient: string | null
  quantity: number | null
}

export type SubscriptionReturnData = {
  sessionId: string
  backendURL?: string
}

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const SubscriptionReturn = ({ sessionId, backendURL }: SubscriptionReturnData) => {
  const { t } = useTranslation()
  const { client, loaded: accountLoaded, account, fetchAccount } = useClient()
  const toast = useToast()
  const [status, setStatus] = useState<string | null>(null)
  const [customerEmail, setCustomerEmail] = useState<string | null>('')
  const [faucetPackage, setFaucetPackage] = useState<string | undefined>('')
  const [recipient, setRecipient] = useState<string | null>('')
  const [packageConsumed, setPackageConsumed] = useState(false)
  const [aborted, setAborted] = useState(false)
  const [subscriptionStatus, setSubscrptionStatus] = useState<string | null>('')
  const [isSubscription, setIsSubscription] = useState(false)
  const [error, setError] = useState(false)

  // fetch the session status
  useEffect(() => {
    if (!accountLoaded.account) return
    ;(async () => {
      setIsSubscription(!!backendURL)
      let url = backendURL
        ? `${backendURL}/subscriptions/checkout/{sessionID}`
        : `${client.faucetService.url}/sessionStatus/${sessionId}`
      const res = await fetch(url)
      const data = await res.json()

      // data.faucet_package exists in the response iff
      // the response comes from the faucet
      // the package was not consumed
      if (data.faucet_package !== null) {
        setStatus(data.status)
        setCustomerEmail(data.customer_email)
        setFaucetPackage(data.faucet_package)
        setRecipient(data.recipient)
        return null
      }

      // data.subscription_status exists in the response iff
      // the response comes from the saas service
      if (data.subscription_status !== null) {
        setStatus(data.status)
        setCustomerEmail(data.customer_email)
        setSubscrptionStatus(data.subscription_status)
      }

      if (data) setError(true)
    })()
  }, [accountLoaded.account])

  // claim the tokens if the package is not consumed
  useEffect(() => {
    if (
      !faucetPackage ||
      !recipient ||
      !accountLoaded ||
      packageConsumed ||
      !account?.address ||
      ensure0x(account.address) !== recipient.toLowerCase()
    ) {
      return
    }
    claimTokens()
  }, [faucetPackage, recipient, accountLoaded])

  const claimTokens = async () => {
    toast.closeAll()

    try {
      setAborted(false)
      // get the faucet receipt
      let successMsgTitle = t('claim.success_faucetPackage_title')

      toast({
        title: t('claim.toast.loading_title'),
        description: t('claim.toast.loading_description'),
        status: 'loading',
        duration: null,
      })
      // claim the tokens with the SDK
      await client.collectFaucetTokens(faucetPackage)

      toast.closeAll()

      setPackageConsumed(true)
      // and update stored balance
      await fetchAccount()

      successMsgTitle = t('claim.toast.success_title')

      toast.closeAll()
      toast({
        title: successMsgTitle,
        description: t('claim.toast.success_description'),
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      toast.closeAll()
      console.error('could not claim faucet package:', error)
      toast({
        title: t('claim.toast.error_title'),
        description: errorToString(error),
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      setAborted(true)
    }
  }
  if (!isSubscription) {
    // tokens
    if (status === 'open') {
      return <Navigate to={generatePath(Routes.stripe.checkout)} />
    }

    if (aborted) {
      return (
        <Box as='section' id='success' className='site-wrapper' mt={10} textAlign='center'>
          <Text>
            <Trans
              i18nKey='claim.signature_aborted'
              components={{
                p: <Text mb={5} />,
                strong: <Text fontWeight='bold' />,
              }}
            />
          </Text>
          <Flex justifyContent='center' gap={5} mt={10}>
            <Button onClick={async () => claimTokens()}>{t('claim.signature_aborted_sign')}</Button>
          </Flex>
        </Box>
      )
    }

    if (!packageConsumed && !faucetPackage) {
      return (
        <Box as='section' id='success' className='site-wrapper' textAlign='center' mt={10}>
          <Spinner color='spinner' mb={5} />
          <Box w='fit-content' mx='auto'>
            <Trans
              i18nKey='claim.loading_description'
              components={{
                h3: <Text as='h3' fontSize='md' fontWeight='bold' />,
                p: <Text mb={5} />,
                strong: <Text fontWeight='bold' />,
                line: <Box h='1px' backgroundColor='black' my={10} />,
              }}
            />
          </Box>
        </Box>
      )
    }

    if (packageConsumed) {
      return (
        <Box as='section' id='success' className='site-wrapper' mt={10} textAlign='center'>
          <Trans
            i18nKey='claim.purchase_success'
            components={{
              mailto: <Link href='mailto:orders@vocdoni.org' />,
              title: <Text fontSize='xl' mb={5}></Text>,
              p: <Text mb={5}></Text>,
            }}
            values={{
              customerEmail: customerEmail,
            }}
          />

          <Button as={ReactRouterLink} to={`/organization`} width='min-content' mx='auto'>
            <Icon as={MdHowToVote} boxSize={{ base: 4, sm2: 3 }} />
            <Text as='span' display={{ base: 'none', sm2: 'inline-block' }}>
              {t('menu.my_org')}
            </Text>
          </Button>
        </Box>
      )
    }
  } else {
    // subscription
    if (status === 'open') {
      return <Navigate to={generatePath(Routes.stripe.subscription)} />
    }

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
  }

  return null
}

export const SubscriptionReturnModal = ({ isOpen, onClose, ...props }: ModalProps & SubscriptionReturnData) => (
  <Modal isOpen={isOpen} onClose={onClose} variant='payment-modal' size='full'>
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
