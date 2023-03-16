import { PublishedElection } from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'
import OrganizationView from '../components/Organitzation/View'

const Organitzation = () => {
  const electionsList = useLoaderData() as PublishedElection[]

  return <OrganizationView electionsList={electionsList} />
}

export default Organitzation
