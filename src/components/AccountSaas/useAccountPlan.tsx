import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type PlanType = 'free' | 'pro' | 'custom'

type FeaturesKeys = 'personalization' | 'emailReminder' | 'smsNotification' | 'whiteLabel' | 'liveStreaming'
type VotingTypesKeys = 'single' | 'multiple' | 'approval' | 'cumulative' | 'ranked' | 'weighted'
type SaasOrganizationInfo = {
  memberships: number
  subOrgs: number
  maxProcesses: number
  max_census_size: number
  customURL: boolean
}

type AccountPlanTypeResponse = {
  plan: PlanType
  stripePlanId: string
  organization: SaasOrganizationInfo
  votingTypes: Record<VotingTypesKeys, boolean>
  features: Record<FeaturesKeys, boolean>
}

const accountPlanMock: AccountPlanTypeResponse = {
  plan: 'pro',
  stripePlanId: 'plan_xyz123', // Stripe plan ID for payment and plan management
  organization: {
    memberships: 5, // Maximum number of members or admins
    subOrgs: 3, // Maximum number of sub-organizations
    maxProcesses: 10, // Maximum number of voting processes
    max_census_size: 10000, // Maximum number of voters (census size) for this plan
    customURL: true, // Whether a custom URL for the voting page is allowed
  },
  votingTypes: {
    single: true, // Simple single-choice voting allowed
    multiple: true, // Multiple-choice voting allowed
    approval: true, // Approval voting allowed
    cumulative: false, // Cumulative voting not allowed
    ranked: false, // Ranked voting not allowed
    weighted: false, // Weighted voting not allowed
  },
  features: {
    personalization: true, // Voting page customization allowed
    emailReminder: true, // Email reminders allowed
    smsNotification: true, // SMS notifications allowed
    whiteLabel: true, // White-label voting page allowed
    liveStreaming: false, // Live results streaming not allowed
    // ... Other feature controls
  },
}

export const useAccountPlan = (options?: Omit<UseQueryOptions<AccountPlanTypeResponse>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['account', 'plan'],
    queryFn: async () => {
      // Simulate an API call
      return accountPlanMock
    },
    ...options,
  })
}
