import { Flex, Heading, Text } from '@chakra-ui/react'
import { useOrganization } from '@vocdoni/react-providers'
import { Trans, useTranslation } from 'react-i18next'
import { ContentsBox } from '~components/Organization/Dashboard/Box'
import { RoutedPagination } from '~components/Pagination/Pagination'
import { RoutedPaginationProvider } from '~components/Pagination/PaginationProvider'
import { usePaginatedElections } from '~src/queries/account'
import ProcessesList from './ProcessesList'

type VotingsProps = {
  page: number
  status?: string
}

const Votings = ({ page }: VotingsProps) => {
  const { organization } = useOrganization()
  const { data: elections, error, isLoading } = usePaginatedElections(page)

  if (!organization) return null

  return (
    <RoutedPaginationProvider
      totalPages={Math.ceil(organization?.electionIndex / 10)}
      path='/organization/votings/:page?/:status?'
    >
      <ProcessesList processes={elections} error={error} loading={isLoading} />
      <RoutedPagination />
    </RoutedPaginationProvider>
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
