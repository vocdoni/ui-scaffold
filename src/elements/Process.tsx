import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ElectionProvider } from '@vocdoni/chakra-components'
import { PublishedElection } from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'
import { ProcessView } from '../components/Process/View'

const Process = () => {
  const election = useLoaderData() as PublishedElection

  return (
    <ElectionProvider election={election} ConnectButton={ConnectButton} fetchCensus>
      <ProcessView />
    </ElectionProvider>
  )
}

export default Process
