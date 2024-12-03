import { useClient } from '@vocdoni/react-providers'
import { VocdoniSDKClient } from '@vocdoni/sdk'
import { lazy } from 'react'
import { Params } from 'react-router-dom'
// These aren't lazy loaded since they are main layouts and related components
import Error from '~elements/Error'
import Layout from '~elements/Layout'
import PlansPublicPage from '~elements/plans'
import { PlansLayout, StretchPublicContentsLayout } from '~elements/PublicContents'
import { StripeCheckout, StripeReturn } from '~elements/Stripe'
import ProtectedRoutes from '~src/router/ProtectedRoutes'
import { Routes } from '.'
import { SuspenseLoader } from '../SuspenseLoader'

// elements / pages
const Faucet = lazy(() => import('~elements/Faucet'))
const Home = lazy(() => import('~components/Home'))
const NotFound = lazy(() => import('~elements/NotFound'))
const Process = lazy(() => import('~elements/processes/view'))
const OrganizationView = lazy(() => import('~elements/organization/view'))

// others
const Terms = lazy(() => import('~components/TermsAndPrivacy/Terms'))
const Privacy = lazy(() => import('~components/TermsAndPrivacy/Privacy'))
const Calculator = lazy(() => import('~components/Calculator'))

const domains = import.meta.env.CUSTOM_ORGANIZATION_DOMAINS

const RootElements = (client: VocdoniSDKClient) => [
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
    path: Routes.processes.view,
    element: (
      <SuspenseLoader>
        <Process />
      </SuspenseLoader>
    ),
    loader: async ({ params }: { params: Params<string> }) => client.fetchElection(params.id),
    errorElement: <Error />,
  },
  {
    path: Routes.organization,
    element: (
      <SuspenseLoader>
        <OrganizationView />
      </SuspenseLoader>
    ),
    loader: async ({ params }: { params: Params<string> }) => client.fetchAccountInfo(params.address),
    errorElement: <Error />,
  },
  {
    ...ProtectedRoutes([
      {
        path: Routes.stripe.checkout,
        element: <StripeCheckout />,
      },
      {
        path: Routes.stripe.return,
        element: <StripeReturn />,
        errorElement: <Error />,
      },
    ]),
  },
  {
    path: Routes.faucet,
    element: (
      <SuspenseLoader>
        <Faucet />
      </SuspenseLoader>
    ),
  },
  {
    path: Routes.calculator,
    element: (
      <SuspenseLoader>
        <Calculator />
      </SuspenseLoader>
    ),
  },
  // Plans have their own layout
  {
    element: <PlansLayout />,
    children: [
      {
        path: Routes.plans,
        element: (
          <SuspenseLoader>
            <PlansPublicPage />
          </SuspenseLoader>
        ),
      },
    ],
  },
  // Stuff centered in the view, stretched
  {
    element: <StretchPublicContentsLayout />,
    children: [
      {
        path: Routes.terms,
        element: (
          <SuspenseLoader>
            <Terms />
          </SuspenseLoader>
        ),
      },
      {
        path: Routes.privacy,
        element: (
          <SuspenseLoader>
            <Privacy />
          </SuspenseLoader>
        ),
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

export const useRootRoutes = () => {
  const { client } = useClient()

  return {
    path: Routes.root,
    element: <Layout />,
    children: RootElements(client),
  }
}
