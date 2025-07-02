import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useAuthRoutes, useCreateOrganizationRoutes } from './routes/auth'
import { useDashboardRoutes } from './routes/dashboard'
import { useRootRoutes } from './routes/root'

export const RoutesProvider = () => {
  const root = useRootRoutes()
  const auth = useAuthRoutes()
  const dashboard = useDashboardRoutes()
  const createOrganizationRoute = useCreateOrganizationRoutes()

  const router = createBrowserRouter([root, auth, dashboard, createOrganizationRoute], {
    basename: import.meta.env.BASE_URL,
  })

  return <RouterProvider router={router} />
}
