import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/react-providers'
import { Trans } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Routes } from '~routes'
import { useCensusInfo, usePublishedCensusInfo } from '~src/queries/census'

const CensusView = () => {
  const navigate = useNavigate()
  const { organization } = useOrganization()
  const { id } = useParams<{ id: string }>()

  const { data: census } = useCensusInfo(id!)
  const { data: publishedCensus } = usePublishedCensusInfo(id!)

  if (!organization || !census) return null

  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center' mb={6}>
        <Heading size='lg'>
          <Trans>Census Details</Trans>
        </Heading>
        <Button
          colorScheme='primary'
          onClick={() => navigate(Routes.dashboard.census.participants.replace(':id', id!))}
        >
          <Trans>Add Participants</Trans>
        </Button>
      </Flex>

      <Stack spacing={4}>
        <Box>
          <Text fontWeight='bold'>
            <Trans>ID</Trans>
          </Text>
          <Text>{census.id}</Text>
        </Box>

        <Box>
          <Text fontWeight='bold'>
            <Trans>Type</Trans>
          </Text>
          <Text>{census.type}</Text>
        </Box>

        <Box>
          <Text fontWeight='bold'>
            <Trans>Organization Address</Trans>
          </Text>
          <Text>{census.orgAddress}</Text>
        </Box>

        <Box>
          <Text fontWeight='bold'>
            <Trans>Created At</Trans>
          </Text>
          <Text>{new Date(census.createdAt).toLocaleString()}</Text>
        </Box>

        {publishedCensus && (
          <>
            <Box>
              <Text fontWeight='bold'>
                <Trans>Published Status</Trans>
              </Text>
              <Text color='green.500'>
                <Trans>Published</Trans>
              </Text>
            </Box>

            <Box>
              <Text fontWeight='bold'>
                <Trans>Census URI</Trans>
              </Text>
              <Text>{publishedCensus.uri}</Text>
            </Box>

            <Box>
              <Text fontWeight='bold'>
                <Trans>Root Hash</Trans>
              </Text>
              <Text>{publishedCensus.root}</Text>
            </Box>
          </>
        )}
      </Stack>

      <Flex justifyContent='flex-end' mt={8}>
        <Button variant='outline' onClick={() => navigate(Routes.dashboard.census.list)}>
          <Trans>Back to List</Trans>
        </Button>
      </Flex>
    </Box>
  )
}

export default CensusView
