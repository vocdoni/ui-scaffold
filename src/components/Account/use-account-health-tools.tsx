import { useClient } from '@vocdoni/chakra-components'
import { useEffect } from 'react'

export const useAccountHealthTools = () => {
  const { account, balance, fetchAccount } = useClient()

  useEffect(() => {
    if (typeof account !== 'undefined') return

    fetchAccount()
  }, [account, fetchAccount])

  const exists = typeof account !== 'undefined'
  const isHealthy = exists && balance > 0
  const existsVariation = (existant: any, notExistant: any) => (exists ? existant : notExistant)
  const healthVariation = (healthy: any, unhealthy: any) => (isHealthy ? healthy : unhealthy)

  return {
    exists,
    existsVariation,
    healthVariation,
    isHealthy,
  }
}
