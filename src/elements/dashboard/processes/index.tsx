import { useOrganization } from '@vocdoni/react-providers'
import { ElectionListWithPagination } from '@vocdoni/sdk'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLoaderData, useOutletContext, useParams } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import Votings from '~components/Organization/Dashboard/Votings'
import ProcessStatusFilter from '~components/Process/ProcessStatusFilters'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~routes'

const OrganizationVotings = () => {
  const { t } = useTranslation()
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const data = useLoaderData() as ElectionListWithPagination
  const { status } = useParams<{ status?: string }>()
  const { organization } = useOrganization()

  // Set page title
  useEffect(() => {
    setBreadcrumb([
      { title: t('organization.dashboard'), route: Routes.dashboard.base },
      {
        title: t('organization.votings_list', { defaultValue: 'Voting processes list' }),
        route: Routes.dashboard.base,
      },
    ])
  }, [setBreadcrumb])

  return (
    <DashboardContents display='flex' flexDirection='column'>
      {!!organization.electionIndex && <ProcessStatusFilter status={status} alignSelf='end' />}
      <Votings data={data as ElectionListWithPagination} status={status} />
    </DashboardContents>
  )
}

export default OrganizationVotings
