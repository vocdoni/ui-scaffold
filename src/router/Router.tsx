import { useClientContext } from '@vocdoni/react-components'
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import ProtectedRoutes from '../components/Layouts/ProtectedRoutes'
import Create from '../elements/Create'
import Home from '../elements/Home'
import List from '../elements/List'
import NotFound from '../elements/NotFound'
import Process from '../elements/Process'
import RootLayout from '../elements/RootLayout'

export const RoutesProvider = () => {
  const { client } = useClientContext()

  const router = createHashRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='processes/create' element={<Create />} />
          <Route path='processes' element={<List />} />
          <Route
            path='processes/:id'
            element={<Process />}
            loader={async ({ params }) => client.fetchElection(params.id)}
          />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
