import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/react-providers'
import { Trans } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Routes } from '~routes'
import { Census, useCensusList } from '~src/queries/census'

const CensusList = () => {
  const navigate = useNavigate()
  const { organization } = useOrganization()

  if (!organization) return null

  const { data: censuses } = useCensusList(organization.address)

  const handleViewCensus = (census: Census) => {
    navigate(Routes.dashboard.census.view.replace(':id', census.id))
  }

  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center' mb={6}>
        <Heading size='lg'>
          <Trans>Census</Trans>
        </Heading>
        <Button colorScheme='primary' onClick={() => navigate(Routes.dashboard.census.create)}>
          <Trans>Create Census</Trans>
        </Button>
      </Flex>

      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>
              <Trans>ID</Trans>
            </Th>
            <Th>
              <Trans>Type</Trans>
            </Th>
            <Th>
              <Trans>Created At</Trans>
            </Th>
            <Th>
              <Trans>Actions</Trans>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {!censuses?.length ? (
            <Tr>
              <Td colSpan={4} textAlign='center'>
                <Text color='gray.500'>
                  <Trans>No census found</Trans>
                </Text>
              </Td>
            </Tr>
          ) : (
            censuses.map((census) => (
              <Tr key={census.id}>
                <Td>{census.id}</Td>
                <Td>{census.type}</Td>
                <Td>{new Date(census.createdAt).toLocaleString()}</Td>
                <Td>
                  <IconButton
                    aria-label='View census'
                    icon={<ViewIcon />}
                    size='sm'
                    onClick={() => handleViewCensus(census)}
                  />
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  )
}

export default CensusList
