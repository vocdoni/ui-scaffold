import { lazy } from 'react'
import { DashboardContents } from '~components/Layout/Dashboard'
import { SuspenseLoader } from '~src/router/SuspenseLoader'

const CensusCreate = lazy(() => import('~components/Census/Create'))

export const CensusCreateElement = () => (
  <SuspenseLoader>
    <DashboardContents>
      <CensusCreate />
    </DashboardContents>
  </SuspenseLoader>
)
