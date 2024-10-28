import EditProfile from '~components/Account/EditProfile'
import { useSaasAccount } from '~components/Account/useSaasAccount'
import { DashboardContents } from '~components/Layout/Dashboard'
import QueryDataLayout from '~components/Layout/QueryDataLayout'

const OrganizationEdit = () => {
  const { isLoading, isError, error } = useSaasAccount()

  return (
    <QueryDataLayout isLoading={isLoading} isError={isError} error={error}>
      <DashboardContents>
        <EditProfile />
      </DashboardContents>
    </QueryDataLayout>
  )
}

export default OrganizationEdit
