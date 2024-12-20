import { createContext } from '@chakra-ui/react-utils'
import { useQuery } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { dotobject, ensure0x } from '@vocdoni/sdk'
import { ReactNode, useMemo } from 'react'
import { useAuth } from '~components/Auth/useAuth'
import type { Plan } from '~components/Pricing/Plans'
import { ApiEndpoints } from './api'

type PermissionsContextType = {
  permission: (key: string) => any
  subscription: SubscriptionType
  loading: boolean
}

type SubscriptionType = {
  subscriptionDetails: {
    planID: number
    startDate: string
    endDate: string
    renewalDate: string
    active: boolean
    maxCensusSize: number
    email: string
  }
  usage: {
    sentSMS: number
    sentEmails: number
    subOrgs: number
    members: number
  }
  plan: Plan
}

const [SubscriptionProvider, useSubscription] = createContext<PermissionsContextType>({
  name: 'PermissionsContext',
  errorMessage: 'usePermissions must be used within a PermissionsProvider',
})

const SubscriptionProviderComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { bearedFetch } = useAuth()
  const { account } = useClient()

  // Fetch organization subscription details
  // TODO: In the future, this may be merged with the role permissions (not yet defined)
  const { data: subscription, isFetching } = useQuery({
    queryKey: ['organizationSubscription', account?.address],
    queryFn: () =>
      bearedFetch<SubscriptionType>(
        ApiEndpoints.OrganizationSubscription.replace('{address}', ensure0x(account?.address))
      ),
    // Cache for 15 minutes
    staleTime: 15 * 60 * 1000,
    enabled: !!account?.address,
  })

  // Helper function to access permission using dot notation
  const permission = useMemo(() => {
    return (key: string) => {
      if (!subscription || !subscription.plan) return undefined
      return dotobject(subscription.plan, key)
    }
  }, [subscription])

  const value = { permission, subscription, loading: isFetching }

  return <SubscriptionProvider value={value} children={children} />
}

export { SubscriptionProviderComponent as SubscriptionProvider, useSubscription }
