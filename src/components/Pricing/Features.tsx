import { dotobject } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import type { Plan } from './Plans'

export type FeaturesKeys =
  | 'personalization'
  | 'emailReminder'
  | 'smsNotification'
  | 'whiteLabel'
  | 'liveStreaming'
  | 'anonymous'
  | 'overwrite'
  | 'liveResults'

// Translation keys for the subscription features
export const PlanFeaturesTranslationKeys = {
  'organization.members': 'features.memberships',
  'organization.subOrgs': 'features.sub_orgs',
  'organization.customURL': 'features.custom_url',
  'votingTypes.weighted': 'features.weighted',
  'votingTypes.approval': 'features.approval',
  // 'votingTypes.ranked': 'features.ranked',
  'votingTypes.single': 'features.single',
  'votingTypes.multiple': 'features.multiple',
  // 'votingTypes.cumulative': 'features.cumulative',
  'features.personalization': 'features.personalization',
  'features.emailReminder': 'features.email_reminder',
  'features.smsNotification': 'features.sms_notification',
  'features.whiteLabel': 'features.white_label',
  'features.liveStreaming': 'features.live_streaming',
  'features.anonymous': 'features.anonymous',
  'features.overwrite': 'features.overwrite',
  'features.liveResults': 'features.live_results',
}

// Translation keys for the subscription features in the comparison table
export const PlanTableFeaturesTranslationKeys = {
  ...PlanFeaturesTranslationKeys,
  'organization.members': 'features.total_members',
  'organization.subOrgs': 'features.total_orgs',
}

export const CategorizedFeatureKeys = {
  votingTypes: ['single', 'multiple', 'approval', 'weighted' /* 'cumulative', 'ranked' */],
  organization: ['members', 'subOrgs', 'customURL'],
  features: [
    'emailReminder',
    'smsNotification',
    'personalization',
    'whiteLabel',
    'liveStreaming',
    'anonymous',
    'overwrite',
    'liveResults',
  ],
}

export const CategoryTitleKeys = {
  votingTypes: 'features.section.voting_types',
  organization: 'features.section.organization',
  features: 'features.section.features',
}

/**
 * Checks if the specified feature exists in the plan.
 *
 * @param plan  - The plan object to check.
 * @param featurePath  - Dot notation path to the feature (e.g., 'organization.members').
 * @returns boolean - `true` if the feature exists, `false` otherwise.
 */
export const hasFeature = (plan: Plan, featurePath: string) => dotobject(plan, featurePath) !== 'undefined'

/**
 * Checks if a given feature exists and meets the required condition in a plan.
 *
 * @param plan - The plan object to check.
 * @param featurePath - Dot notation path to the feature (e.g., 'organization.members').
 * @param expectedValue - Expected value or comparison object.
 *                         - If a number, checks for >= comparison.
 *                         - If an object, supports { operator, value } (e.g., { operator: '>=', value: 10 }).
 * @returns boolean - `true` if the feature meets the condition, `false` otherwise.
 */
export const isFeatureAvailable = (
  plan: Plan,
  featurePath: string,
  expectedValue?: number | { operator: '===' | '>' | '>=' | '<' | '<='; value: number }
): boolean => {
  const featureValue = dotobject(plan, featurePath) // Get the feature value using dot notation

  if (typeof featureValue === 'undefined') {
    return false // If the feature doesn't exist, return false
  }

  // If no expected value is provided, return true if the feature exists
  if (typeof expectedValue === 'undefined') {
    return true
  }

  // Handle exact match or comparison
  if (typeof expectedValue === 'number') {
    return featureValue >= expectedValue // Default to "greater than or equal to" for numbers
  }

  if (typeof expectedValue === 'object' && expectedValue.operator && expectedValue.value !== undefined) {
    const { operator, value } = expectedValue

    switch (operator) {
      case '===':
        return featureValue === value
      case '>':
        return featureValue > value
      case '>=':
        return featureValue >= value
      case '<':
        return featureValue < value
      case '<=':
        return featureValue <= value
      default:
        throw new Error(`Unsupported operator: ${operator}`)
    }
  }

  throw new Error('Invalid expectedValue type')
}

// yeah, it's sad but we need to include all the translations in a way the extractor does not remove them...
// note this component does not need to (and should never) be included in the app
const UnusedComponentButRequiredToNotLoseTranslations = () => {
  const { t } = useTranslation()
  t('features.memberships', { defaultValue: 'Up to {{ count }} memberships' })
  t('features.total_members', { defaultValue: 'Total available members' })
  t('features.sub_orgs', { defaultValue: 'Up to {{ count }} sub-organizations' })
  t('features.total_orgs', { defaultValue: 'Total available sub-organizations' })
  t('features.custom_url', { defaultValue: 'Custom URL' })
  t('features.single', { defaultValue: 'Single choice voting' })
  t('features.multiple', { defaultValue: 'Multiple choice voting' })
  t('features.approval', { defaultValue: 'Approval voting' })
  t('features.cumulative', { defaultValue: 'Cumulative voting' })
  t('features.ranked', { defaultValue: 'Ranked voting' })
  t('features.weighted', { defaultValue: 'Weighted voting' })
  t('features.personalization', { defaultValue: 'Personalization' })
  t('features.email_reminder', { defaultValue: 'Email reminder' })
  t('features.sms_notification', { defaultValue: 'SMS notification' })
  t('features.white_label', { defaultValue: 'White label' })
  t('features.live_streaming', { defaultValue: 'Live streaming' })
  t('features.anonymous', { defaultValue: 'Anonymous voting' })
  t('features.overwrite', { defaultValue: 'Vote overwrite' })
  t('features.live_results', { defaultValue: 'Live results' })
  // Section titles
  t('features.section.voting_types', { defaultValue: 'Voting Types' })
  t('features.section.features', { defaultValue: 'Features' })
  t('features.section.organization', { defaultValue: 'Organization' })

  return null
}
