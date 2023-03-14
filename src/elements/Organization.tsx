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
import { PublishedElection } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputSearch from '../components/Forms/InputSearch'
import Header from '../components/Organitzation/Header'
import ProcessCard from '../components/Process/Card'

const IDS = [
  'c5d2460186f71db4f9b8eaa385aaf35284e4c98ec41442090c61020000000000',
  'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020400000000',
  '0xc5d2460186f7ec716643e01de8c4ca979c04bcd8d6367a30dc84020200000000',
]

const Organitzation = () => {
  const { client, account } = useClientContext()
  const navigate = useNavigate()

  const [electionsList, setElectionsList] = useState<PublishedElection[]>([])

  useEffect(() => {
    if (!client) return

    Promise.allSettled(IDS.map((id) => client.fetchElection(id)))
      .then((res) =>
        res.filter((el) => el.status === 'fulfilled').map((el: any) => el.value)
      )
      .then((res) => {
        setElectionsList(res)
      })
    // client
    //   .fetchElections()
    //   .then((res) => setElectionsList(res))
    //   .catch(console.log)
  }, [client, account])

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
              2
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
              30
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
            <Grid
              templateColumns={{
                base: '1fr',
                lg: 'repeat(2, 1fr)',
              }}
              gap={4}
            >
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
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default Organitzation
