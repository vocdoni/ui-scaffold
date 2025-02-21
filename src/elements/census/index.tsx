import { lazy } from 'react'
import { DashboardContents } from '~components/Layout/Dashboard'
import { SuspenseLoader } from '../../router/SuspenseLoader'

const CensusList = lazy(() => import('../../components/Census/List'))

export const CensusListElement = () => (
  <SuspenseLoader>
    <DashboardContents>
      <CensusList />
    </DashboardContents>
  </SuspenseLoader>
)
