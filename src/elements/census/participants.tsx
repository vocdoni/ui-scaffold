import { lazy } from 'react'
import { DashboardContents } from '~components/Layout/Dashboard'
import { SuspenseLoader } from '../../router/SuspenseLoader'

const CensusParticipants = lazy(() => import('../../components/Census/Participants'))

export const CensusParticipantsElement = () => (
  <SuspenseLoader>
    <DashboardContents>
      <CensusParticipants />
    </DashboardContents>
  </SuspenseLoader>
)
