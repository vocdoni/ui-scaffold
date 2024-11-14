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
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { CheckCircle, ClockRefresh, XCircle } from '@untitled-ui/icons-react'
import { Trans } from 'react-i18next'
import { FaUser } from 'react-icons/fa'

export const TierUpgradeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Tier upgrade</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <TierUpgrade />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export const PlanUpgradeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Plan upgrade</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <PlanUpgrade />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

const FeaturesBox = (props: FlexProps) => (
  <Flex
    flexDirection='column'
    bg='gray.100'
    _dark={{ bg: 'gray.700' }}
    px={12}
    py={6}
    w={{ base: 'modal-stretch', lg: 'modal-stretch-lg' }}
    gap={5}
    boxShadow='0 0 10px var(--chakra-colors-gray-400)'
    {...props}
  />
)

export const PlanUpgrade = () => (
  <VStack spacing={4} w='full'>
    {/* Header */}
    <Icon as={ClockRefresh} boxSize={6} color='blue.400' w='100%' h='50px' />
    <Text fontSize='lg' fontWeight='semibold' textAlign='center'>
      <Trans i18nKey='plan_upgrade.feature_unavailable'>
        Oops ... your{' '}
        <Text as='span' color='red.500'>
          free plan
        </Text>{' '}
        doesn't support customization.
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
      <Flex justify='space-between' fontSize='sm' fontWeight='semibold' height={6}>
        <Flex align='center' gap={1}>
          <Icon as={XCircle} color='red.500' fontSize='xl' />
          <Text>
            <Trans i18nKey='plan_upgrade.plan.free'>Free</Trans>
          </Text>
        </Flex>
        <Divider orientation='vertical' />
        <Flex align='center' gap={1}>
          <Icon as={CheckCircle} color='green.500' fontSize='xl' />
          <Text>
            <Trans i18nKey='plan_upgrade.plan.basic'>Basic</Trans>
          </Text>
        </Flex>
        <Divider orientation='vertical' />

        <Flex align='center' gap={1}>
          <Icon as={CheckCircle} color='green.500' fontSize='xl' />
          <Text>
            <Trans i18nKey='plan_upgrade.plan.pro'>Pro</Trans>
          </Text>
        </Flex>
        <Divider orientation='vertical' />

        <Flex align='center' gap={1}>
          <Icon as={CheckCircle} color='green.500' fontSize='xl' />
          <Text>
            <Trans i18nKey='plan_upgrade.plan.custom'>Custom</Trans>
          </Text>
        </Flex>
      </Flex>
    </FeaturesBox>

    {/* Call to Action */}
    <Box>
      <Button variant='solid' colorScheme='brand' w='full' size='lg'>
        <Trans i18nKey='view_pricing_plans'>View Pricing Plans</Trans>
      </Button>
      <Text fontSize='xs' color='gray.500' textAlign='center'>
        <Trans i18nKey='plan_upgrade.satisfaction_rate'>97% satisfaction rate, for only 9€/month.</Trans>
      </Text>
    </Box>
    <Text fontSize='sm' fontWeight='semibold' textAlign='center'>
      <Trans i18nKey='or'>or</Trans>
    </Text>
    <Text>
      <Trans i18nKey='plan_upgrade.pay_once'>
        Pay{' '}
        <Text as='span' fontWeight='bold'>
          9,99€
        </Text>{' '}
        for one-time usage
      </Trans>
    </Text>
    <Button variant='outline' colorScheme='brand'>
      <Trans i18nKey='add'>Add</Trans>
    </Button>
  </VStack>
)

export const TierUpgrade = () => (
  <VStack spacing={4} w='full'>
    {/* Header */}
    <Flex align='center' justify='center' borderRadius='full' w='50px' h='50px'>
      <Icon as={FaUser} boxSize={6} />
    </Flex>
    <Text fontSize='lg' fontWeight='semibold' textAlign='center'>
      <Trans i18nKey='tier_upgrade.current_plan'>
        Your current{' '}
        <Text as='span' color='green.500'>
          free plan
        </Text>{' '}
        is limited to selecting up to{' '}
        <Text as='span' color='green.500'>
          50 voters
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
    <Text fontSize='sm' fontWeight='semibold' textAlign='center'>
      <Trans i18nKey='or'>or</Trans>
    </Text>
    <Text>
      <Trans i18nKey='tier_upgrade.use_tokens'>Use tokens for one-time usage</Trans>
    </Text>
    <Button variant='outline' colorScheme='brand' w='full'>
      <Trans i18nKey='continue'>Continue</Trans>
    </Button>
  </VStack>
)
