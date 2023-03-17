import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Flex,
  Grid,
  GridItem,
  IconButton,
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
import InputSearch from '../Forms/InputSearch'
import ProcessCard from '../Process/Card'
import Header from './Header'

const OrganizationView = ({ address }: { address: string | undefined }) => {
  const { client } = useClientContext()
  const navigate = useNavigate()

  const [electionsList, setElectionsList] = useState<PublishedElection[]>()
  const [page, setPage] = useState(0)
  const [totalRounds, setTotalRounds] = useState<number | undefined>()

  useEffect(() => {
    if (!client) return
    client
      .fetchAccountInfo()
      .then((res) => setTotalRounds(res.electionIndex))
      .catch(console.log)
  }, [client, address])

  useEffect(() => {
    if (!client) return

    client
      .fetchElections('0x' + address, page)
      .then((res) => setElectionsList(res))
      .catch(console.log)
  }, [client, address, page])

  const templateColumnsAllRounds =
    electionsList?.length === 1
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
            All rounds{' '}
            {totalRounds && (
              <Text
                as='span'
                px={2}
                display='inline-block'
                ml={2}
                bg='lightgray'
                borderRadius='20%'
              >
                {totalRounds}
              </Text>
            )}
          </Tab>
          <Tab whiteSpace='nowrap'>Active </Tab>
          <InputSearch
            marginRight={{ base: 'auto', md: 0 }}
            marginLeft='auto'
            maxWidth='300px'
          />
        </TabList>
        <TabPanels bg='gray.100'>
          <TabPanel>
            <Grid templateColumns={templateColumnsAllRounds} gap={4}>
              {electionsList?.map((election) => (
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
            <Flex justifyContent='center' p={4} cursor='pointer' gap={4}>
              <IconButton
                icon={<ArrowBackIcon />}
                onClick={() => setPage((prev) => prev - 1)}
                aria-label='Call Segun'
                size='lg'
                isDisabled={page === 0}
              />

              <IconButton
                icon={<ArrowForwardIcon />}
                onClick={() => setPage((prev) => prev + 1)}
                aria-label='Call Segun'
                size='lg'
                isDisabled={!electionsList?.length}
              />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Text textAlign='center'>Working...</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}
export default OrganizationView
