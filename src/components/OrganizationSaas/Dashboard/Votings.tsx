import { Flex, Heading, Text } from '@chakra-ui/react'
import { RoutedPagination } from '@vocdoni/chakra-components'
import { RoutedPaginationProvider, useOrganization, useRoutedPagination } from '@vocdoni/react-providers'
import { Trans, useTranslation } from 'react-i18next'
import { ContentsBox } from '~components/Organization/Dashboard/Box'
import { usePaginatedElections } from '~src/queries/account'
import ProcessesList from './ProcessesList'

const Votings = () => {
  const { organization } = useOrganization()

  if (!organization) return null

  return (
    <RoutedPaginationProvider path='/organization/votings/:page?/:status?'>
      <VotingsList />
    </RoutedPaginationProvider>
  )
}

const VotingsList = () => {
  const { page } = useRoutedPagination()
  const { data, error, isLoading } = usePaginatedElections(page ?? 0)

  if (!data) return null

  const { elections, pagination } = data

  return (
    <Flex flexDirection='column' flexGrow={1} gap='20px'>
      <ProcessesList processes={elections} error={error} loading={isLoading} />
      <Flex
        mt='auto'
        justifyContent='end'
        sx={{
          '& > div': {
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          },
          '& > div > div': {
            ml: 'auto',
          },
        }}
      >
        {!!elections?.length && <RoutedPagination pagination={pagination} />}
      </Flex>
    </Flex>
  )
}

export const VotingsHeader = () => {
  const { organization } = useOrganization()
  const { t } = useTranslation()

  if (!organization) return null

  return (
    <ContentsBox w='full'>
      <Flex
        flexDirection={{ base: 'column', xl2: 'row' }}
        justifyContent='space-between'
        alignItems={{ base: 'start', xl2: 'center' }}
        gap={2}
      >
        <Heading fontSize='heading-sm'>
          <Trans i18nKey='organization.votings_overview'>Votings overview</Trans>
        </Heading>
        <Text>{t('organization.voting_processes', { count: organization.electionIndex })}</Text>
      </Flex>
    </ContentsBox>
  )
}

export default Votings
