import { OrganizationProvider } from '@vocdoni/chakra-components'
import { useParams } from 'react-router-dom'
import OrganizationView from '../components/Organization/View'

const Organization = () => {
  const { address } = useParams()

  return (
    <OrganizationProvider id={address}>
      <OrganizationView />
    </OrganizationProvider>
  )
}

export default Organization
