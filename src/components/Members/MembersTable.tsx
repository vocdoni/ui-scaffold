import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { enforceHexPrefix, useOrganization } from '@vocdoni/react-providers'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { QueryKeys } from '~src/queries/keys'

type Participant = {
  [key: string]: string | number | boolean | null | object
}

type OrganizationParticipantsResponse = {
  participants?: Participant[]
}

const useOrganizationParticipants = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()

  return useQuery<Participant[], Error>({
    queryKey: QueryKeys.organization.participants(organization?.address),
    enabled: !!organization?.address,
    queryFn: async () => {
      const response = await bearedFetch<OrganizationParticipantsResponse>(
        ApiEndpoints.OrganizationParticipants.replace('{address}', enforceHexPrefix(organization.address))
      )
      // return response.participants || []
      return [{ name: 'John' }]
    },
  })
}

export const MembersTable = () => {
  const { data: participants, isLoading } = useOrganizationParticipants()

  if (isLoading) return <Text>Loading...</Text>

  if (!participants.length) return <Text>No participants found.</Text>

  const headers = Object.keys(participants[0])

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th key={header}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {participants.map((participant, idx) => (
            <Tr key={idx}>
              {headers.map((header) => (
                <Td key={header}>
                  {typeof participant[header] === 'object'
                    ? JSON.stringify(participant[header])
                    : String(participant[header])}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack mt={4} justify='space-between'>
        <Text>Page</Text>
        <HStack>
          <IconButton aria-label='Previous page' icon={<ChevronLeftIcon />} />
          <IconButton aria-label='Next page' icon={<ChevronRightIcon />} />
        </HStack>
      </HStack>
    </TableContainer>
  )
}
