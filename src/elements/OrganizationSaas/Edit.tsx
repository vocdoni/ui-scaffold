import EditProfile from '~components/AccountSaas/EditProfile'
import QueryDataLayout from '~components/Layout/QueryDataLayout'
import { useSaasAccount } from '~components/AccountSaas/useSaasAccount'

const OrganizationEdit = () => {
  const { isLoading, isError, error } = useSaasAccount()

  return (
    <QueryDataLayout isLoading={isLoading} isError={isError} error={error}>
      <EditProfile />
    </QueryDataLayout>
  )
}

export default OrganizationEdit
