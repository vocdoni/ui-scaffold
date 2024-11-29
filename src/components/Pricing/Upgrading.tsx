import {
  Box,
  Button,
  Divider,
  Flex,
  FlexProps,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { CheckCircle, ClockRefresh, XCircle } from '@untitled-ui/icons-react'
import { Trans } from 'react-i18next'
import { FaUser } from 'react-icons/fa'
import { Fragment } from 'react/jsx-runtime'
import { useSubscription } from '~components/Auth/Subscription'
import { usePricingModal } from './Modals'
import { usePlanTranslations, usePlans } from './Plans'
import { isFeatureAvailable } from './utils'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const TierUpgradeModal = ({ isOpen, onClose }: ModalProps) => (
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

const FeaturesBox = (props: FlexProps) => (
  <Flex
    flexDirection='column'
    bg='gray.100'
    _dark={{ bg: 'gray.700' }}
    px={10}
    py={6}
    w={{ base: 'modal-stretch', lg: 'modal-stretch-lg' }}
    gap={5}
    boxShadow='0 0 10px var(--chakra-colors-gray-400)'
    {...props}
  />
)

export type PlanUpgradeData = {
  feature: string
  text: string
  value?: number | { operator: '===' | '>' | '>=' | '<' | '<='; value: number }
}

export const PlanUpgrade = ({ feature, text, value }: PlanUpgradeData) => {
  const { subscription } = useSubscription()
  const translations = usePlanTranslations()
  const { openModal } = usePricingModal()
  const { data: plans, isLoading } = usePlans()
  const plan = translations[subscription.plan.id].title

  return (
    <VStack spacing={4} w='full'>
      {/* Header */}
      <Icon as={ClockRefresh} boxSize={6} color='blue.400' w='100%' h='50px' />
      <Text fontSize='lg' fontWeight='semibold' textAlign='center'>
        <Trans i18nKey='plan_upgrade.feature_unavailable' values={{ feature: text, plan }}>
          Oops ... your{' '}
          <Text as='span' color='red.500'>
            {plan}
          </Text>{' '}
          doesn't support {{ feature }}.
        </Trans>
      </Text>
      <Text fontSize='sm' color='gray.500' textAlign='center'>
        <Trans i18nKey='plan_upgrade.dont_limit_yourself'>
          Don't limit yourself. Join the family of 725 orgs that trust{' '}
          <Text as='span' fontStyle='italic'>
            Vocdoni
          </Text>
          .
        </Trans>
      </Text>

      {/* Feature Availability */}
      <FeaturesBox>
        <Text fontSize='xs' fontWeight='semibold' textAlign='center' textTransform='uppercase' color='gray.500'>
          <Trans i18nKey='plan_upgrade.feature_available_in'>Feature available in:</Trans>
        </Text>
        <Flex justify='space-evenly' fontSize='sm' fontWeight='semibold' height={6}>
          {isLoading && <Spinner />}
          {plans?.map((plan, key) => (
            <Fragment key={key}>
              <Flex align='center' gap={1}>
                {isFeatureAvailable(plan, feature, value) ? (
                  <Icon as={CheckCircle} color='green.500' fontSize='xl' />
                ) : (
                  <Icon as={XCircle} color='red.500' fontSize='xl' />
                )}
                <Text>{translations[plan.id].title}</Text>
              </Flex>
              {key < plans.length - 1 && <Divider orientation='vertical' />}
            </Fragment>
          ))}
        </Flex>
      </FeaturesBox>

      {/* Call to Action */}
      <Box>
        <Button variant='solid' colorScheme='brand' w='full' size='lg' onClick={() => openModal('subscription')}>
          <Trans i18nKey='view_pricing_plans'>View Pricing Plans</Trans>
        </Button>
        <Text fontSize='xs' color='gray.500' textAlign='center'>
          <Trans i18nKey='plan_upgrade.satisfaction_rate'>97% satisfaction rate, for only 9€/month.</Trans>
        </Text>
      </Box>
    </VStack>
  )
}

export type TierUpgradeData = {
  value: number
}

export const TierUpgrade = () => {
  const { subscription } = useSubscription()
  const translations = usePlanTranslations()
  const plan = translations[subscription.plan.id].title
  const voters = subscription.subscriptionDetails.maxCensusSize

  return (
    <VStack spacing={4} w='full'>
      {/* Header */}
      <Flex align='center' justify='center' borderRadius='full' w='50px' h='50px'>
        <Icon as={FaUser} boxSize={6} />
      </Flex>
      <Text fontSize='lg' fontWeight='semibold' textAlign='center'>
        <Trans i18nKey='tier_upgrade.current_plan' values={{ plan, voters }}>
          Your current{' '}
          <Text as='span' color='green.500'>
            {plan}
          </Text>{' '}
          is limited to selecting up to{' '}
          <Text as='span' color='green.500'>
            {voters} voters
          </Text>
          .
        </Trans>
      </Text>
      <Text fontSize='sm' color='gray.500' textAlign='center'>
        <Trans i18nKey='tier_upgrade.dont_limit_yourself'>
          Don't limit yourself. Join the family of 725 orgs that trust{' '}
          <Text as='span' fontStyle='italic'>
            Vocdoni
          </Text>
          .
        </Trans>
      </Text>

      {/* Plans Limits */}
      <FeaturesBox>
        <Flex justify='space-between' fontSize='sm' fontWeight='semibold'>
          <Text>
            <Trans i18nKey='tier_upgrade.plan.free'>Free</Trans>
          </Text>
          <Text>
            <Trans i18nKey='tier_upgrade.plan.basic'>Basic</Trans>
          </Text>
          <Text>
            <Trans i18nKey='tier_upgrade.plan.pro'>Pro</Trans>
          </Text>
          <Text>
            <Trans i18nKey='tier_upgrade.plan.custom'>Custom</Trans>
          </Text>
        </Flex>
        <Flex justify='space-between' fontSize='xs' color='gray.500'>
          <Text>
            <Trans i18nKey='tier_upgrade.plan.limit.free'>50 voters</Trans>
          </Text>
          <Text>
            <Trans i18nKey='tier_upgrade.plan.limit.basic'>Up to 1500</Trans>
          </Text>
          <Text>
            <Trans i18nKey='tier_upgrade.plan.limit.pro'>Up to 3000</Trans>
          </Text>
          <Text>
            <Trans i18nKey='tier_upgrade.plan.limit.custom'>Unlimited</Trans>
          </Text>
        </Flex>
      </FeaturesBox>

      {/* Call to Action */}
      <Button variant='solid' colorScheme='brand' w='full' size='lg'>
        <Trans i18nKey='view_pricing_plans'>View Pricing Plans</Trans>
      </Button>
      <Text fontSize='xs' color='gray.500' textAlign='center'>
        <Trans i18nKey='tier_upgrade.satisfaction_rate'>97% satisfaction rate, starting at 9€/month.</Trans>
      </Text>
    </VStack>
  )
}
