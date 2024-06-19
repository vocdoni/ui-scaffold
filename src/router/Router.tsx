import { useClient } from '@vocdoni/react-providers'
import { lazy } from 'react'
import { createBrowserRouter, Params, RouteObject, RouterProvider } from 'react-router-dom'
// These aren't lazy loaded since they are main layouts and related components
import Error from '~elements/Error'
import Layout from '~elements/Layout'
import LayoutProcessCreate from '~elements/LayoutProcessCreate'
import OrganizationProtectedRoute from './OrganizationProtectedRoute'
import { SuspenseLoader } from './SuspenseLoader'
import { ProcessPreview } from '~elements/Process'

// Lazy loading helps splitting the final code, which helps downloading the app (theoretically)
const ProtectedRoutes = lazy(() => import('./ProtectedRoutes'))
// elements
const Faucet = lazy(() => import('~elements/Faucet'))
const Home = lazy(() => import('~theme/components/Home'))
const NotFound = lazy(() => import('~elements/NotFound'))
const OrganizationView = lazy(() => import('~elements/Organization/View'))
const Process = lazy(() => import('~elements/Process'))
const OrganizationVotings = lazy(() => import('~elements/Organization/Votings'))
const OrganizationEdit = lazy(() => import('~elements/Organization/Edit'))
// others
const OrganizationDashboardLayout = lazy(() => import('~components/Organization/Dashboard/Layout'))
const OrganizationDashboard = lazy(() => import('~components/Organization/Dashboard'))
const ProcessCreateSteps = lazy(() => import('~components/ProcessCreate/Steps'))

export const RoutesProvider = () => {
  const { client } = useClient()

  const domains = import.meta.env.CUSTOM_ORGANIZATION_DOMAINS

  const mainLayoutRoutes: RouteObject[] = [
    {
      index: true,
      element: <SuspenseLoader>{domains[window.location.hostname] ? <OrganizationView /> : <Home />}</SuspenseLoader>,
      loader: async () => {
        if (domains[window.location.hostname]) {
          return client.fetchAccountInfo(domains[window.location.hostname])
        }
        return null
      },
    },
    {
      path: 'processes/:id',
      element: (
        <SuspenseLoader>
          <Process />
        </SuspenseLoader>
      ),
      loader: async ({ params }: { params: Params<string> }) => client.fetchElection(params.id),
      errorElement: <Error />,
    },
    {
      path: 'organization/:address',
      element: (
        <SuspenseLoader>
          <OrganizationView />
        </SuspenseLoader>
      ),
      loader: async ({ params }: { params: Params<string> }) => client.fetchAccountInfo(params.address),
      errorElement: <Error />,
    },
    {
      path: '*',
      element: (
        <SuspenseLoader>
          <NotFound />
        </SuspenseLoader>
      ),
    },
    {
      path: '/organization',
      element: (
        <SuspenseLoader>
          <OrganizationDashboardLayout />
        </SuspenseLoader>
      ),
      children: [
        {
          element: (
            <SuspenseLoader>
              <OrganizationProtectedRoute />
            </SuspenseLoader>
          ),
          children: [
            {
              path: '',
              element: (
                <SuspenseLoader>
                  <OrganizationDashboard />
                </SuspenseLoader>
              ),
            },
            {
              path: 'votings/:page?/:status?',
              element: (
                <SuspenseLoader>
                  <OrganizationVotings />
                </SuspenseLoader>
              ),
            },
            {
              path: 'edit',
              element: (
                <SuspenseLoader>
                  <OrganizationEdit />
                </SuspenseLoader>
              ),
            },
          ],
        },
      ],
    },
  ]

  // Add faucet if feature is enabled
  if (import.meta.env.features.faucet) {
    mainLayoutRoutes.push({
      path: 'faucet',
      element: (
        <SuspenseLoader>
          <Faucet />
        </SuspenseLoader>
      ),
    })
  }

  const routes = [
    {
      path: '/',
      element: <Layout />,
      children: mainLayoutRoutes,
    },
    {
      element: <LayoutProcessCreate />,
      children: [
        {
          element: (
            <SuspenseLoader>
              <ProtectedRoutes />
            </SuspenseLoader>
          ),
          children: [
            {
              path: 'processes/create',
              element: (
                <SuspenseLoader>
                  <ProcessCreateSteps />
                </SuspenseLoader>
              ),
            },
            {
              path: 'processes/preview',
              element: <ProcessPreview />,
            },
          ],
        },
      ],
    },
  ]
  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />
}
