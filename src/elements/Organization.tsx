import { Box } from '@chakra-ui/react'
import { OrganizationProvider } from '@vocdoni/react-providers'
import { AccountData } from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'
import OrganizationView from '../components/Organization/View'

const Organization = () => {
  const organization = useLoaderData() as AccountData

  return (
    <OrganizationProvider organization={organization}>
      <Box px={{ base: 2, sm: 4 }}>
        <OrganizationView />
      </Box>
    </OrganizationProvider>
  )
}

export default Organization
