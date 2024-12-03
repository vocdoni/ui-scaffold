import { useQuery } from '@tanstack/react-query'

const STRIPE_API_BASE_URL = 'https://api.stripe.com/v1'

type StripePrice = {
  id: string
  object: 'price'
  active: boolean
  unit_amount: number
  unit_amount_decimal: string
  currency: string
  nickname: string | null
  product: string
  metadata: Record<string, string>
  recurring: {
    aggregate_usage: 'last_during_period' | 'sum' | null
    interval: 'day' | 'month' | 'week' | 'year'
    interval_count: number
    trial_period_days: number | null
    usage_type: string
  }
}

type StripePlansResponse = {
  data: StripePrice[]
  has_more: boolean
  object: 'list'
  url: string
}

const fetchStripePlans = async (): Promise<StripePlansResponse> => {
  const publicKey = import.meta.env.STRIPE_PUBLIC_KEY
  if (!publicKey) {
    throw new Error('Stripe public key is missing')
  }

  const response = await fetch(`${STRIPE_API_BASE_URL}/prices`, {
    headers: {
      Authorization: `Bearer ${publicKey}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Failed to fetch Stripe plans')
  }

  return response.json()
}

export const useStripePlans = () => {
  return useQuery({
    queryKey: ['stripePlans'],
    queryFn: fetchStripePlans,
    // Cache for 20 minutes
    staleTime: 20 * 60 * 1000,
  })
}
