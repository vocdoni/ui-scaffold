import { useClient } from '@vocdoni/react-providers'
import { AccountData, ArchivedAccountData } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const isSignerAccount = (account: AccountData | ArchivedAccountData): account is AccountData => {
  return (account as AccountData).nonce !== undefined
}

export const useOrganizationHealthTools = () => {
  const { account, balance } = useClient()

  const exists = typeof account !== 'undefined' && isSignerAccount(account) && account.account.name.default.length > 0
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

export const useAccountHealthTools = () => {
  const { account } = useClient()

  const exists = typeof account !== 'undefined' && isSignerAccount(account)

  return {
    exists,
  }
}

/**
 * Creates an account if it is connected and does not exist yet.
 */
export const useAccountCreator = () => {
  const { isConnected } = useAccount()
  const { client, account, createAccount } = useClient()

  const { exists } = useAccountHealthTools()
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!isConnected || (isConnected && exists) || creating || !client.wallet) return
    ;(async () => {
      setCreating(true)
      await createAccount()
      setCreating(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, exists, account, client.wallet, creating])
}
