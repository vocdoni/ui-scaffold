import { lazy } from 'react'
import { DashboardContents } from '~components/Layout/Dashboard'
import { SuspenseLoader } from '~src/router/SuspenseLoader'

const CensusView = lazy(() => import('~components/Census/View'))

export const CensusViewElement = () => (
  <SuspenseLoader>
    <DashboardContents>
      <CensusView />
    </DashboardContents>
  </SuspenseLoader>
)
