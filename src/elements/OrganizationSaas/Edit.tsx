import EditProfile from '~components/AccountSaas/EditProfile'
import { useSaasOrganization } from '~components/AccountSaas/queries'
import QueryDataLayout from '~components/Layout/QueryDataLayout'

const OrganizationEdit = () => {
  const { isLoading, isError, error } = useSaasOrganization()

  return (
    <QueryDataLayout isLoading={isLoading} isError={isError} error={error}>
      <EditProfile />
    </QueryDataLayout>
  )
}

export default OrganizationEdit
