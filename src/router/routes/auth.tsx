import { lazy } from 'react'
// These aren't lazy loaded since they are main layouts and related components
import LayoutAuth from '~elements/LayoutAuth'
import { Routes } from '.'
import { SuspenseLoader } from '../SuspenseLoader'

const NonLoggedRoute = lazy(() => import('../NonLoggedRoute'))
const SignIn = lazy(() => import('~components/Auth/SignIn'))
const SignUp = lazy(() => import('~components/Auth/SignUp'))
const Verify = lazy(() => import('~components/Auth/Verify'))
const ForgotPassword = lazy(() => import('~components/Auth/ForgotPassword'))

const AuthElements = [
  {
    element: <LayoutAuth />,
    children: [
      {
        children: [
          {
            path: Routes.auth.signIn,
            element: (
              <SuspenseLoader>
                <SignIn />
              </SuspenseLoader>
            ),
          },
          {
            path: Routes.auth.signUp,
            element: (
              <SuspenseLoader>
                <SignUp />
              </SuspenseLoader>
            ),
          },
          {
            path: Routes.auth.recovery,
            element: (
              <SuspenseLoader>
                <ForgotPassword />
              </SuspenseLoader>
            ),
          },
          {
            path: Routes.auth.verify,
            element: (
              <SuspenseLoader>
                <Verify />
              </SuspenseLoader>
            ),
          },
        ],
      },
    ],
  },
]

export const useAuthRoutes = () => {
  return {
    element: (
      <SuspenseLoader>
        <NonLoggedRoute />
      </SuspenseLoader>
    ),
    children: AuthElements,
  }
}
