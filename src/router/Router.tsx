import { useClientContext } from '@vocdoni/react-components'
import { lazy } from 'react'
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
// These aren't lazy loaded to avoid excessive loaders in different locations
import Error from '../elements/Error'
import Layout from '../elements/Layout'
import { SuspenseLoader } from './SuspenseLoader'

// Lazy loading helps splitting the final code, which helps downloading the app (theoretically)
const ProtectedRoutes = lazy(() => import('./ProtectedRoutes'))
const ProcessCreate = lazy(() => import('../components/ProcessCreate'))
const Home = lazy(() => import('../elements/Home'))
const NotFound = lazy(() => import('../elements/NotFound'))
const Organization = lazy(() => import('../elements/Organization'))
const Process = lazy(() => import('../elements/Process'))

export const RoutesProvider = () => {
  const { client } = useClientContext()

  const router = createHashRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} errorElement={<Error />}>
        <Route
          index
          element={
            <SuspenseLoader>
              <Home />
            </SuspenseLoader>
          }
        />
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
                <ProcessCreate />
              </SuspenseLoader>
            }
          />
        </Route>
        <Route
          path='processes/:id'
          element={
            <SuspenseLoader>
              <Process />
            </SuspenseLoader>
          }
          loader={async ({ params }) => client.fetchElection(params.id)}
        />
        <Route
          path='organization/:address'
          element={
            <SuspenseLoader>
              <Organization />
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
    )
  )

  return <RouterProvider router={router} />
}
