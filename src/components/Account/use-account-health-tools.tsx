import { useClient } from '@vocdoni/react-providers'
import { AccountData, ArchivedAccountData } from '@vocdoni/sdk'

const isRealAccount = (account: AccountData | ArchivedAccountData): account is AccountData => {
  return (account as AccountData).nonce !== undefined
}

export const useOrganizationHealthTools = () => {
  const { account, balance } = useClient()

  const exists = typeof account !== 'undefined' && isRealAccount(account) && account.account.name.default.length > 0
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
