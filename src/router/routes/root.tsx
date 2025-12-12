import { useClient } from '@vocdoni/react-providers'
import { VocdoniSDKClient } from '@vocdoni/sdk'
import { lazy } from 'react'
import { Params } from 'react-router-dom'
// These aren't lazy loaded since they are main layouts and related components
import ErrorElement from '~elements/Error'
import Layout from '~elements/Layout'
import { Routes } from '.'
import { SuspenseLoader } from '../SuspenseLoader'

// elements / pages
const NotFound = lazy(() => import('~elements/NotFound'))
const Process = lazy(() => import('~elements/processes/view'))
const OrganizationView = lazy(() => import('~elements/organization/view'))
const PlansPublicPage = lazy(() => import('~elements/plans'))
const UseCases = lazy(() => import('~components/UseCases'))
const UseCase = lazy(() => import('~components/UseCases/view'))

const RootElements = (client: VocdoniSDKClient) => [
  {
    path: Routes.processes.view,
    handle: { hideNavbar: true },
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
    path: Routes.plans,
    element: (
      <SuspenseLoader>
        <PlansPublicPage />
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
    handle: { hideNavbar: true },
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
