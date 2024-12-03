import { Box, Button, Divider, Flex, Icon, Spinner, Text, VStack } from '@chakra-ui/react'
import { CheckCircle, ClockRefresh, XCircle } from '@untitled-ui/icons-react'
import { Trans } from 'react-i18next'
import { Fragment } from 'react/jsx-runtime'
import { useSubscription } from '~components/Auth/Subscription'
import { FeaturesBox } from './FeaturesBox'
import { usePlanTranslations, usePlans } from './Plans'
import { usePricingModal } from './use-pricing-modal'
import { isFeatureAvailable } from './utils'
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
