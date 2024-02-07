import { Button, ModalBody, Text } from '@chakra-ui/react'
import { useConfirm } from '@vocdoni/chakra-components'
import { useClient } from '@vocdoni/react-providers'
import { AccountData, ArchivedAccountData } from '@vocdoni/sdk'
import { useCallback, useEffect, useState } from 'react'
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
  const { confirm, isOpen } = useConfirm()
  const { exists } = useAccountHealthTools()
  const [creating, setCreating] = useState<boolean>(false)

  console.log('hook rendered')

  useEffect(() => {
    if (!isConnected || (isConnected && exists) || !client.wallet || isOpen || creating) return
    ;(async () => {
      setCreating(true)
      await confirm(<CreatingAccountModal />)
      setCreating(false)
    })()
    // ;(async () => {
    //   if (creating) return

    //   setCreating(true)
    //   await createAccount()
    //   setCreating(false)
    // })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, exists, account, client.wallet])
}

const CreatingAccountModal = () => {
  const { isConnected } = useAccount()
  const {
    client,
    account,
    createAccount,
    errors: { create: error },
  } = useClient()
  const { exists } = useAccountHealthTools()
  const [creating, setCreating] = useState<boolean>(false)

  console.log('modal rendered')

  const create = useCallback(async () => {
    console.log('entra al create')
    if (creating) return

    setCreating(true)
    await createAccount()
    setCreating(false)
  }, [creating])

  useEffect(() => {
    console.log("entra a l'efecte")
    if (!isConnected || (isConnected && exists) || creating || !client.wallet) return
    ;(async () => {
      create()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, exists, account, client.wallet])

  return (
    <ModalBody>
      <p>Creating...!</p>
      {error && (
        <>
          <Text color='error' textAlign='center' mt={5}>
            {error}
          </Text>
          <Button onClick={create}>Retry</Button>
        </>
      )}
    </ModalBody>
  )
}
