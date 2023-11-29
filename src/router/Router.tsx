// import { useClient } from '@vocdoni/react-providers'
// import { lazy } from 'react'
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
// // These aren't lazy loaded to avoid excessive loaders in different locations
// import Error from '~elements/Error'
// import Layout from '../elements/Layout'
// import LayoutProcessCreate from '../elements/LayoutProcessCreate'
// import { SuspenseLoader } from './SuspenseLoader'

// // Lazy loading helps splitting the final code, which helps downloading the app (theoretically)
// const ProtectedRoutes = lazy(() => import('./ProtectedRoutes'))
// const ProcessCreateSteps = lazy(() => import('../components/ProcessCreate/Steps/index'))
// const Home = lazy(() => import('../elements/Home'))
// const NotFound = lazy(() => import('../elements/NotFound'))
// const Organization = lazy(() => import('../elements/Organization'))
// const Process = lazy(() => import('../elements/Process'))
// const Faucet = lazy(() => import('../elements/Faucet'))

// export const RoutesProvider = () => {
//   const { client } = useClient()
//   const domains = import.meta.env.CUSTOM_ORGANIZATION_DOMAINS

//   let home = (
//     <Route
//       index
//       element={
//         <SuspenseLoader>
//           <Home />
//         </SuspenseLoader>
//       }
//     />
//   )

//   // replace home in case it's overwriten via env var
//   if (domains[window.location.hostname]) {
//     home = (
//       <Route
//         index
//         element={
//           <SuspenseLoader>
//             <Organization />
//           </SuspenseLoader>
//         }
//         loader={async ({ params }) => client.fetchAccountInfo(domains[window.location.hostname])}
//         errorElement={<Error />}
//       />
//     )
//   }

//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path='/'>
//         <Route element={<Layout />}>
//           {home}
//           <Route
//             path='processes/:id'
//             element={
//               <SuspenseLoader>
//                 <Process />
//               </SuspenseLoader>
//             }
//             loader={async ({ params }) => client.fetchElection(params.id)}
//             errorElement={<Error />}
//           />
//           <Route
//             path='organization/:address'
//             element={
//               <SuspenseLoader>
//                 <Organization />
//               </SuspenseLoader>
//             }
//             loader={async ({ params }) => client.fetchAccountInfo(params.address)}
//             errorElement={<Error />}
//           />
//           <Route
//             path='faucet'
//             element={
//               <SuspenseLoader>
//                 <Faucet />
//               </SuspenseLoader>
//             }
//           />
//           <Route
//             path='*'
//             element={
//               <SuspenseLoader>
//                 <NotFound />
//               </SuspenseLoader>
//             }
//           />
//         </Route>
//         <Route element={<LayoutProcessCreate />}>
//           <Route
//             element={
//               <SuspenseLoader>
//                 <ProtectedRoutes />
//               </SuspenseLoader>
//             }
//           >
//             <Route
//               path='processes/create'
//               element={
//                 <SuspenseLoader>
//                   <ProcessCreateSteps />
//                 </SuspenseLoader>
//               }
//             />
//           </Route>
//         </Route>
//       </Route>
//     )
//   )

//   return <RouterProvider router={router} />
// }

import { useClient } from '@vocdoni/react-providers'
import { lazy } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
// These aren't lazy loaded to avoid excessive loaders in different locations
import Error from '~elements/Error'
import Layout from '../elements/LayoutOnVote'
import LayoutProcessCreate from '../elements/LayoutProcessCreateOnVote'
import { SuspenseLoader } from './SuspenseLoader'

// Lazy loading helps splitting the final code, which helps downloading the app (theoretically)
const ProtectedRoutes = lazy(() => import('./ProtectedRoutes'))
const ProcessCreateSteps = lazy(() => import('../components/ProcessCreate/Steps/indexOnVote'))
const Home = lazy(() => import('../elements/HomeOnVote'))
const NotFound = lazy(() => import('../elements/NotFound'))
const Organization = lazy(() => import('../elements/Organization'))
const Process = lazy(() => import('../elements/Process'))
const Faucet = lazy(() => import('../elements/Faucet'))

export const RoutesProvider = () => {
  const { client } = useClient()
  const domains = import.meta.env.CUSTOM_ORGANIZATION_DOMAINS

  let home = (
    <Route
      index
      element={
        <SuspenseLoader>
          <Home />
        </SuspenseLoader>
      }
    />
  )

  // replace home in case it's overwriten via env var
  if (domains[window.location.hostname]) {
    home = (
      <Route
        index
        element={
          <SuspenseLoader>
            <Organization />
          </SuspenseLoader>
        }
        loader={async ({ params }) => client.fetchAccountInfo(domains[window.location.hostname])}
        errorElement={<Error />}
      />
    )
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route element={<Layout />}>
          {home}
          <Route
            path='processes/:id'
            element={
              <SuspenseLoader>
                <Process />
              </SuspenseLoader>
            }
            loader={async ({ params }) => client.fetchElection(params.id)}
            errorElement={<Error />}
          />
          <Route
            path='organization/:address'
            element={
              <SuspenseLoader>
                <Organization />
              </SuspenseLoader>
            }
            loader={async ({ params }) => client.fetchAccountInfo(params.address)}
            errorElement={<Error />}
          />
          <Route
            path='faucet'
            element={
              <SuspenseLoader>
                <Faucet />
              </SuspenseLoader>
            }
          />
          <Route
            path='*'
            element={
              <SuspenseLoader>
                <NotFound />
              </SuspenseLoader>
            }
          />
        </Route>
        <Route element={<LayoutProcessCreate />}>
          <Route
            element={
              <SuspenseLoader>
                <ProtectedRoutes />
              </SuspenseLoader>
            }
          >
            <Route
              path='processes/create'
              element={
                <SuspenseLoader>
                  <ProcessCreateSteps />
                </SuspenseLoader>
              }
            />
          </Route>
        </Route>
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
