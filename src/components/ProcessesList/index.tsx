import { Box, Flex, HStack, Spinner } from '@chakra-ui/react'
import { useClientContext } from '@vocdoni/react-components'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ProcessesListFilters from './Filters'
import ProcessListRow from './Row'

export interface PropsFilters {
  search: string
  onlyCurrentElections: boolean
}

const IDS = [
  'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020400000000',
  'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020400000002',
]

const ProcessesList = () => {
  const { client, account } = useClientContext()
  const [electionsList, setElectionsList] = useState<PublishedElection[]>([])

  const methodsFilters = useForm<PropsFilters>({
    defaultValues: {
      search: '',
      onlyCurrentElections: false,
    },
  })

  methodsFilters.watch(['onlyCurrentElections', 'search'])

  const electionsListFiltered = getElectionsToDisplay(
    electionsList,
    methodsFilters.getValues()
  )

  useEffect(() => {
    if (!account || electionsList.length) return

    Promise.allSettled([
      client.fetchElection(IDS[0]),
      client.fetchElection(IDS[1]),
    ])
      .then(res =>
        res.filter(el => el.status === 'fulfilled').map((el: any) => el.value)
      )
      .then(res => setElectionsList(res))
    // client
    // 	.fetchElections()
    // 	.then(res => setElectionsList(res))
    // 	.catch(err => {
    // 		throw new Error();
    // 	});
  }, [client, account, electionsList.length])

  return (
    <Box m='16px auto' p={4} width={{ base: '97%', md: '650px' }}>
      <FormProvider {...methodsFilters}>
        <ProcessesListFilters />
      </FormProvider>

      <HStack>
        {!electionsList.length && <Spinner size='lg' marginX='auto' mt={12} />}
      </HStack>

      <Flex direction='column' gap={4} mt={8} mx='auto'>
        {electionsListFiltered?.map((el: PublishedElection) => (
          <ProcessListRow
            key={el.id}
            el={el}
            setElectionsList={setElectionsList}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default ProcessesList

const filterActive = (
  elections: PublishedElection[],
  filters: PropsFilters
) => {
  if (!filters.onlyCurrentElections) return [...elections]

  const now = new Date()

  return elections.filter(
    el =>
      now.getTime() < el.endDate.getTime() &&
      el.status !== ElectionStatus.CANCELED &&
      el.status !== ElectionStatus.ENDED &&
      el.status !== ElectionStatus.RESULTS
  )
}

const filterByTitle = (
  elections: PublishedElection[],
  filters: PropsFilters
) => {
  if (!filters.search) return [...elections]

  const lowerCaseSearch = filters.search.toLowerCase()

  return elections.filter((el: PublishedElection) =>
    el.title.default.toLowerCase().includes(lowerCaseSearch)
  )
}

export const getElectionsToDisplay = (
  elections: PublishedElection[],
  filters: PropsFilters
) => filterByTitle(filterActive(elections, filters), filters)
