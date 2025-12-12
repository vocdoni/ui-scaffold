import { useClient } from '@vocdoni/react-providers'
import { VocdoniSDKClient } from '@vocdoni/sdk'
import { lazy } from 'react'
import { parseProcessIds } from '~components/Home/SharedCensus'
import Layout from '~elements/Layout'
import SimpleLayout from '~elements/SimpleLayout'
import { SuspenseLoader } from '../SuspenseLoader'

const Home = lazy(() => import('~components/Home'))
const SharedCensus = lazy(() => import('~components/Home/SharedCensus'))
const OrganizationView = lazy(() => import('~elements/organization/view'))

const getDomains = () => import.meta.env.CUSTOM_ORGANIZATION_DOMAINS || {}
const getSharedCensusProcessIds = () => parseProcessIds(import.meta.env.PROCESS_IDS)

const buildHomeIndexRoute = (client: VocdoniSDKClient) => {
  const domains = getDomains()
  const sharedCensusProcessIds = getSharedCensusProcessIds()
  const shouldUseSharedCensus = sharedCensusProcessIds.length > 0

  return {
    index: true,
    element: (
      <SuspenseLoader>
        {domains[window.location.hostname] ? <OrganizationView /> : shouldUseSharedCensus ? <SharedCensus /> : <Home />}
      </SuspenseLoader>
    ),
    loader: async () => {
      if (domains[window.location.hostname]) {
        return client.fetchAccountInfo(domains[window.location.hostname])
      }
      return null
    },
  }
}

export const useHomeRoute = () => {
  const { client } = useClient()
  const sharedCensusProcessIds = getSharedCensusProcessIds()
  const shouldUseSharedCensus = sharedCensusProcessIds.length > 0
  const LayoutComponent = shouldUseSharedCensus ? SimpleLayout : Layout

  return {
    element: <LayoutComponent />,
    children: [buildHomeIndexRoute(client)],
  }
}
