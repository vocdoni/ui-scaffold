import { Avatar, Badge, Box, HStack, Text, VStack } from '@chakra-ui/react'
import { UserRole } from '~src/queries/account'

const Teams = ({ roles }: { roles: UserRole[] }) => (
  <VStack spacing={4} align='stretch'>
    {roles.map((role, k) => (
      <Box
        key={k}
        p={4}
        borderWidth='1px'
        borderRadius='lg'
        _hover={{ bg: 'gray.50', _dark: { bg: 'gray.700' } }}
        transition='background 0.2s'
      >
        <HStack spacing={4}>
          <Avatar size='md' src={role.organization.logo} name={role.organization.name} />
          <Box flex='1'>
            <Text fontWeight='medium'>{role.organization.name}</Text>
            <Badge
              colorScheme={role.role === 'admin' ? 'purple' : role.role === 'owner' ? 'green' : 'blue'}
              fontSize='sm'
            >
              {role.role}
            </Badge>
          </Box>
        </HStack>
      </Box>
    ))}
  </VStack>
)

export default Teams
