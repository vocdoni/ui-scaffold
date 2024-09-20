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
const ScaffoldProtectedRoutes = lazy(() => import('./ProtectedRoutes'))
const SaasProtectedRoutes = lazy(() => import('./SaasProtectedRoutes'))
const ScaffoldOrganizationProtectedRoutes = lazy(() => import('./OrganizationProtectedRoute'))
const SaasOrganizationProtectedRoutes = lazy(() => import('./SaasOrganizationProtectedRoute'))
// elements
const Faucet = lazy(() => import('~elements/Faucet'))
const Home = lazy(() => import('~theme/components/Home'))
const NotFound = lazy(() => import('~elements/NotFound'))
const OrganizationView = lazy(() => import('~elements/Organization/View'))
const Process = lazy(() => import('~elements/Process'))
const OrganizationVotings = lazy(() => import('~elements/Organization/Votings'))
const OrganizationVotingsSaas = lazy(() => import('~elements/OrganizationSaas/Votings'))
const OrganizationEdit = lazy(() => import('~elements/Organization/Edit'))

// others
const OrganizationDashboardLayout = lazy(() => import('~components/Organization/Dashboard/Layout'))
const OrganizationDashboardLayoutSaas = lazy(() => import('~components/OrganizationSaas/Dashboard/Layout'))
const OrganizationDashboard = lazy(() => import('~components/Organization/Dashboard'))
const OrganizationDashboardSaas = lazy(() => import('~components/OrganizationSaas/Dashboard'))
const OrganizationTeamSaas = lazy(() => import('~components/OrganizationSaas/Dashboard/Team'))
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
  const isSaas = !!import.meta.env.SAAS_URL

  const OrganizationProtectedRoute = isSaas ? SaasOrganizationProtectedRoutes : ScaffoldOrganizationProtectedRoutes
  const ProtectedRoutes = isSaas ? SaasProtectedRoutes : ScaffoldProtectedRoutes

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
      path: '*',
      element: (
        <SuspenseLoader>
          <NotFound />
        </SuspenseLoader>
      ),
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
  ]

  if (isSaas) {
    routes.push(
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
                path: 'account/recovery',
                element: (
                  <SuspenseLoader>
                    <ForgotPassword />
                  </SuspenseLoader>
                ),
              },
              {
                path: 'account/verify',
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
                <OrganizationDashboardLayoutSaas />
              </SuspenseLoader>
            ),
            children: [
              {
                path: '',
                element: (
                  <SuspenseLoader>
                    <OrganizationDashboardSaas />
                  </SuspenseLoader>
                ),
              },
              {
                path: 'votings/:page?/:status?',
                element: (
                  <SuspenseLoader>
                    <OrganizationVotingsSaas />
                  </SuspenseLoader>
                ),
              },
              {
                path: 'team',
                element: (
                  <SuspenseLoader>
                    <OrganizationTeamSaas />
                  </SuspenseLoader>
                ),
              },
            ],
          },
        ],
      }
    )
  }

  if (!isSaas) {
    mainLayoutRoutes.push({
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
    })
  }

  // Add calculator if feature is enabled
  if (import.meta.env.features.calculator) {
    mainLayoutRoutes.push({
      path: 'calculator',
      element: (
        <SuspenseLoader>
          <Calculator />
        </SuspenseLoader>
      ),
    })
  }

  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />
}
