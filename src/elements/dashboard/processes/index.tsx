import { ElectionListWithPagination } from '@vocdoni/sdk'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLoaderData, useOutletContext } from 'react-router-dom'
import Votings from '~components/Organization/Dashboard/Votings'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'

const OrganizationVotings = () => {
  const { t } = useTranslation()
  const { setBack, setTitle } = useOutletContext<DashboardLayoutContext>()
  const data = useLoaderData()

  // Set page title
  useEffect(() => {
    setTitle(t('organization.votings_list', { defaultValue: 'Voting processes list' }))
    setBack(null)
  }, [setTitle, setBack])

  return <Votings data={data as ElectionListWithPagination} />
}

export default OrganizationVotings
