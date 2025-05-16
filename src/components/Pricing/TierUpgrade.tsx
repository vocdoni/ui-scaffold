import { Button, Flex, Icon, Text, VStack } from '@chakra-ui/react'
import { Trans } from 'react-i18next'
import { FaUser } from 'react-icons/fa'
import { useSubscription } from '~components/Auth/Subscription'
import { FeaturesBox } from './FeaturesBox'
import { usePlanTranslations } from './Plans'

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
      <Button variant='solid' colorScheme='black' w='full' size='lg'>
        <Trans i18nKey='view_pricing_plans'>View Pricing Plans</Trans>
      </Button>
      <Text fontSize='xs' color='gray.500' textAlign='center'>
        <Trans i18nKey='tier_upgrade.satisfaction_rate'>97% satisfaction rate, starting at 9€/month.</Trans>
      </Text>
    </VStack>
  )
}
