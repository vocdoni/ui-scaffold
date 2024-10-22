import { lazy } from 'react'
// These aren't lazy loaded since they are main layouts and related components
import LayoutProcessCreate from '~elements/LayoutProcessCreate'
import { Routes } from '.'
import { SuspenseLoader } from '../SuspenseLoader'

const ProtectedRoutes = lazy(() => import('../ProtectedRoutes'))
const ProcessCreateSteps = lazy(() => import('~components/ProcessCreate/Steps'))

const ProcessCreateElements = [
  {
    element: (
      <SuspenseLoader>
        <ProtectedRoutes />
      </SuspenseLoader>
    ),
    children: [
      {
        path: Routes.processes.create,
        element: (
          <SuspenseLoader>
            <ProcessCreateSteps />
          </SuspenseLoader>
        ),
      },
    ],
  },
]

export const useProcessCreateRoutes = () => ({
  element: <LayoutProcessCreate />,
  children: ProcessCreateElements,
})
