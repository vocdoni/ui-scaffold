import { lazy } from 'react'
// These aren't lazy loaded since they are main layouts and related components
import Layout from '~elements/Layout'
import { Routes } from '.'
import { SuspenseLoader } from '../SuspenseLoader'

const UseCases = lazy(() => import('~components/Layout/UseCases'))

const UseCasesElements = [
  {
    children: [
      {
        path: Routes.useCases.root,
        element: (
          <SuspenseLoader>
            <UseCases />
          </SuspenseLoader>
        ),
      },
    ],
  },
]

export const useUseCasesRoutes = () => {
  return {
    element: <Layout />,
    children: UseCasesElements,
  }
}
