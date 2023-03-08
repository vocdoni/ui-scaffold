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
import InputSearch from '../components/Forms/InputSearch'
import Header from '../components/Organitzation/Header'
import Card from '../components/Process/Card'

const IDS = [
  'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020400000000',
  'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020400000002',
  'c5d2460186f738fcd83e29167c22910f7cff9df127641d605710020000000000',
]

const Organitzation = () => {
  const { client, account } = useClientContext()

  const [electionsList, setElectionsList] = useState<PublishedElection[]>([])

  useEffect(() => {
    if (!account) return
    Promise.allSettled(IDS.map((id) => client.fetchElection(id)))
      .then((res) =>
        res.filter((el) => el.status === 'fulfilled').map((el: any) => el.value)
      )
      .then((res) => setElectionsList(res))
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
            >
              {electionsList.map((election) => (
                <GridItem
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  p={4}
                  key={election.id}
                  border='1px solid red'
                  maxW='100%'
                >
                  <Card election={election} />
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
