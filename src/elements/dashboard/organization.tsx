import { useSaasAccount } from '~components/Account/useSaasAccount'
import { DashboardContents } from '~components/Layout/Dashboard'
import QueryDataLayout from '~components/Layout/QueryDataLayout'
import EditOrganization from '~components/Organization/Edit'

const OrganizationEdit = () => {
  const { isLoading, isError, error } = useSaasAccount()

  return (
    <QueryDataLayout isLoading={isLoading} isError={isError} error={error}>
      <DashboardContents>
        <EditOrganization />
      </DashboardContents>
    </QueryDataLayout>
  )
}

export default OrganizationEdit
