// These aren't lazy loaded since they are main layouts and related components
import { useQueryClient } from '@tanstack/react-query'
import { useClient } from '@vocdoni/react-providers'
import { lazy } from 'react'
import { LoaderFunctionArgs, Navigate, Params } from 'react-router-dom'
import { Groups } from '~components/Members/Groups'
import { MembersTable } from '~components/Members/MembersTable'
import Members from '~elements/dashboard/members'
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
const OrganizationEdit = lazy(() => import('~components/Organization/Dashboard/Organization'))
const SubscriptionPage = lazy(() => import('~components/Organization/Dashboard/Subscription'))
const OrganizationSupport = lazy(() => import('~components/Organization/Dashboard/Support'))
const OrganizationTeam = lazy(() => import('~components/Organization/Dashboard/Team'))
const Profile = lazy(() => import('~elements/dashboard/profile'))
const Settings = lazy(() => import('~elements/dashboard/settings'))

// others
const Dashboard = lazy(() => import('~elements/dashboard'))

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
          {
            path: Routes.dashboard.base,
            element: (
              <SuspenseLoader>
                <Dashboard />
              </SuspenseLoader>
            ),
            errorElement: <Error />,
          },
          {
            path: Routes.dashboard.profile,
            element: (
              <SuspenseLoader>
                <Profile />
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
                path: Routes.dashboard.memberbase.base,
                element: (
                  <SuspenseLoader>
                    <Members />
                  </SuspenseLoader>
                ),
                children: [
                  {
                    index: true,
                    element: <Navigate to={Routes.dashboard.memberbase.members} replace />,
                  },
                  {
                    path: Routes.dashboard.memberbase.members,
                    element: (
                      <SuspenseLoader>
                        <MembersTable />
                      </SuspenseLoader>
                    ),
                  },
                  {
                    path: Routes.dashboard.memberbase.groups,
                    element: (
                      <SuspenseLoader>
                        <Groups />
                      </SuspenseLoader>
                    ),
                  },
                ],
              },
              {
                path: Routes.dashboard.settings.base,
                element: (
                  <SuspenseLoader>
                    <Settings />
                  </SuspenseLoader>
                ),
                children: [
                  {
                    index: true,
                    element: <Navigate to={Routes.dashboard.settings.organization} replace />,
                  },
                  {
                    path: Routes.dashboard.settings.organization,
                    element: (
                      <SuspenseLoader>
                        <OrganizationEdit />
                      </SuspenseLoader>
                    ),
                  },
                  {
                    path: Routes.dashboard.settings.team,
                    element: (
                      <SuspenseLoader>
                        <OrganizationTeam />
                      </SuspenseLoader>
                    ),
                  },
                  {
                    path: Routes.dashboard.settings.subscription,
                    element: (
                      <SuspenseLoader>
                        <SubscriptionPage />
                      </SuspenseLoader>
                    ),
                  },
                  {
                    path: Routes.dashboard.settings.support,
                    element: (
                      <SuspenseLoader>
                        <OrganizationSupport />
                      </SuspenseLoader>
                    ),
                  },
                ],
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
