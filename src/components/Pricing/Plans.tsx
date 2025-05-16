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
import { MutableRefObject, ReactNode, useMemo } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { ApiEndpoints } from '~components/Auth/api'
import { useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { PlanId } from '~constants'
import { QueryKeys } from '~src/queries/keys'
import { Routes } from '~src/router/routes'
import { currency } from '~utils/numbers'
import PricingCard from './Card'
import { usePricingModal } from './use-pricing-modal'

export type Plan = {
  id: number
  name: string
  stripeID: string
  startingPrice: number
  default: boolean
  organization: {
    members: number
    subOrgs: number
    censusSize: number
    maxProcesses: number
    maxCensus: number
    maxDuration: string
    customURL: boolean
    drafts: number
  }
  votingTypes: {
    single: boolean
    multiple: boolean
    approval: boolean
    cumulative: boolean
    ranked: boolean
    weighted: boolean
  }
  features: {
    anonymous: boolean
    overwrite: boolean
    liveResults: boolean
    personalization: boolean
    emailReminder: boolean
    smsNotification: boolean
    whiteLabel: boolean
    liveStreaming: boolean
  }
  censusSizeTiers?:
    | {
        amount: number
        upTo: number
      }[]
    | null
}

type FormValues = {
  censusSize: number | null
  planId: number | null
}

export const usePlans = () => {
  const { bearedFetch } = useAuth()
  return useQuery({
    queryKey: QueryKeys.plans,
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
        t('pricing.up_to_admins', { admin: 1, org: 1 }),
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
        t('pricing.up_to_admins', { admin: 5, org: 1 }),
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

export const SubscriptionPlans = ({ featuresRef }: { featuresRef?: MutableRefObject<HTMLDivElement> }) => {
  const { t } = useTranslation()
  const { subscription } = useSubscription()
  const { data: plans, isLoading } = usePlans()
  const translations = usePlanTranslations()
  const { openModal } = usePricingModal()

  // Find the best fitting tier for the current subscription's census size
  const defaultCensusSize = useMemo(() => {
    if (!plans || !subscription?.subscriptionDetails?.maxCensusSize) return null

    // Get all available tiers across all plans
    const allTiers = plans.flatMap((plan) => plan.censusSizeTiers || [])

    // Sort by upTo value to find the smallest tier that fits
    const sortedTiers = allTiers.sort((a, b) => a.upTo - b.upTo)

    // Find the first tier that can accommodate the current census size
    const bestFitTier = sortedTiers.find((tier) => tier.upTo >= subscription.subscriptionDetails.maxCensusSize)

    return bestFitTier?.upTo || null
  }, [plans, subscription?.subscriptionDetails?.maxCensusSize])

  const methods = useForm<FormValues>({
    defaultValues: {
      censusSize: defaultCensusSize,
      planId: null,
    },
  })

  const { watch, handleSubmit } = methods
  const selectedCensusSize = watch('censusSize')

  const onSubmit = (data: FormValues) => {
    openModal('subscriptionPayment', {
      amount: data.censusSize,
      lookupKey: data.planId,
    })
  }

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
      price: currency(
        selectedCensusSize
          ? (plan.censusSizeTiers?.find((tier) => tier.upTo === selectedCensusSize)?.amount ?? plan.startingPrice)
          : plan.startingPrice
      ),
      features: translations[plan.id]?.features || [],
      isDisabled:
        (selectedCensusSize && !plan.censusSizeTiers?.some((tier) => tier.upTo === selectedCensusSize)) ||
        (subscription && plan.id === subscription?.plan.id && !selectedCensusSize),
    }))
  }, [plans, selectedCensusSize, subscription, translations])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir='column' gap={4}>
          <Flex
            flexDir={{ base: 'column', lg: 'row' }}
            justifyContent={'center'}
            alignItems={'center'}
            gap={{ base: 2, lg: 4 }}
            mb={{ base: 4, lg: 6 }}
          >
            <Text>
              <Trans i18nKey='pricing.membership_size'>Select your membership size:</Trans>
            </Text>
            <Controller
              name='censusSize'
              control={methods.control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  options={censusSizeOptions}
                  onChange={(selected) => field.onChange(selected?.value || null)}
                  value={censusSizeOptions.find((option) => option.value === field.value)}
                />
              )}
            />
            {methods.formState.errors.censusSize && (
              <Text color='red.500' fontSize='sm' mt={1}>
                {t('form.error.field_is_required')}
              </Text>
            )}
          </Flex>
          {isLoading && <Progress isIndeterminate />}
          <Flex gap={5} justifyContent='space-evenly' alignItems='start' flexWrap='wrap'>
            {cards.map((card, idx) => (
              <PricingCard key={idx} plan={plans[idx]} {...card} featuresRef={featuresRef} />
            ))}
          </Flex>
        </Flex>
      </form>
    </FormProvider>
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
}) => {
  const { t } = useTranslation()
  const { subscription } = useSubscription()
  const translations = usePlanTranslations()

  if (!subscription) return null

  const plan = translations[subscription.plan.id].title
  const billing = new Date(subscription.subscriptionDetails.renewalDate)
  // the date format used by the billing date
  const format = t('pricing.date_format', { defaultValue: 'dd/mm/yy' })

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant='pricing-modal' size='full'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title || <Trans i18nKey='pricing.upgrade_title'>Upgrade your subscription</Trans>}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SubscriptionPlans />
        </ModalBody>

        <ModalFooter>
          {subscription.plan.id !== PlanId.Free && (
            <Text>
              <Trans i18nKey='pricing.your_plan' values={{ plan, billing, format }} components={{ plan: <PlanText /> }}>
                You're currently subscribed to the {{ plan }} plan. Upgrade now, and you'll only pay the difference for
                the remaining time in your billing period. Starting from your next billing cycle on dd/mm/yy, you'll be
                charged the full price for your new plan.
              </Trans>
            </Text>
          )}
          <Box>
            <Text>
              <Trans i18nKey='pricing.help'>Need some help?</Trans>
            </Text>
            <Button as={ReactRouterLink} to={Routes.contact} target='_blank' colorScheme='whiteAlpha' color={'white'}>
              <Trans i18nKey='contact_us'>Contact us</Trans>
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const PlanText = ({ children }: { children?: ReactNode }) => (
  <Text as='span' fontWeight='bold' display='inline'>
    "{children}"
  </Text>
)
