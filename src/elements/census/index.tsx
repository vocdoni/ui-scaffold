import { lazy } from 'react'
import { DashboardContents } from '~components/Layout/Dashboard'
import { SuspenseLoader } from '~src/router/SuspenseLoader'

const CensusList = lazy(() => import('~components/Census/List'))

export const CensusListElement = () => (
  <SuspenseLoader>
    <DashboardContents>
      <CensusList />
    </DashboardContents>
  </SuspenseLoader>
)
