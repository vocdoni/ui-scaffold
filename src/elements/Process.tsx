import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ElectionProvider, OrganizationProvider, useElection } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'
import { ProcessView } from '../components/Process/View'
import { useDocumentTitle } from '~src/use-document-title'

const SetProcess = () => {
  const { election } = useElection()
  useDocumentTitle(election?.title.default)
  return <ProcessView />
}

const Process = () => {
  const election = useLoaderData() as PublishedElection

  return (
    <OrganizationProvider id={election.organizationId}>
      <ElectionProvider election={election} ConnectButton={ConnectButton} fetchCensus autoUpdate>
        <SetProcess />
      </ElectionProvider>
    </OrganizationProvider>
  )
}

export default Process
