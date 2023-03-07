import { ConnectButton } from '@rainbow-me/rainbowkit'
import { PublishedElection } from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'
import { ProcessView } from '../components/Process/View'

const Process = () => {
  const election = useLoaderData() as PublishedElection

  return <ProcessView election={election} ConnectButton={ConnectButton} />
}

export default Process
