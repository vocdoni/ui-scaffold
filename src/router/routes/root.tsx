import { useClient } from '@vocdoni/react-providers'
import { lazy } from 'react'
import { Params, RouteObject } from 'react-router-dom'
// These aren't lazy loaded since they are main layouts and related components
import Error from '~elements/Error'
import Layout from '~elements/Layout'
import PlansPublicPage from '~elements/plans'
import ProcessBundle from '~elements/processes/bundle'
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

const ProcessIds = import.meta.env.PROCESS_IDS

export const useRootRoutes = () => {
  const { client } = useClient()

  const home: RouteObject = {
    index: true,
    element: (
      <SuspenseLoader>
        <Home />
      </SuspenseLoader>
    ),
  }

  if (ProcessIds.length <= 1) {
    home.element = (
      <SuspenseLoader>
        <Process />
      </SuspenseLoader>
    )
    home.loader = async () => await client.fetchElection(ProcessIds[0])
  }

  return {
    path: Routes.root,
    element: <Layout />,
    children: [
      home,
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
        path: Routes.processes.bundle,
        element: (
          <SuspenseLoader>
            <ProcessBundle />
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
        path: '*',
        element: (
          <SuspenseLoader>
            <NotFound />
          </SuspenseLoader>
        ),
      },
    ],
  }
}
