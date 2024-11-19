import { lazy } from 'react'
// These aren't lazy loaded since they are main layouts and related components
import Layout from '~elements/Layout'
import { Routes } from '.'
import { SuspenseLoader } from '../SuspenseLoader'

const ContactUs = lazy(() => import('~components/Layout/ContactUs'))

const ViewsElements = [
  {
    children: [
      {
        children: [
          {
            path: Routes.contactUs,
            element: (
              <SuspenseLoader>
                <ContactUs />
              </SuspenseLoader>
            ),
          },
        ],
      },
    ],
  },
]

export const useViewsRoutes = () => {
  return {
    element: <Layout />,
    children: ViewsElements,
  }
}
