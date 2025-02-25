import { ElectionListWithPagination } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLoaderData, useOutletContext, useParams } from 'react-router-dom'
import { DashboardContents } from '~components/Layout/Dashboard'
import Votings from '~components/Organization/Dashboard/Votings'
import ProcessStatusFilter from '~components/Process/ProcessStatusFilters'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'

const OrganizationVotings = () => {
  const { t } = useTranslation()
  const { setBack, setTitle } = useOutletContext<DashboardLayoutContext>()
  const data = useLoaderData() as ElectionListWithPagination
  const { status } = useParams<{ status?: string }>()
  const { elections } = data
  const [allElectionsLength, setAllElectionsLength] = useState<number>()

  // Set page title
  useEffect(() => {
    setTitle(t('organization.votings_list', { defaultValue: 'Voting processes list' }))
    setBack(null)
    setAllElectionsLength(elections.length)
  }, [setTitle, setBack])

  return (
    <DashboardContents display='flex' flexDirection='column'>
      {!!allElectionsLength && <ProcessStatusFilter status={status} alignSelf='end' />}
      <Votings data={data as ElectionListWithPagination} status={status} />
    </DashboardContents>
  )
}

export default OrganizationVotings
