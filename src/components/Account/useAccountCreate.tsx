import { useClient } from '@vocdoni/react-providers'
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query'
import { Account } from '@vocdoni/sdk'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'

export interface CreateAccountParams {
  name: string
  description: string
}

export const useAccountCreate = (
  options?: Omit<UseMutationOptions<void, Error, CreateAccountParams>, 'mutationFn'>
) => {
  const { createAccount, updateAccount } = useClient()
  // we want to know if account exists, not the organization (slight difference)
  const { exists } = useAccountHealthTools()

  const create = async (values: CreateAccountParams) => {
    let call = () =>
      createAccount({
        account: new Account(values),
      })

    if (exists) {
      call = () => updateAccount(new Account(values))
    }

    return call()
  }

  return useMutation({ mutationFn: create, ...options })
}
