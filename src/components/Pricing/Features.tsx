import { dotobject } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { SubscriptionPermission } from '~constants'
import type { Plan } from './Plans'

export type FeaturesKeys =
  | 'personalization'
  | 'emailReminder'
  | '2FAsms'
  | '2FAemail'
  | 'whiteLabel'
  | 'liveStreaming'
  | 'anonymous'
  | 'overwrite'
  | 'liveResults'

// Translation keys for the subscription features
export const PlanFeaturesTranslationKeys = {
  [SubscriptionPermission.Users]: 'features.users',
  [SubscriptionPermission.SubOrgs]: 'features.sub_orgs',
  [SubscriptionPermission.CustomURL]: 'features.custom_url',
  [SubscriptionPermission.WeightedVoting]: 'features.weighted',
  [SubscriptionPermission.ApprovalVoting]: 'features.approval',
  // [SubscriptionPermission.RankedVoting]: 'features.ranked',
  [SubscriptionPermission.SingleVoting]: 'features.single',
  [SubscriptionPermission.MultipleVoting]: 'features.multiple',
  // [SubscriptionPermission.CumulativeVoting]: 'features.cumulative',
  [SubscriptionPermission.Personalization]: 'features.personalization',
  [SubscriptionPermission.EmailReminder]: 'features.email_reminder',
  [SubscriptionPermission.TwoFASms]: 'features.sms_notification',
  [SubscriptionPermission.TwoFAEmail]: 'features.email_notification',
  [SubscriptionPermission.WhiteLabel]: 'features.white_label',
  [SubscriptionPermission.LiveStreaming]: 'features.live_streaming',
  [SubscriptionPermission.Anonymous]: 'features.anonymous',
  [SubscriptionPermission.Overwrite]: 'features.overwrite',
  [SubscriptionPermission.LiveResults]: 'features.live_results',
  [SubscriptionPermission.PhoneSupport]: 'features.phone_support',
}

// Translation keys for the subscription features in the comparison table
export const PlanTableFeaturesTranslationKeys = {
  ...PlanFeaturesTranslationKeys,
  [SubscriptionPermission.Users]: 'features.total_users',
  [SubscriptionPermission.SubOrgs]: 'features.total_orgs',
}

export const CategorizedFeatureKeys = {
  votingTypes: ['single', 'multiple', 'approval', 'weighted'],
  organization: ['teamMembers'],
  features: ['2FAsms', '2FAemail', 'liveStreaming', 'anonymous', 'overwrite', 'liveResults'],
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
 * @param featurePath  - Dot notation path to the feature (e.g., 'organization.users').
 * @returns boolean - `true` if the feature exists, `false` otherwise.
 */
export const hasFeature = (plan: Plan, featurePath: string) => dotobject(plan, featurePath) !== 'undefined'

/**
 * Checks if a given feature exists and meets the required condition in a plan.
 *
 * @param plan - The plan object to check.
 * @param featurePath - Dot notation path to the feature (e.g., 'organization.users').
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
  t('features.users', { defaultValue: 'Up to {{ count }} users' })
  t('features.total_users', { defaultValue: 'Total available users' })
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
  t('features.sms_notification', { defaultValue: '2FA SMS' })
  t('features.email_notification', { defaultValue: '2FA Email' })
  t('features.white_label', { defaultValue: 'White label' })
  t('features.live_streaming', { defaultValue: 'Live streaming' })
  t('features.anonymous_voting', { defaultValue: 'Anonymous voting' })
  t('features.overwrite', { defaultValue: 'Vote overwrite' })
  t('features.live_results', { defaultValue: 'Live results' })
  t('features.phone_support', { defaultValue: 'Phone support' })
  // Section titles
  t('features.section.voting_types', { defaultValue: 'Voting Types' })
  t('features.section.features', { defaultValue: 'Features' })
  t('features.section.organization', { defaultValue: 'Organization' })

  return null
}
