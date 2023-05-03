import { OrganizationProvider } from '@vocdoni/chakra-components'
import { useParams } from 'react-router-dom'
import OrganizationView from '../components/Organitzation/View'

const Organitzation = () => {
  const { address } = useParams()

  return (
    <OrganizationProvider id={address}>
      <OrganizationView />
    </OrganizationProvider>
  )
}

export default Organitzation
