import { Flex, Progress, SimpleGrid } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { MutableRefObject, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  LuChartColumn,
  LuCircleCheckBig,
  LuMail,
  LuPalette,
  LuShield,
  LuUserCheck,
  LuUsers,
  LuVote,
} from 'react-icons/lu'
import { ApiEndpoints } from '~components/Auth/api'
import { useSubscription } from '~components/Auth/Subscription'
import { useAuth } from '~components/Auth/useAuth'
import { PlanId } from '~constants'
import { QueryKeys } from '~src/queries/keys'
import { currency } from '~utils/numbers'
import PricingCard from './Card'
import { usePricingModal } from './use-pricing-modal'

export type Plan = {
  id: number
  name: string
  stripeId: string
  startingPrice: number
  default: boolean
  organization: {
    teamMembers: number
    subOrgs: number
    censusSize: number
    maxProcesses: number
    maxCensus: number
    maxDuration: string
    customURL: boolean
    drafts: boolean
    customPlan: boolean
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
    '2FAsms': number
    '2FAemail': number
    whiteLabel: boolean
    liveStreaming: boolean
    phoneSupport: boolean
  }
}

type FormValues = {
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

export const usePlanTranslations = (plans?: Plan[]) => {
  const { t } = useTranslation()

  const byId = useMemo(() => {
    const m = new Map<PlanId, Plan>()
    plans?.forEach((p) => m.set(p.id, p))
    return m
  }, [plans])

  const getMembers = (id: PlanId, fallback = 100) => byId.get(id)?.organization?.maxCensus ?? fallback
  const getProcesses = (id: PlanId, fallback = 10) => byId.get(id)?.organization?.maxProcesses ?? fallback
  const getTeamMembers = (id: PlanId, fallback = 1) => byId.get(id)?.organization?.teamMembers ?? fallback
  const get2FAsms = (id: PlanId, fallback = 0) => byId.get(id)?.features?.['2FAsms'] ?? fallback
  const get2FAemail = (id: PlanId, fallback = 0) => byId.get(id)?.features?.['2FAemail'] ?? fallback

  const get2FA = (id: PlanId) => {
    const hasEmail = Number(get2FAemail(id)) > 0
    const hasSms = Number(get2FAsms(id)) > 0

    const suffix =
      hasSms && hasEmail
        ? t('pricing.2fa_suffix_both', { defaultValue: 'Email & SMS' })
        : hasEmail
          ? t('pricing.2fa_suffix_email', { defaultValue: 'Email' })
          : t('pricing.2fa_suffix_sms', { defaultValue: 'SMS' })

    return suffix
  }

  const translations = {
    [PlanId.Free]: {
      title: t('pricing.free_title', { defaultValue: 'Free' }),
      subtitle: t('pricing.free_subtitle', {
        defaultValue: 'Perfect for getting started',
      }),
      features: [
        {
          icon: LuUsers,
          text: t('pricing.core_voting', {
            defaultValue: 'Up to {{ count }} members',
            count: getMembers(PlanId.Free, 100),
          }),
        },
        {
          icon: LuVote,
          text: t('pricing.yearly_processes', {
            defaultValue: '{{ count }} votes per year¹',
            count: getProcesses(PlanId.Free, 10),
          }),
        },
        {
          icon: LuUserCheck,
          text: t('pricing.up_to_admins', {
            defaultValue: '{{ count }} admins',
            count: getTeamMembers(PlanId.Free, 1),
          }),
        },
        {
          icon: LuCircleCheckBig,
          text: t('pricing.different_voting_methods', { defaultValue: 'Different voting methods' }),
        },
        {
          icon: LuShield,
          text: t('pricing.2fa', {
            suffix: get2FA(PlanId.Free),
            defaultValue: '2FA authentication² ({{suffix}})',
          }),
        },
        { icon: LuChartColumn, text: t('pricing.basic_analytics', { defaultValue: 'Basic analytics' }) },
        { icon: LuMail, text: t('pricing.ticket_support_72', { defaultValue: 'Email support (72h)' }) },
      ],
    },
    [PlanId.Essential]: {
      title: t('pricing.essential_title', { defaultValue: 'Essential' }),
      subtitle: t('pricing.essential_subtitle', {
        defaultValue: 'For growing organizations',
      }),
      features: [
        {
          icon: LuUsers,
          text: t('pricing.core_voting', {
            count: getMembers(PlanId.Essential, 500),
          }),
        },
        {
          icon: LuVote,
          text: t('pricing.yearly_processes', {
            count: getProcesses(PlanId.Essential, 20),
          }),
        },
        {
          icon: LuUserCheck,
          text: t('pricing.up_to_admins', {
            count: getTeamMembers(PlanId.Essential, 1),
          }),
        },
        { icon: LuCircleCheckBig, text: t('pricing.different_voting_methods') },
        {
          icon: LuShield,
          text: t('pricing.2fa', {
            suffix: get2FA(PlanId.Essential),
          }),
        },
        { icon: LuChartColumn, text: t('pricing.basic_analytics', { defaultValue: 'Basic analytics' }) },
        { icon: LuMail, text: t('pricing.ticket_support_48', { defaultValue: 'Email support (48h)' }) },
      ],
    },
    [PlanId.Premium]: {
      title: t('pricing.premium_title', { defaultValue: 'Premium' }),
      subtitle: t('pricing.premium_subtitle', {
        defaultValue: 'For established organizations',
      }),
      features: [
        {
          icon: LuUsers,
          text: t('pricing.core_voting', {
            count: getMembers(PlanId.Premium, 2000),
          }),
        },
        {
          icon: LuVote,
          text: t('pricing.yearly_processes', {
            count: getProcesses(PlanId.Premium, 50),
          }),
        },
        {
          icon: LuUserCheck,
          text: t('pricing.up_to_admins', {
            count: getTeamMembers(PlanId.Premium, 5),
          }),
        },
        { icon: LuCircleCheckBig, text: t('pricing.different_voting_methods') },
        {
          icon: LuShield,
          text: t('pricing.2fa', {
            suffix: get2FA(PlanId.Premium),
          }),
        },
        { icon: LuPalette, text: t('pricing.custom_branding', { defaultValue: 'Custom branding*' }) },
        { icon: LuMail, text: t('pricing.priority_support', { defaultValue: 'Priority email support (24h)' }) },
      ],
    },
    [PlanId.Custom]: {
      title: t('pricing.custom_title', { defaultValue: 'Custom' }),
      subtitle: t('pricing.custom_subtitle', {
        defaultValue: 'Tailored for your needs',
      }),
    },
  }

  return translations
}

export const SubscriptionPlans = ({ featuresRef }: { featuresRef?: MutableRefObject<HTMLDivElement> }) => {
  const { subscription } = useSubscription()
  const { data: plans, isLoading } = usePlans()
  const translations = usePlanTranslations(plans)
  const { openModal } = usePricingModal()

  const methods = useForm<FormValues>({
    defaultValues: {
      planId: null,
    },
  })

  const { handleSubmit } = methods

  const onSubmit = (data: FormValues) => {
    openModal('subscriptionPayment', {
      lookupKey: data.planId,
    })
  }

  const cards = useMemo(() => {
    if (!plans) return []

    return plans.map((plan) => {
      return {
        popular: plan.id === PlanId.Premium,
        title: translations[plan.id]?.title || plan.name,
        subtitle: translations[plan.id]?.subtitle || '',
        price: currency(plan.startingPrice),
        features: translations[plan.id]?.features || [],
        isCurrentPlan: subscription && plan.id === subscription?.plan.id,
        isDisabled: false,
      }
    })
  }, [plans, subscription, translations])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir='column' gap={4}>
          {isLoading && <Progress isIndeterminate />}
          <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={6}>
            {cards.map((card, idx) => (
              <PricingCard key={idx} plan={plans[idx]} {...card} />
            ))}
          </SimpleGrid>
        </Flex>
      </form>
    </FormProvider>
  )
}
