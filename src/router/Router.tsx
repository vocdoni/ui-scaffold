import { useClient } from '@vocdoni/react-providers'
import { lazy } from 'react'
import { createBrowserRouter, Params, RouteObject, RouterProvider } from 'react-router-dom'
// These aren't lazy loaded since they are main layouts and related components
import Error from '~elements/Error'
import Layout from '~elements/Layout'
import LayoutAuth from '~elements/LayoutAuth'
import LayoutProcessCreate from '~elements/LayoutProcessCreate'
import { StripeCheckout, StripeReturn } from '~elements/Stripe'
import { SuspenseLoader } from './SuspenseLoader'

// Lazy loading helps splitting the final code, which helps downloading the app (theoretically)
const ProtectedRoutes = lazy(() => import('./SaasProtectedRoutes'))
const OrganizationProtectedRoute = lazy(() => import('./SaasOrganizationProtectedRoute'))
const AccountProtectedRoute = lazy(() => import('./AccountProtectedRoute'))

// elements
const Faucet = lazy(() => import('~elements/Faucet'))
const Home = lazy(() => import('~components/Home'))
const NotFound = lazy(() => import('~elements/NotFound'))
const Process = lazy(() => import('~elements/Process'))
const OrganizationEditProfile = lazy(() => import('~elements/Organization/Edit'))
const OrganizationView = lazy(() => import('~elements/Organization/View'))
const OrganizationVotings = lazy(() => import('~elements/Organization/Votings'))

// others
const OrganizationDashboardLayout = lazy(() => import('~components/Organization/Dashboard/Layout'))
const OrganizationDashboard = lazy(() => import('~components/Organization/Dashboard'))
const OrganizationTeam = lazy(() => import('~components/Organization/Dashboard/Team'))
const ProcessCreateSteps = lazy(() => import('~components/ProcessCreate/Steps'))
const Terms = lazy(() => import('~components/TermsAndPrivacy/Terms'))
const Privacy = lazy(() => import('~components/TermsAndPrivacy/Privacy'))
const SignIn = lazy(() => import('~components/Auth/SignIn'))
const SignUp = lazy(() => import('~components/Auth/SignUp'))
const Verify = lazy(() => import('~components/Auth/Verify'))
const ForgotPassword = lazy(() => import('~components/Auth/ForgotPassword'))
const Calculator = lazy(() => import('~components/Calculator'))

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
      path: 'terms',
      element: (
        <SuspenseLoader>
          <Terms />
        </SuspenseLoader>
      ),
    },
    {
      path: 'privacy',
      element: (
        <SuspenseLoader>
          <Privacy />
        </SuspenseLoader>
      ),
    },
    {
      path: 'stripe',
      element: (
        <SuspenseLoader>
          <OrganizationProtectedRoute />
        </SuspenseLoader>
      ),
      children: [
        {
          path: 'checkout/:amount?',
          element: <StripeCheckout />,
        },
        {
          path: 'return/:sessionId',
          element: <StripeReturn />,
          errorElement: <Error />,
        },
      ],
    },
    {
      path: 'faucet',
      element: (
        <SuspenseLoader>
          <Faucet />
        </SuspenseLoader>
      ),
    },
    {
      path: 'calculator',
      element: (
        <SuspenseLoader>
          <Calculator />
        </SuspenseLoader>
      ),
    },
    {
      path: '*',
      element: (
        <SuspenseLoader>
          <NotFound />
        </SuspenseLoader>
      ),
    },
  ]

  const routes: RouteObject[] = [
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
          ],
        },
      ],
    },
    {
      path: 'account',
      element: (
        <SuspenseLoader>
          <AccountProtectedRoute />
        </SuspenseLoader>
      ),
      children: [
        {
          element: <LayoutAuth />,
          children: [
            {
              children: [
                {
                  path: 'signin',
                  element: (
                    <SuspenseLoader>
                      <SignIn />
                    </SuspenseLoader>
                  ),
                },
                {
                  path: 'signup',
                  element: (
                    <SuspenseLoader>
                      <SignUp />
                    </SuspenseLoader>
                  ),
                },
                {
                  path: 'recovery',
                  element: (
                    <SuspenseLoader>
                      <ForgotPassword />
                    </SuspenseLoader>
                  ),
                },
                {
                  path: 'verify',
                  element: (
                    <SuspenseLoader>
                      <Verify />
                    </SuspenseLoader>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/organization',
      element: (
        <SuspenseLoader>
          <OrganizationProtectedRoute />
        </SuspenseLoader>
      ),
      children: [
        {
          element: (
            <SuspenseLoader>
              <OrganizationDashboardLayout />
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
              path: 'team',
              element: (
                <SuspenseLoader>
                  <OrganizationTeam />
                </SuspenseLoader>
              ),
            },
            {
              path: 'profile',
              element: (
                <SuspenseLoader>
                  <OrganizationEditProfile />
                </SuspenseLoader>
              ),
            },
          ],
        },
      ],
    },
  ]

  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />
}
