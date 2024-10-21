import EditProfile from '~components/Account/EditProfile'
import { useSaasAccount } from '~components/Account/useSaasAccount'
import QueryDataLayout from '~components/Layout/QueryDataLayout'

const OrganizationEdit = () => {
  const { isLoading, isError, error } = useSaasAccount()

  return (
    <QueryDataLayout isLoading={isLoading} isError={isError} error={error}>
      <EditProfile />
    </QueryDataLayout>
  )
}

export default OrganizationEdit
