import { Flex } from '@chakra-ui/react'
import { RoutedPagination } from '@vocdoni/chakra-components'
import { RoutedPaginationProvider, useOrganization } from '@vocdoni/react-providers'
import { ElectionListWithPagination } from '@vocdoni/sdk'
import { Routes } from '~src/router/routes'
import ProcessesList from './ProcessesList'

const Votings = ({ data }: { data: ElectionListWithPagination }) => {
  const { organization } = useOrganization()

  if (!organization) return null

  return (
    <RoutedPaginationProvider path={Routes.dashboard.processes}>
      <VotingsList data={data} />
    </RoutedPaginationProvider>
  )
}

const VotingsList = ({ data }: { data: ElectionListWithPagination }) => {
  if (!data) return null

  const { elections, pagination } = data

  return (
    <Flex flexDirection='column' flexGrow={1} gap={5} height='full'>
      <ProcessesList processes={elections} />
      <Flex mt='auto' justifyContent='end'>
        {!!elections?.length && <RoutedPagination pagination={pagination} />}
      </Flex>
    </Flex>
  )
}

export default Votings
