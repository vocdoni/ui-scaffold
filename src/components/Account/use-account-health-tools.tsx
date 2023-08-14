import { useClient } from '@vocdoni/react-providers'

export const useAccountHealthTools = () => {
  const { account, balance } = useClient()

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
