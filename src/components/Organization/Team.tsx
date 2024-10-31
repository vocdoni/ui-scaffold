import { Avatar, Badge, Box, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Trans } from 'react-i18next'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import QueryDataLayout from '~components/Layout/QueryDataLayout'

type UserInfo = {
  email: string
  firstName: string
  lastName: string
}

type ITeamMembersResponse = {
  members: {
    info: UserInfo
    role: string
  }[]
}

const useTeamMembers = ({
  options,
}: {
  options?: Omit<UseQueryOptions<ITeamMembersResponse>, 'queryKey' | 'queryFn'>
} = {}) => {
  const { bearedFetch, signerAddress } = useAuth()
  return useQuery({
    queryKey: ['organizations', 'members', signerAddress],
    queryFn: () =>
      bearedFetch<ITeamMembersResponse>(ApiEndpoints.OrganizationMembers.replace('{address}', signerAddress)),
    ...options,
  })
}

export const TeamMembersList = () => {
  const { data, isLoading, isError, error } = useTeamMembers()

  return (
    <QueryDataLayout isEmpty={!data?.members} isLoading={isLoading} isError={isError} error={error}>
      <Flex display={'column'}>
        <Text fontWeight={'bold'}>
          <Trans i18nKey={'team.team_members'}>Team members</Trans>
          <Badge ml='1' colorScheme='green'>
            {data?.members?.length}
          </Badge>
        </Text>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>
                  <Trans i18nKey={'team.member_name'}>Name</Trans>
                </Th>
                <Th textAlign='center'>
                  <Trans i18nKey={'team.member_role'}>Role</Trans>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.members?.map((member, i) => (
                <Tr key={i}>
                  <Td>
                    <Flex>
                      <Avatar name={member.info.firstName} size='sm' />
                      <Box ml='3'>
                        <Text fontWeight='bold'>
                          {member.info.firstName} {member.info.lastName}
                        </Text>
                        <Text fontSize='sm'>{member.info.email}</Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td textAlign='center'>
                    <Badge>{member.role}</Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </QueryDataLayout>
  )
}
