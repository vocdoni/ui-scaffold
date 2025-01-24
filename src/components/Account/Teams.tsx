import { Avatar, Badge, Box, HStack, VStack } from '@chakra-ui/react'
import { OrganizationName } from '@vocdoni/chakra-components'
import { OrganizationProvider, useOrganization } from '@vocdoni/react-providers'
import { NoOrganizations } from '~components/Organization/NoOrganizations'
import { UserRole } from '~src/queries/account'

const Teams = ({ roles }: { roles: UserRole[] }) => {
  if (!roles || !roles.length) return <NoOrganizations />

  return (
    <VStack spacing={4} align='stretch'>
      {roles.map((role) => (
        <OrganizationProvider key={role.organization.address} id={role.organization.address}>
          <Team role={role} />
        </OrganizationProvider>
      ))}
    </VStack>
  )
}

export const Team = ({ role }: { role: UserRole }) => {
  const { organization } = useOrganization()

  return (
    <Box
      p={4}
      borderWidth='1px'
      borderRadius='lg'
      _hover={{ bg: 'gray.50', _dark: { bg: 'gray.700' } }}
      transition='background 0.2s'
    >
      <HStack spacing={4}>
        <Avatar size='md' src={role.organization.logo} name={organization?.account.name.default} />
        <Box flex='1'>
          <OrganizationName fontWeight='medium' />
          <Badge
            colorScheme={role.role === 'admin' ? 'purple' : role.role === 'owner' ? 'green' : 'blue'}
            fontSize='sm'
          >
            {role.role}
          </Badge>
        </Box>
      </HStack>
    </Box>
  )
}

export default Teams
