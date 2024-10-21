import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useState } from 'react'
import { Trans } from 'react-i18next'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import QueryDataLayout from '~components/Layout/QueryDataLayout'
import Invite from './Invite'

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

const TeamList = () => {
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
                <Th>
                  <Trans i18nKey={'team.member_permission'}>Permission</Trans>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.members?.map((member, i) => {
                return (
                  <Tr key={i}>
                    <Td>
                      <Flex>
                        <Avatar
                          // src={member.info.}
                          name={member.info.firstName}
                          size='sm'
                        />
                        <Box ml='3'>
                          <Text fontWeight='bold'>
                            {member.info.firstName} {member.info.lastName}
                          </Text>
                          <Text fontSize='sm'>{member.info.email}</Text>
                        </Box>
                      </Flex>
                    </Td>
                    <Td>
                      <Badge>{member.role}</Badge>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </QueryDataLayout>
  )
}

const Team = () => {
  const [inviteView, setInviteView] = useState(false)

  return (
    <>
      <Flex justifyContent='end'>
        {!inviteView && <Button onClick={() => setInviteView(true)}>Invite People</Button>}
      </Flex>
      {inviteView && <Invite setInviteView={setInviteView} />}
      <TeamList />
    </>
  )
}

export default Team
