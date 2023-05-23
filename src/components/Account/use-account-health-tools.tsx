import { useClient } from '@vocdoni/chakra-components'
import { useEffect } from 'react'

export const useAccountHealthTools = () => {
  const { account, balance, fetchAccount } = useClient()

  useEffect(() => {
    if (typeof account !== 'undefined') return

    fetchAccount()
  }, [account, fetchAccount])

  const isHealthy = () => account && balance > 0

  const healthVariation = (healthy: any, unhealthy: any) => {
    if (isHealthy()) {
      return healthy
    }
    return unhealthy
  }

  return {
    exists: typeof account !== 'undefined',
    isHealthy,
    healthVariation,
  }
}
