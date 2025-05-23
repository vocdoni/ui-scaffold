import { useClient } from '@vocdoni/react-providers'
import { VocdoniSDKClient } from '@vocdoni/sdk'
import { lazy } from 'react'
import { Params } from 'react-router-dom'
// These aren't lazy loaded since they are main layouts and related components
import ErrorElement from '~elements/Error'
import Layout from '~elements/Layout'
import ProtectedRoutes from '~src/router/ProtectedRoutes'
import { Routes } from '.'
import { SuspenseLoader } from '../SuspenseLoader'

// elements / pages
const Faucet = lazy(() => import('~elements/Faucet'))
const Home = lazy(() => import('~components/Home'))
const NotFound = lazy(() => import('~elements/NotFound'))
const Process = lazy(() => import('~elements/processes/view'))
const OrganizationView = lazy(() => import('~elements/organization/view'))
const PlansPublicPage = lazy(() => import('~elements/plans'))
const UseCases = lazy(() => import('~components/UseCases'))
const UseCase = lazy(() => import('~components/UseCases/view'))
const StripeCheckout = lazy(() => import('~elements/Stripe').then((module) => ({ default: module.StripeCheckout })))
const StripeReturn = lazy(() => import('~elements/Stripe').then((module) => ({ default: module.StripeReturn })))

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
    errorElement: <ErrorElement />,
  },
  {
    path: Routes.organization,
    element: (
      <SuspenseLoader>
        <OrganizationView />
      </SuspenseLoader>
    ),
    loader: async ({ params }: { params: Params<string> }) => client.fetchAccountInfo(params.address),
    errorElement: <ErrorElement />,
  },
  {
    ...ProtectedRoutes([
      {
        path: Routes.stripe.checkout,
        element: (
          <SuspenseLoader>
            <StripeCheckout />
          </SuspenseLoader>
        ),
      },
      {
        path: Routes.stripe.return,
        element: (
          <SuspenseLoader>
            <StripeReturn />
          </SuspenseLoader>
        ),
        errorElement: <ErrorElement />,
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
  {
    path: Routes.plans,
    element: (
      <SuspenseLoader>
        <PlansPublicPage />
      </SuspenseLoader>
    ),
  },
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
  {
    path: Routes.usecases.base,
    element: (
      <SuspenseLoader>
        <UseCases />
      </SuspenseLoader>
    ),
  },
  {
    path: Routes.usecases.view,
    element: (
      <SuspenseLoader>
        <UseCase />
      </SuspenseLoader>
    ),
    loader: async ({ params }: { params: Params<string> }) => {
      const response = await fetch(`${import.meta.env.BASE_URL}use-cases/${params.lang}/${params.case}.md`)
      const md = await response.text()
      if (!md) throw new Error('Error fetching MD')
      return md
    },
    errorElement: <NotFound />,
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
