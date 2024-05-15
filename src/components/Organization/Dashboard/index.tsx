import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { Trans } from 'react-i18next'
import { BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useLatestElections } from '~src/queries/account'
import { ContentsBox } from './Box'
import ProcessesList from './ProcessesList'

const OrganizationDashboard = () => {
  const { account } = useClient()
  const { data: elections, error, isLoading } = useLatestElections()

  return (
    <>
      <ContentsBox>
        <Flex wrap='wrap'>
          <Heading size='lg'>
            <Trans i18nKey='organization.overview'>Overview</Trans>
          </Heading>
          <Button ml='auto' variant='ghost' colorScheme='teal' as={Link} to={`/organization/${account?.address}`}>
            <Trans i18nKey='organization.view_public_profile'>View public profile</Trans>
          </Button>
          <Button ml={4} as={Link} to='/processes/create' leftIcon={<BiPlus />} gap={0}>
            <Trans i18nKey='menu.new_process'>New vote</Trans>
          </Button>
        </Flex>
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
