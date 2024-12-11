import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Select } from 'chakra-react-select'
import { ReactNode, useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import { ApiEndpoints } from '~components/Auth/api'
import { useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { PlanId } from '~constants'
import PricingCard from './Card'
import { ComparisonTable } from './ComparisonTable'

export type Plan = {
  id: number
  name: string
  stripeID: string
  startingPrice: number
  default: boolean
  organization: {
    memberships: number
    subOrgs: number
    censusSize: number
  }
  votingTypes: {
    approval: boolean
    ranked: boolean
    weighted: boolean
  }
  features: {
    personalization: boolean
    emailReminder: boolean
    smsNotification: boolean
  }
  censusSizeTiers:
    | {
        amount: number
        upTo: number
      }[]
    | null
}

export const usePlans = () => {
  const { bearedFetch } = useAuth()
  return useQuery({
    queryKey: ['plans'],
    queryFn: () => bearedFetch<Plan[]>(ApiEndpoints.Plans),
    // Sort by price
    select: (data) => data.sort((a, b) => a.startingPrice - b.startingPrice),
    // Cache for 20 minutes
    staleTime: 20 * 60 * 1000,
  })
}

export const usePlanTranslations = () => {
  const { t } = useTranslation()
  const translations = {
    [PlanId.Free]: {
      title: t('pricing.free_title', { defaultValue: 'Free' }),
      subtitle: t('pricing.free_subtitle', {
        defaultValue: 'Small organizations or community groups with basic voting needs.',
      }),
      features: [
        t('pricing.core_voting', { defaultValue: 'Core voting features' }),
        t('pricing.up_to_admins', {
          defaultValue: 'Up to {{ admin }} admin and {{ org }} org',
          admin: 1,
          org: 1,
        }),
        t('pricing.yearly_processes', { defaultValue: '{{ count }} yearly voting process', count: 1 }),
        t('pricing.basic_analytics', { defaultValue: 'Basic reporting and analytics' }),
        t('pricing.ticket_support', { defaultValue: 'Ticket support' }),
        t('pricing.gpdr_compilance', { defaultValue: 'GDPR compliance' }),
      ],
    },
    [PlanId.Essential]: {
      title: t('pricing.essential_title', { defaultValue: 'Essential' }),
      subtitle: t('pricing.essential_subtitle', {
        defaultValue: 'Small or medium-sized orgs or community groups with basic voting needs.',
      }),
      features: [
        t('pricing.core_voting'),
        t('pricing.up_to_admins', { admin: 3, org: 1 }),
        t('pricing.yearly_processes', { count: 5 }),
        t('pricing.basic_analytics'),
        t('pricing.ticket_support'),
        t('pricing.gpdr_compilance'),
      ],
    },
    [PlanId.Premium]: {
      title: t('pricing.premium_title', { defaultValue: 'Premium' }),
      subtitle: t('pricing.premium_subtitle', {
        defaultValue: 'Larger amount that require more advanced features.',
      }),
      features: [
        t('pricing.core_voting', { defaultValue: 'Core voting features' }),
        t('pricing.up_to_admins', { admin: 10, org: 5 }),
        t('pricing.unlimited_yearly_processes', { defaultValue: 'Unlimited yearly voting processes' }),
        t('pricing.advanced_analytitcs', { defaultValue: 'Advanced reporting and analytics' }),
        t('pricing.priority_support', { defaultValue: 'Priority ticket support' }),
        t('pricing.gpdr_compilance'),
      ],
    },
    [PlanId.Custom]: {
      title: t('pricing.custom_title', { defaultValue: 'Custom' }),
      subtitle: t('pricing.custom_subtitle', {
        defaultValue:
          'Large organizations, enterprises, and institutions requiring extensive customization and support',
      }),
      features: [
        t('pricing.all_features', { defaultValue: 'All features & voting types' }),
        t('pricing.up_to_admins', { admin: 10, org: 5 }),
        t('pricing.unlimited_yearly_processes', { defaultValue: 'Unlimited yearly voting processes' }),
        t('pricing.white_label', { defaultValue: 'White label solution' }),
        t('pricing.advanced_analytitcs', { defaultValue: 'Advanced reporting and analytics' }),
        t('pricing.dedicated_manager', { defaultValue: 'Dedicated account manager' }),
        t('pricing.priority_support', { defaultValue: 'Priority ticket support' }),
        t('pricing.gpdr_compilance'),
      ],
    },
  }

  return translations
}

export const SubscriptionPlans = () => {
  const { t } = useTranslation()
  const { subscription } = useSubscription()
  const { data: plans, isLoading } = usePlans()
  const translations = usePlanTranslations()
  const location = useLocation()
  const isPlansPage = location.pathname === '/plans'

  const [selectedCensusSize, setSelectedCensusSize] = useState<number | null>(null)

  const censusSizeOptions = useMemo(() => {
    if (!plans) return []

    // Step 1: Merge censusSizeTiers from all plans, removing duplicates
    const mergedTiers = plans
      .flatMap((plan) => plan.censusSizeTiers || []) // Combine all tiers
      .reduce((acc, tier) => {
        if (!acc.has(tier.upTo)) {
          acc.set(tier.upTo, tier) // Keep unique `upTo` values
        }
        return acc
      }, new Map<number, { upTo: number }>())

    // Step 2: Create options array from merged and sorted tiers
    const sortedTiers = Array.from(mergedTiers.values()).sort((a, b) => a.upTo - b.upTo)

    const options = sortedTiers.map((tier, idx) => {
      const previous = sortedTiers[idx - 1] || { upTo: 0 }
      const from = previous.upTo + 1
      return {
        label: t('pricing.members_size', { defaultValue: '{{ from }}-{{ to }} members', from, to: tier.upTo }),
        value: tier.upTo,
      }
    })

    return options
  }, [plans, t])

  const cards = useMemo(() => {
    if (!plans) return []

    return plans.map((plan) => ({
      popular: plan.id === PlanId.Essential,
      title: translations[plan.id]?.title || plan.name,
      subtitle: translations[plan.id]?.subtitle || '',
      price: plan.startingPrice / 100,
      features: translations[plan.id]?.features || [],
      isDisabled:
        (selectedCensusSize && !plan.censusSizeTiers?.some((tier) => tier.upTo === selectedCensusSize)) ||
        (subscription && plan.id === subscription?.plan.id && !selectedCensusSize),
    }))
  }, [plans, selectedCensusSize, t])

  return (
    <Flex flexDir='column' gap={4}>
      <Flex flexDir='column'>
        <Text>
          <Trans i18nKey='pricing.membership_size'>Select your membership size:</Trans>
        </Text>
        <Select options={censusSizeOptions} onChange={(selected) => setSelectedCensusSize(selected?.value || null)} />
      </Flex>
      {isLoading && <Progress colorScheme='brand' size='xs' isIndeterminate />}
      <Flex gap={5} justifyContent='space-evenly' alignItems='start' flexWrap='wrap'>
        {cards.map((card, idx) => (
          <PricingCard key={idx} plan={plans[idx]} {...card} />
        ))}
      </Flex>
      {isPlansPage && plans && <ComparisonTable plans={plans} />}
    </Flex>
  )
}

export const SubscriptionModal = ({
  isOpen,
  onClose,
  title,
}: {
  isOpen: boolean
  onClose: () => void
  title?: ReactNode
}) => (
  <Modal isOpen={isOpen} onClose={onClose} variant='pricing-modal' size='full'>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        {title || <Trans i18nKey='pricing.upgrade_title'>You need to upgrade to use this feature</Trans>}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <SubscriptionPlans />
      </ModalBody>

      <ModalFooter>
        <Text>
          <Trans i18nKey='pricing.your_plan'>
            Currently you are subscribed to the 'Your plan' subscription. If you upgrade, we will only charge the yearly
            difference. In the next billing period, starting on 'dd/mm/yy' you will pay for the new select plan.
          </Trans>
        </Text>
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
