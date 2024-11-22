import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useAuthRoutes, useCreateOrganizationRoutes } from './routes/auth'
import { useDashboardRoutes } from './routes/dashboard'
import { useProcessCreateRoutes } from './routes/process-create'
import { useRootRoutes } from './routes/root'

export const RoutesProvider = () => {
  const root = useRootRoutes()
  const auth = useAuthRoutes()
  const processCreate = useProcessCreateRoutes()
  const dashboard = useDashboardRoutes()
  const createOrganizationRoute = useCreateOrganizationRoutes()

  const router = createBrowserRouter([root, auth, processCreate, dashboard, createOrganizationRoute])

  return <RouterProvider router={router} />
}
