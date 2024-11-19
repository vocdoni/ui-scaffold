import { Avatar, Badge, Box, HStack, VStack } from '@chakra-ui/react'
import { OrganizationName } from '@vocdoni/chakra-components'
import { OrganizationProvider } from '@vocdoni/react-providers'
import { UserRole } from '~src/queries/account'

const Teams = ({ roles }: { roles: UserRole[] }) => {
  if (!roles) return null

  return (
    <VStack spacing={4} align='stretch'>
      {roles.map((role) => (
        <OrganizationProvider key={role.organization.address} id={role.organization.address}>
          <Box
            p={4}
            borderWidth='1px'
            borderRadius='lg'
            _hover={{ bg: 'gray.50', _dark: { bg: 'gray.700' } }}
            transition='background 0.2s'
          >
            <HStack spacing={4}>
              <Avatar size='md' src={role.organization.logo} name={role.organization.name} />
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
        </OrganizationProvider>
      ))}
    </VStack>
  )
}

export default Teams
