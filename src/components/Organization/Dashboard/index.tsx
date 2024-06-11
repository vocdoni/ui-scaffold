import { Flex, Heading, Text } from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/react-providers'
import { Trans, useTranslation } from 'react-i18next'
import { useLatestElections } from '~src/queries/account'
import { ContentsBox } from './Box'
import ProcessesList from './ProcessesList'

const OrganizationDashboard = () => {
  const { t } = useTranslation()
  const { data: elections, error, isLoading } = useLatestElections()
  const { organization } = useOrganization()

  if (!organization) return null

  return (
    <>
      <ContentsBox>
        <Flex
          flexDirection={{ base: 'column', xl2: 'row' }}
          justifyContent='space-between'
          alignItems={{ base: 'start', xl2: 'center' }}
          gap={2}
        >
          <Heading fontSize='xx-large'>
            <Trans i18nKey='organization.overview'>Overview</Trans>
          </Heading>
          <Text>{t('organization.voting_processes', { count: organization.electionIndex })}</Text>
        </Flex>
      </ContentsBox>
      <ProcessesList processes={elections} error={error} loading={isLoading} limit={3} />
    </>
  )
}

export default OrganizationDashboard
