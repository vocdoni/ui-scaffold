import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { useSaasAccount } from '~components/Account/useSaasAccount'
import { DashboardContents } from '~components/Layout/Dashboard'
import QueryDataLayout from '~components/Layout/QueryDataLayout'
import EditOrganization from '~components/Organization/Edit'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'

const OrganizationEdit = () => {
  const { t } = useTranslation()
  const { isLoading, isError, error } = useSaasAccount()
  const { setTitle } = useOutletContext<DashboardLayoutContext>()

  // Set layout variables
  useEffect(() => {
    setTitle(t('organization.title.dashboard', { defaultValue: 'Organization' }))
  }, [setTitle])

  return (
    <QueryDataLayout isLoading={isLoading} isError={isError} error={error}>
      <DashboardContents>
        <EditOrganization />
      </DashboardContents>
    </QueryDataLayout>
  )
}

export default OrganizationEdit
