import { useClient } from '@vocdoni/react-providers'
import { VocdoniSDKClient } from '@vocdoni/sdk'
import { lazy } from 'react'
// These aren't lazy loaded since they are main layouts and related components
import { Params } from 'react-router-dom'
import Error from '~elements/Error'
import LayoutDashboard from '~elements/LayoutDashboard'
import { Routes } from '.'
import OrganizationProtectedRoute from '../OrganizationProtectedRoute'
import { SuspenseLoader } from '../SuspenseLoader'

// elements/pages
const OrganizationEdit = lazy(() => import('~elements/dashboard/organization'))
const DashboardProcesses = lazy(() => import('~elements/dashboard/processes'))
const DashboardProcessView = lazy(() => import('~elements/dashboard/processes/view'))
const OrganizationTeam = lazy(() => import('~elements/dashboard/team'))

// others
const OrganizationDashboard = lazy(() => import('~components/Organization/Dashboard'))

const DashboardElements = (client: VocdoniSDKClient) => [
  {
    element: (
      <SuspenseLoader>
        <LayoutDashboard />
      </SuspenseLoader>
    ),
    children: [
      {
        path: Routes.dashboard.base,
        element: (
          <SuspenseLoader>
            <OrganizationDashboard />
          </SuspenseLoader>
        ),
      },
      {
        path: Routes.dashboard.process,
        element: (
          <SuspenseLoader>
            <DashboardProcessView />
          </SuspenseLoader>
        ),
        loader: async ({ params }: { params: Params<string> }) => client.fetchElection(params.id),
        errorElement: <Error />,
      },
      {
        path: Routes.dashboard.organization,
        element: (
          <SuspenseLoader>
            <OrganizationEdit />
          </SuspenseLoader>
        ),
      },
      {
        path: Routes.dashboard.processes,
        element: (
          <SuspenseLoader>
            <DashboardProcesses />
          </SuspenseLoader>
        ),
      },
      {
        path: Routes.dashboard.team,
        element: (
          <SuspenseLoader>
            <OrganizationTeam />
          </SuspenseLoader>
        ),
      },
    ],
  },
]

export const useDashboardRoutes = () => {
  const { client } = useClient()
  return {
    element: (
      <SuspenseLoader>
        <OrganizationProtectedRoute />
      </SuspenseLoader>
    ),
    children: DashboardElements(client),
  }
}
