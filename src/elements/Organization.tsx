import { useParams } from 'react-router-dom'
import OrganizationView from '../components/Organitzation/View'

const Organitzation = () => {
  const { address } = useParams()

  return <OrganizationView address={address} />
}

export default Organitzation
