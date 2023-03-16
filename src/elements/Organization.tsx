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
import { useClientContext } from '@vocdoni/react-components'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputSearch from '../components/Forms/InputSearch'
import Header from '../components/Organitzation/Header'
import ProcessCard from '../components/Process/Card'

const IDS = [
  '0xc5d2460186f7aceb5739a2dbb0fd96d735e510548fe26e9dbf71020000000000',
  'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020400000000',
  'c5d2460186f706e50aad102b98ff552e3108d829c040e9be4cfc020000000000',
  '0xc5d2460186f74bce58a5130a43a047edf924e2742c6ae543accb020400000005',
  '0xc5d2460186f7ec716643e01de8c4ca979c04bcd8d6367a30dc84020200000000',
]

const Organitzation = () => {
  const { client } = useClientContext()
  const navigate = useNavigate()

  const [electionsList, setElectionsList] = useState<PublishedElection[]>([])

  useEffect(() => {
    if (!client) return

    // Promise.allSettled(IDS.map((id) => client.fetchElection(id)))
    //   .then((res) =>
    //     res.filter((el) => el.status === 'fulfilled').map((el: any) => el.value)
    //   )
    //   .then((res) => {
    //     setElectionsList(res)
    //   })
    client
      .fetchElections()
      .then((res) => setElectionsList(res))
      .catch(console.log)
  }, [client])

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
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  key={election.id}
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

export default Organitzation
