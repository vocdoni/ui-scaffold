import {
  Flex,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { useNavigate } from 'react-router-dom'
import InputSearch from '../Forms/InputSearch'
import ProcessCard from '../Process/Card'
import Header from './Header'

const OrganizationView = ({
  electionsList,
}: {
  electionsList: PublishedElection[]
}) => {
  //   const { client } = useClientContext()
  const navigate = useNavigate()

  //   const [electionsList2, setElectionsList] = useState<PublishedElection[]>([])

  //   useEffect(() => {
  //     if (!client) return

  //     // Promise.allSettled(IDS.map((id) => client.fetchElection(id)))
  //     //   .then((res) =>
  //     //     res.filter((el) => el.status === 'fulfilled').map((el: any) => el.value)
  //     //   )
  //     //   .then((res) => {
  //     //     setElectionsList(res)
  //     //   })
  //     client
  //       .fetchElections('')
  //       .then((res) => console.log(res))
  //       .catch(console.log)
  //   }, [client])

  const electionsActive = electionsList.filter((el) => {
    if (
      el.status === ElectionStatus.READY ||
      el.status === ElectionStatus.PAUSED
    )
      return el
    else return null
  })

  const templateColumnsActive =
    electionsActive.length === 1
      ? {
          base: '1fr',
        }
      : {
          base: '1fr',
          lg: 'repeat(2, 1fr)',
        }

  const templateColumnsAllRounds =
    electionsList.length === 1
      ? {
          base: '1fr',
        }
      : {
          base: '1fr',
          lg: 'repeat(2, 1fr)',
        }

  return (
    <Flex direction='column' gap={4}>
      <Header />
      <Tabs variant='enclosed' mt={8}>
        <TabList
          display='flex'
          flexDirection={{ base: 'column-reverse', md: 'row' }}
          gap={{ md: 4 }}
        >
          <Tab whiteSpace='nowrap'>
            Active{' '}
            <Text
              as='span'
              display='inline-block'
              width='25px'
              ml={2}
              bg='lightgray'
              borderRadius='20%'
            >
              {electionsActive.length}
            </Text>
          </Tab>
          <Tab whiteSpace='nowrap'>
            All rounds{' '}
            <Text
              as='span'
              display='inline-block'
              width='25px'
              ml={2}
              bg='lightgray'
              borderRadius='20%'
            >
              {' '}
              {electionsList.length}
            </Text>
          </Tab>
          <InputSearch
            marginRight={{ base: 'auto', md: 0 }}
            marginLeft='auto'
            maxWidth='300px'
          />
        </TabList>
        <TabPanels bg='gray.100'>
          <TabPanel>
            <Grid templateColumns={templateColumnsActive} gap={4}>
              {electionsActive.map((election) => (
                <GridItem
                  key={election.id}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  onClick={() => navigate(`/processes/${election.id}`)}
                >
                  <ProcessCard election={election} />
                </GridItem>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid templateColumns={templateColumnsAllRounds} gap={4}>
              {electionsList.map((election) => (
                <GridItem
                  key={election.id}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  onClick={() => navigate(`/processes/${election.id}`)}
                >
                  <ProcessCard election={election} />
                </GridItem>
              ))}
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}
export default OrganizationView
