import { dotobject } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import type { Plan } from './Plans'

export type FeaturesKeys = 'personalization' | 'emailReminder' | 'smsNotification' | 'whiteLabel' | 'liveStreaming'

// Translation keys for the subscription features
export const PlanFeaturesTranslationKeys = {
  'organization.memberships': 'features.memberships',
  'organization.subOrgs': 'features.sub_orgs',
  'votingTypes.weighted': 'features.weighted',
  'votingTypes.approval': 'features.approval',
  'votingTypes.ranked': 'features.ranked',
  'features.personalization': 'features.personalization',
  'features.emailReminder': 'features.email_reminder',
  'features.smsNotification': 'features.sms_notification',
}

/**
 * Checks if the specified feature exists in the plan.
 *
 * @param plan  - The plan object to check.
 * @param featurePath  - Dot notation path to the feature (e.g., 'organization.memberships').
 * @returns boolean - `true` if the feature exists, `false` otherwise.
 */
export const hasFeature = (plan: Plan, featurePath: string) => dotobject(plan, featurePath) !== 'undefined'

/**
 * Checks if a given feature exists and meets the required condition in a plan.
 *
 * @param plan - The plan object to check.
 * @param featurePath - Dot notation path to the feature (e.g., 'organization.memberships').
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
// note this component does not need (and should never) to be included in the app
const UnusedComponentButRequiredToNotLoseTranslations = () => {
  const { t } = useTranslation()
  t('features.memberships', { defaultValue: 'Up to {{ count }} memberships' })
  t('features.sub_orgs', { defaultValue: 'Up to {{ count }} sub-organizations' })
  t('features.approval', { defaultValue: 'Approval voting' })
  t('features.ranked', { defaultValue: 'Ranked voting' })
  t('features.weighted', { defaultValue: 'Weighted voting' })
  t('features.personalization', { defaultValue: 'Personalization' })
  t('features.email_reminder', { defaultValue: 'Email reminder' })
  t('features.sms_notification', { defaultValue: 'SMS notification' })

  return null
}
