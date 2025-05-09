// These aren't lazy loaded since they are main layouts and related components
import { useQueryClient } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { lazy } from 'react'
import { LoaderFunctionArgs, Params } from 'react-router-dom'
import { Profile } from '~elements/dashboard/profile'
import Settings from '~elements/dashboard/settings'
import Error from '~elements/Error'
import LayoutDashboard from '~elements/LayoutDashboard'
import { paginatedElectionsQuery } from '~src/queries/organization'
import OrganizationProtectedRoute from '~src/router/OrganizationProtectedRoute'
import ProtectedRoutes from '~src/router/ProtectedRoutes'
import { getPaginationParams } from '~src/utils/pagination'
import { Routes } from '.'
import AccountProtectedRoute from '../AccountProtectedRoute'
import { SuspenseLoader } from '../SuspenseLoader'

// elements/pages
const DashboardCreateOrg = lazy(() => import('~elements/dashboard/organization/create'))
const DashboardProcesses = lazy(() => import('~elements/dashboard/processes'))
const DashboardProcessView = lazy(() => import('~elements/dashboard/processes/view'))
const ProcessCreate = lazy(() => import('~elements/dashboard/processes/create'))

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
            path: Routes.dashboard.organizationCreate,
            element: (
              <SuspenseLoader>
                <DashboardCreateOrg />
              </SuspenseLoader>
            ),
          },
          // Protected routes if account created without organization
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
                path: Routes.dashboard.processes,
                element: (
                  <SuspenseLoader>
                    <DashboardProcesses />
                  </SuspenseLoader>
                ),
                loader: async ({ params, request }: LoaderFunctionArgs) => {
                  const url = new URL(request.url)
                  const queryParams = getPaginationParams(url.searchParams)
                  // we want our route params to override the query params
                  const mergedParams = { ...queryParams, ...params }

                  return await queryClient.ensureQueryData(paginatedElectionsQuery(account, client, mergedParams))
                },
                errorElement: <Error />,
              },
              {
                path: Routes.dashboard.settings,
                element: (
                  <SuspenseLoader>
                    <Settings />
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
                ...ProtectedRoutes([
                  {
                    path: Routes.processes.create,
                    element: (
                      <SuspenseLoader>
                        <ProcessCreate />
                      </SuspenseLoader>
                    ),
                  },
                ]),
              },
            ],
          },
        ],
      },
    ],
  }
}
