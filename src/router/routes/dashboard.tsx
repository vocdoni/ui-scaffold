// These aren't lazy loaded since they are main layouts and related components
import {useQueryClient} from '@tanstack/react-query'
import {useClient} from '@vocdoni/react-providers'
import {lazy} from 'react'
import {Params} from 'react-router-dom'
import {Profile} from '~elements/dashboard/profile'
import Error from '~elements/Error'
import LayoutDashboard from '~elements/LayoutDashboard'
import {paginatedElectionsQuery} from '~src/queries/organization'
import OrganizationProtectedRoute from '~src/router/OrganizationProtectedRoute'
import {Routes} from '.'
import AccountProtectedRoute from '../AccountProtectedRoute'
import {SuspenseLoader} from '../SuspenseLoader'

// elements/pages
const OrganizationEdit = lazy(() => import('~elements/dashboard/organization'))
const DashBoardCreateOrg = lazy(() => import('~elements/dashboard/organization/createOrganization'))
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
        <AccountProtectedRoute />
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
            path: Routes.dashboard.profile,
            element: (
              <SuspenseLoader>
                <Profile />
              </SuspenseLoader>
            ),
          },
          {
            path: Routes.dashboard.organizationCreate,
            element: (
              <SuspenseLoader>
                <DashBoardCreateOrg />
              </SuspenseLoader>
            ),
          },
          // Protected routes if no account created without organization
          {
            element: (
              <SuspenseLoader>
                <OrganizationProtectedRoute />
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
      },
    ],
  }
}
