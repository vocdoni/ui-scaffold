import { lazy } from 'react'
// These aren't lazy loaded since they are main layouts and related components
import LayoutAuth from '~elements/LayoutAuth'
import { Routes } from '.'
import { SuspenseLoader } from '../SuspenseLoader'

const NonLoggedRoute = lazy(() => import('../NonLoggedRoute'))
const Signin = lazy(() => import('~elements/account/signin'))
const SignUp = lazy(() => import('~components/Auth/SignUp'))
const Verify = lazy(() => import('~components/Auth/Verify'))
const PasswordForgot = lazy(() => import('~elements/account/password'))
const PasswordReset = lazy(() => import('~elements/account/password/reset'))

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
                <Signin />
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
            path: Routes.auth.verify,
            element: (
              <SuspenseLoader>
                <Verify />
              </SuspenseLoader>
            ),
          },
          {
            path: Routes.auth.recovery,
            element: (
              <SuspenseLoader>
                <PasswordForgot />
              </SuspenseLoader>
            ),
          },
          {
            path: Routes.auth.passwordReset,
            element: (
              <SuspenseLoader>
                <PasswordReset />
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
