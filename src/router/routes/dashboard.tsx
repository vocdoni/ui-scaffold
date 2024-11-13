import { useClient } from '@vocdoni/react-providers'
import { lazy } from 'react'
// These aren't lazy loaded since they are main layouts and related components
import { useQueryClient } from '@tanstack/react-query'
import { Params } from 'react-router-dom'
import { Profile } from '~elements/dashboard/profile'
import Error from '~elements/Error'
import LayoutDashboard from '~elements/LayoutDashboard'
import { paginatedElectionsQuery } from '~src/queries/organization'
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

export const useDashboardRoutes = () => {
  const queryClient = useQueryClient()
  const { client, account } = useClient()

  return {
    element: (
      <SuspenseLoader>
        <OrganizationProtectedRoute />
      </SuspenseLoader>
    ),
    children: [
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
            path: Routes.dashboard.profile,
            element: (
              <SuspenseLoader>
                <Profile />
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
            loader: async ({ params }) =>
              await queryClient.ensureQueryData(paginatedElectionsQuery(account, client, params)),
            errorElement: <Error />,
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
    ],
  }
}
