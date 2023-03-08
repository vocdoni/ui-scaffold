import { useClientContext } from '@vocdoni/react-components'
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Create from '../elements/Create'
import Error from '../elements/Error'
import Home from '../elements/Home'
import Layout from '../elements/Layout'
import List from '../elements/List'
import NotFound from '../elements/NotFound'
import Organization from '../elements/Organization'
import Process from '../elements/Process'
import ProtectedRoutes from './ProtectedRoutes'

export const RoutesProvider = () => {
  const { client } = useClientContext()

  const router = createHashRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='processes/create' element={<Create />} />
          <Route path='processes' element={<List />} />
          <Route
            path='processes/:id'
            element={<Process />}
            loader={async ({ params }) => client.fetchElection(params.id)}
          />
          <Route path='organization/test' element={<Organization />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
