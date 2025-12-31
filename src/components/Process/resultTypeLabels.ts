import { ElectionResultsTypeNames } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'

type ResultTypeConfig = {
  key: string
  defaultValue: string
}

const RESULT_TYPE_CONFIG: Record<ElectionResultsTypeNames, ResultTypeConfig> = {
  [ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION]: {
    key: 'process.voting_method.single_choice',
    defaultValue: 'Single choice',
  },
  [ElectionResultsTypeNames.MULTIPLE_CHOICE]: {
    key: 'process.voting_method.multiple_choice',
    defaultValue: 'Multiple choice',
  },
  [ElectionResultsTypeNames.APPROVAL]: {
    key: 'process.voting_method.approval',
    defaultValue: 'Approval voting',
  },
  [ElectionResultsTypeNames.BUDGET]: {
    key: 'process.voting_method.budget',
    defaultValue: 'Budget allocation',
  },
  [ElectionResultsTypeNames.QUADRATIC]: {
    key: 'process.voting_method.quadratic',
    defaultValue: 'Quadratic voting',
  },
}

// t('process.voting_method.single_choice', { defaultValue: 'Single choice' })
// t('process.voting_method.multiple_choice', { defaultValue: 'Multiple choice' })
// t('process.voting_method.approval', { defaultValue: 'Approval voting' })
// t('process.voting_method.budget', { defaultValue: 'Budget allocation' })
// t('process.voting_method.quadratic', { defaultValue: 'Quadratic voting' })

export const useResultTypeLabel = (type?: ElectionResultsTypeNames | null, defaultValue = '') => {
  const { t } = useTranslation()

  if (!type) return defaultValue

  const config = RESULT_TYPE_CONFIG[type]
  if (!config) return defaultValue

  return t(config.key, {
    defaultValue: config.defaultValue ?? defaultValue,
  })
}

export const useVotingMethodLabel = (
  type?: ElectionResultsTypeNames | null,
  opts?: { weighted?: boolean; defaultValue?: string }
) => {
  const { t } = useTranslation()

  const base = useResultTypeLabel(type, opts?.defaultValue ?? '')

  if (!opts?.weighted) return base

  return t('process.voting_method.weighted_format', {
    base,
    defaultValue: '{{base}} with weighted voting',
  })
}
