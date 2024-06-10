import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/react-providers'
import { Trans } from 'react-i18next'
import { useLatestElections } from '~src/queries/account'
import { ContentsBox } from './Box'
import ProcessesList from './ProcessesList'

const OrganizationDashboard = () => {
  const { data: elections, error, isLoading } = useLatestElections()
  const { organization } = useOrganization()

  if (!organization) return null

  return (
    <>
      <ContentsBox>
        <VStack alignItems='start'>
          <Heading>
            <Trans i18nKey='organization.overview'>Overview</Trans>
          </Heading>
          <Text>
            <Trans i18nKey='organization.voting_processes' count={organization.electionIndex} />
          </Text>
        </VStack>
      </ContentsBox>
      <Box>
        <Heading size='md' mb={4}>
          <Trans i18nKey='organization.latest_votings'>Latest votings</Trans>
        </Heading>
        <ProcessesList processes={elections} error={error} loading={isLoading} limit={3} />
      </Box>
    </>
  )
}

export default OrganizationDashboard
