import { lazy } from 'react'
// These aren't lazy loaded since they are main layouts and related components
import LayoutProcessCreate from '~elements/LayoutProcessCreate'
import ProtectedRoutes from '~src/router/ProtectedRoutes'
import { Routes } from '.'
import { SuspenseLoader } from '../SuspenseLoader'

const ProcessCreate = lazy(() => import('~elements/dashboard/processes/create'))

const ProcessCreateElements = [
  {
    ...ProtectedRoutes({
      children: [
        {
          path: Routes.processes.create,
          element: (
            <SuspenseLoader>
              <ProcessCreate />
            </SuspenseLoader>
          ),
        },
      ],
    }),
  },
]

export const useProcessCreateRoutes = () => ({
  element: <LayoutProcessCreate />,
  children: ProcessCreateElements,
})
