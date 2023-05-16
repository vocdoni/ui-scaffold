import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ElectionProvider, OrganizationProvider } from '@vocdoni/chakra-components'
import { PublishedElection } from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'
import { ProcessView } from '../components/Process/View'

const Process = () => {
  const election = useLoaderData() as PublishedElection

  return (
    <OrganizationProvider id={election.organizationId}>
      <ElectionProvider election={election} ConnectButton={ConnectButton} fetchCensus autoUpdate>
        <ProcessView />
      </ElectionProvider>
    </OrganizationProvider>
  )
}

export default Process
