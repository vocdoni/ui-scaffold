import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ElectionProvider, OrganizationProvider, useOrganization } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useLoaderData, useNavigate, useOutletContext } from 'react-router-dom'
import { ProcessView } from '~components/Dashboard/ProcessView'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~src/router/routes'

const DashboardProcessViewElement = () => {
  const { organization } = useOrganization()
  const { t } = useTranslation()
  const election = useLoaderData() as PublishedElection
  const { setBreadcrumb } = useOutletContext<DashboardLayoutContext>()
  const navigate = useNavigate()

  // redirect to public view if not an owner (may need changes when org roles are in effect)
  useEffect(() => {
    if (!organization || !election) return
    if (organization.address !== election.organizationId) {
      return navigate(generatePath(Routes.processes.view, { id: election.id }))
    }
    setBreadcrumb([
      {
        title: t('voting_processes', { defaultValue: 'Voting processes' }),
        route: Routes.dashboard.processes,
      },
      {
        title: election.title.default,
      },
    ])
  }, [organization, election])

  return (
    <OrganizationProvider id={election.organizationId}>
      <ElectionProvider election={election} ConnectButton={ConnectButton} fetchCensus autoUpdate>
        <ProcessView />
      </ElectionProvider>
    </OrganizationProvider>
  )
}

export default DashboardProcessViewElement
