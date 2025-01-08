import { Avatar, Badge, Box, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { enforceHexPrefix, useClient } from '@vocdoni/react-providers'
import { Trans } from 'react-i18next'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import QueryDataLayout from '~components/Layout/QueryDataLayout'
import { QueryKeys } from '~src/queries/keys'

// Define types
type UserInfo = {
  email: string
  firstName: string
  lastName: string
}

type Member = {
  info?: UserInfo
  email?: string
  role: string
  expiration?: string
}

type TeamMembersResponse = {
  members: Member[]
}

type PendingTeamMembersResponse = {
  pending: Member[]
}

// Fetch hook for team members
export const useTeamMembers = ({
  options,
}: {
  options?: Omit<UseQueryOptions<TeamMembersResponse>, 'queryKey' | 'queryFn'>
} = {}) => {
  const { bearedFetch } = useAuth()
  const { account } = useClient()
  return useQuery({
    queryKey: QueryKeys.organization.members(enforceHexPrefix(account?.address)),
    queryFn: () =>
      bearedFetch<TeamMembersResponse>(
        ApiEndpoints.OrganizationMembers.replace('{address}', enforceHexPrefix(account?.address))
      ),
    ...options,
    select: (data) => data.members,
  })
}

// Fetch hook for pending members
export const usePendingTeamMembers = ({
  options,
}: {
  options?: Omit<UseQueryOptions<PendingTeamMembersResponse>, 'queryKey' | 'queryFn'>
} = {}) => {
  const { bearedFetch } = useAuth()
  const { account } = useClient()
  return useQuery({
    queryKey: QueryKeys.organization.pendingMembers(enforceHexPrefix(account?.address)),
    queryFn: () =>
      bearedFetch<PendingTeamMembersResponse>(
        ApiEndpoints.OrganizationPendingMembers.replace('{address}', enforceHexPrefix(account?.address))
      ),
    ...options,
    select: (data) => data.pending,
  })
}

// Reusable table component for both active and pending members
const TeamMembersTable = ({ members, showExpiration = false }: { members: Member[]; showExpiration?: boolean }) => (
  <TableContainer>
    <Table>
      <Thead>
        <Tr>
          <Th>
            <Trans i18nKey='team.member_name'>Name</Trans>
          </Th>
          {showExpiration && (
            <Th textAlign='center'>
              <Trans i18nKey='team.expiration'>Expiration</Trans>
            </Th>
          )}
          <Th textAlign='center'>
            <Trans i18nKey='team.member_role'>Role</Trans>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {members.map((member, i) => (
          <Tr key={i}>
            <Td>
              {member.info ? (
                <Flex>
                  <Avatar name={member.info.firstName} size='sm' />
                  <Box ml='3'>
                    <Text fontWeight='bold'>
                      {member.info.firstName} {member.info.lastName}
                    </Text>
                    <Text fontSize='sm'>{member.info.email}</Text>
                  </Box>
                </Flex>
              ) : (
                <Text>{member.email}</Text>
              )}
            </Td>
            {showExpiration && member.expiration && (
              <Td textAlign='center'>
                <Text>{new Date(member.expiration).toLocaleString()}</Text>
              </Td>
            )}
            <Td textAlign='center' w={10}>
              <Badge>{member.role}</Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
)

// Component for active team members
export const TeamMembersList = () => {
  const { data: members, isLoading, isError, error } = useTeamMembers()

  return (
    <QueryDataLayout isEmpty={!members} isLoading={isLoading} isError={isError} error={error}>
      <Flex direction='column'>
        <Text fontWeight='bold' display='flex' gap={3}>
          <Trans i18nKey='team.team_members'>Team members</Trans>
          <Badge ml='1' colorScheme='green'>
            {members?.length}
          </Badge>
        </Text>
        <TeamMembersTable members={members || []} />
      </Flex>
    </QueryDataLayout>
  )
}

// Component for pending team members
export const PendingTeamMembersList = () => {
  const { data: pending, isLoading, isError, error } = usePendingTeamMembers()

  if (!isLoading && !pending.length) return null

  return (
    <QueryDataLayout isEmpty={!pending} isLoading={isLoading} isError={isError} error={error}>
      <Flex direction='column'>
        <Text fontWeight='bold' display='flex' gap={3}>
          <Trans i18nKey='team.pending_members'>Pending Invitations</Trans>
          <Badge ml='1' colorScheme='orange'>
            {pending?.length}
          </Badge>
        </Text>
        <TeamMembersTable members={pending || []} showExpiration />
      </Flex>
    </QueryDataLayout>
  )
}

// Wrapper component to include both team members and pending members lists
export const TeamMembers = () => (
  <Flex direction='column' gap={6}>
    <TeamMembersList />
    <PendingTeamMembersList />
  </Flex>
)
