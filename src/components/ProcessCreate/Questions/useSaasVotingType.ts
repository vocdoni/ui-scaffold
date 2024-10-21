import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { GiChoice } from 'react-icons/gi'
import { SaasVotingTypesKeys, useAccountPlan } from '~components/AccountSaas/useAccountPlan'
import SingleChoice from '~components/ProcessCreate/Questions/SingleChoice'
import { GenericFeatureObject, GenericFeatureObjectProps } from '~components/ProcessCreate/Steps/TabsPage'

const useVotingTypesTranslations = (): Record<SaasVotingTypesKeys, GenericFeatureObjectProps> => {
  const { t } = useTranslation()
  return useMemo(
    () => ({
      single: {
        description: t('single', { defaultValue: 'single' }),
        title: t('single', { defaultValue: 'single' }),
        icon: GiChoice,
        component: SingleChoice,
      },
      multiple: {
        description: t('multiple', { defaultValue: 'multiple' }),
        title: t('multiple', { defaultValue: 'multiple' }),
        icon: GiChoice,
        component: SingleChoice,
      },
      approval: {
        description: t('approval', { defaultValue: 'approval' }),
        title: t('approval', { defaultValue: 'approval' }),
        icon: GiChoice,
        component: SingleChoice,
      },
      cumulative: {
        description: t('cumulative', { defaultValue: 'cumulative' }),
        title: t('cumulative', { defaultValue: 'cumulative' }),
        icon: GiChoice,
        component: SingleChoice,
      },
      ranked: {
        description: t('ranked', { defaultValue: 'ranked' }),
        title: t('ranked', { defaultValue: 'ranked' }),
        icon: GiChoice,
        component: SingleChoice,
      },
      weighted: {
        description: t('weighted', { defaultValue: 'weighted' }),
        title: t('weighted', { defaultValue: 'weighted' }),
        icon: GiChoice,
        component: SingleChoice,
      },
    }),
    [t]
  )
}

export const useSaasVotingType = (): {
  inPlan: GenericFeatureObject<Partial<SaasVotingTypesKeys>>
  pro: GenericFeatureObject<Partial<SaasVotingTypesKeys>>
} => {
  const { data } = useAccountPlan()
  const translations = useVotingTypesTranslations()

  const inPlanDetails = {} as Record<Partial<SaasVotingTypesKeys>, GenericFeatureObjectProps>
  const proDetails = {} as Record<Partial<SaasVotingTypesKeys>, GenericFeatureObjectProps>

  for (const [key, inPlan] of Object.entries(data.votingTypes)) {
    const _key = key as SaasVotingTypesKeys
    if (inPlan) {
      inPlanDetails[_key] = translations[_key]
      continue
    }
    proDetails[_key] = translations[_key]
  }

  return {
    inPlan: {
      defined: Object.keys(inPlanDetails) as Partial<SaasVotingTypesKeys>[],
      details: inPlanDetails,
    },
    pro: {
      defined: Object.keys(proDetails) as Partial<SaasVotingTypesKeys>[],
      details: proDetails,
    },
  }
}
