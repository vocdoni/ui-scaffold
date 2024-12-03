import { dotobject } from '@vocdoni/sdk'
import type { Plan } from './Plans'

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
  // Get the feature value using dot notation
  const featureValue = dotobject(plan, featurePath)

  // If the feature doesn't exist, return false
  if (typeof featureValue === 'undefined' || featureValue === null) {
    return false
  }

  // Handle exact match or comparison
  if (typeof expectedValue === 'number') {
    return featureValue >= expectedValue // Default to "greater than or equal to" for numbers
  }

  // Booleans are treated as exact matches
  if (typeof featureValue === 'boolean') {
    return featureValue
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
