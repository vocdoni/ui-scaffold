import { useSaasAccount } from '~components/Account/SaasAccountProvider'
import EditOrganization from '~components/Organization/Edit'
import QueryDataLayout from '~components/shared/Layout/QueryDataLayout'

const OrganizationEdit = () => {
  const { isLoading, isError, error } = useSaasAccount()

  return (
    <QueryDataLayout isLoading={isLoading} isError={isError} error={error}>
      <EditOrganization />
    </QueryDataLayout>
  )
}

export default OrganizationEdit
