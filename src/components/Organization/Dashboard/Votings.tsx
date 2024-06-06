import { Heading, Text, VStack } from '@chakra-ui/react'
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
    <VStack alignItems='start' gap={6} w='full'>
      <Heading fontSize='xl' fontWeight={600}>
        <Trans i18nKey='organization.votings'>Votings</Trans>
      </Heading>
      <RoutedPaginationProvider
        totalPages={Math.ceil(organization?.electionIndex / 10)}
        path='/organization/votings/:page?/:status?'
      >
        <ProcessesList processes={elections} error={error} loading={isLoading} />
        <RoutedPagination />
      </RoutedPaginationProvider>
    </VStack>
  )
}

export const VotingsHeader = () => {
  const { organization } = useOrganization()
  const { t } = useTranslation()

  if (!organization) return null

  return (
    <ContentsBox w='full'>
      <VStack alignItems='start'>
        <Heading>
          <Trans i18nKey='organization.votings_overview'>Votings overview</Trans>
        </Heading>
        <Text>
          {t('organization.voting_processes', {
            votes: organization.electionIndex,
            defaultValue: '{{votes}} voting processes',
          })}
        </Text>
      </VStack>
    </ContentsBox>
  )
}

export default Votings
