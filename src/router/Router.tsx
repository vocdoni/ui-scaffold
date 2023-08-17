import { useClient } from '@vocdoni/react-providers'
import { lazy } from 'react'
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
// These aren't lazy loaded to avoid excessive loaders in different locations
import Error from '@elements/Error'
import Layout from '../elements/Layout'
import LayoutProcessCreate from '../elements/LayoutProcessCreate'
import { SuspenseLoader } from './SuspenseLoader'

// Lazy loading helps splitting the final code, which helps downloading the app (theoretically)
const ProtectedRoutes = lazy(() => import('./ProtectedRoutes'))
const ProcessCreateSteps = lazy(() => import('../components/ProcessCreate/Steps'))
const Home = lazy(() => import('../elements/Home'))
const NotFound = lazy(() => import('../elements/NotFound'))
const Organization = lazy(() => import('../elements/Organization'))
const Process = lazy(() => import('../elements/Process'))
const Privacy = lazy(() => import('../elements/Privacy'))
const Registry = lazy(() => import('../elements/Registry'))
const Data1 = lazy(() => import('../elements/Data1'))
const Data2 = lazy(() => import('../elements/Data2'))

export const RoutesProvider = () => {
  const { client } = useClient()

  const router = createHashRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <SuspenseLoader>
                <Home />
              </SuspenseLoader>
            }
          />
          <Route
            path='processes/:id'
            element={
              <SuspenseLoader>
                <Process />
              </SuspenseLoader>
            }
            loader={async ({ params }) => client.fetchElection(params.id)}
            errorElement={<Error />}
          />
          <Route
            path='organization/:address'
            element={
              <SuspenseLoader>
                <Organization />
              </SuspenseLoader>
            }
            loader={async ({ params }) => client.fetchAccountInfo(params.address)}
            errorElement={<Error />}
          />
          <Route
            path='privacy'
            element={
              <SuspenseLoader>
                <Privacy />
              </SuspenseLoader>
            }
          />
          <Route
            path='registry'
            element={
              <SuspenseLoader>
                <Registry />
              </SuspenseLoader>
            }
          />
          <Route
            path='data1'
            element={
              <SuspenseLoader>
                <Data1 />
              </SuspenseLoader>
            }
          />
          <Route
            path='data2'
            element={
              <SuspenseLoader>
                <Data2 />
              </SuspenseLoader>
            }
          />

          <Route
            path='*'
            element={
              <SuspenseLoader>
                <NotFound />
              </SuspenseLoader>
            }
          />
        </Route>
        <Route element={<LayoutProcessCreate />}>
          <Route
            element={
              <SuspenseLoader>
                <ProtectedRoutes />
              </SuspenseLoader>
            }
          >
            <Route
              path='processes/create'
              element={
                <SuspenseLoader>
                  <ProcessCreateSteps />
                </SuspenseLoader>
              }
            />
          </Route>
        </Route>
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
