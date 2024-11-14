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
import { Link as ReactRouterLink } from 'react-router-dom'
import { ApiEndpoints } from '~components/Auth/api'
import { useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { StripeId } from '~constants'
import PricingCard from './Card'

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

export const SubscriptionPlans = () => {
  const { t } = useTranslation()
  const { data: plans, isLoading } = usePlans()
  const { permission } = useSubscription()

  const [selectedCensusSize, setSelectedCensusSize] = useState<number | null>(null)

  const translations = {
    [StripeId.Free]: {
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
    [StripeId.Essential]: {
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
    [StripeId.Premium]: {
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
  }

  const censusSizeOptions = useMemo(() => {
    const allTiers = plans
      // Exclude plans with null censusSizeTiers
      ?.filter((plan) => plan.censusSizeTiers)
      .flatMap((plan) =>
        plan.censusSizeTiers!.map((tier) => {
          const from = tier.upTo === 100 ? 1 : tier.upTo - 99
          return {
            label: t('pricing.members_size', { defaultValue: '{{ from }}-{{ to }} members', from, to: tier.upTo }),
            value: tier.upTo,
          }
        })
      )
    const uniqueTiers = Array.from(new Map(allTiers?.map((tier) => [tier.value, tier])).values())
    return uniqueTiers || []
  }, [plans])

  const cards = useMemo(() => {
    if (!plans) return []

    return plans.map((plan) => ({
      popular: plan.default,
      title: translations[plan.id]?.title || plan.name,
      subtitle: translations[plan.id]?.subtitle || '',
      price: plan.startingPrice / 100,
      features: translations[plan.id]?.features || [],
      isDisabled: selectedCensusSize && !plan.censusSizeTiers?.some((tier) => tier.upTo === selectedCensusSize),
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
      <Flex gap={5} alignItems='start'>
        {cards.map((card, idx) => (
          <PricingCard key={idx} plan={plans[idx]} {...card} />
        ))}
      </Flex>
    </Flex>
  )
}

export const SubscriptionModal = ({
  isOpenModal,
  onCloseModal,
  title,
}: {
  isOpenModal: boolean
  onCloseModal: () => void
  title?: ReactNode
}) => (
  <Modal isOpen={isOpenModal} onClose={onCloseModal} variant='pricing-modal' size='full'>
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
