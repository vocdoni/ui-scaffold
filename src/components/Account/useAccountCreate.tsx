import { useClient } from '@vocdoni/react-providers'
import { Account, IAccount } from '@vocdoni/sdk'
import { useAccountHealthTools } from '~components/Account/use-account-health-tools'

export const useAccountCreate = () => {
  const {
    createAccount,
    updateAccount,
    errors: { account: error },
  } = useClient()

  // we want to know if account exists, not the organization (slight difference)
  const { exists } = useAccountHealthTools()

  const create = async (values: IAccount) => {
    let call = () =>
      createAccount({
        account: new Account(values),
      })

    if (exists) {
      call = () => updateAccount(new Account(values))
    }

    return call()
  }

  return { create, error }
}
