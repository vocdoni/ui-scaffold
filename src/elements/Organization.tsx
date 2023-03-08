import {
  AspectRatio,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
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
import ProcessCard from '../components/Process/Card'

const IDS = [
  'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020400000000',
  'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020400000002',
  'c5d2460186f738fcd83e29167c22910f7cff9df127641d605710020000000000',
]

const Organitzation = () => {
  const { client, account } = useClientContext()
  const navigate = useNavigate()
  const [electionsList, setElectionsList] = useState<PublishedElection[]>([])

  useEffect(() => {
    if (!account) return
    Promise.allSettled(IDS.map(id => client.fetchElection(id)))
      .then(res =>
        res.filter(el => el.status === 'fulfilled').map((el: any) => el.value)
      )
      .then(res => setElectionsList(res))
  }, [client, account])

  return (
    <>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={4}
        maxWidth='1000px'
        mx='auto'
        mb={16}
        mt={8}
      >
        <AspectRatio
          flexBasis={{ base: '200px', sm: '150px', md: '200px' }}
          flexShrink={0}
          ratio={1}
          maxHeight={{ base: '200px', sm: '150px', md: '200px' }}
        >
          <Image
            mx='auto'
            maxWidth={{ base: '200px', sm: '150px', md: '200px' }}
            borderRadius='10px'
            src='https://images.pexels.com/photos/7103129/pexels-photo-7103129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            alt='organization X'
          />
        </AspectRatio>
        <Flex
          direction='column'
          gap={4}
          px={6}
          pb={3}
          maxHeight='200px'
          overflow='hidden'
        >
          <Flex
            gap={{ base: 2, md: 8 }}
            alignItems={{ base: 'center', sm: 'start' }}
            direction={{ base: 'column', md: 'row' }}
          >
            <Heading
              as='h1'
              fontSize='2em'
              maxW='100%'
              isTruncated
              title='The Organization Name'
            >
              The Organization Name
            </Heading>
            <Text
              width='100px'
              isTruncated
              title='Ox431277732423bh4234'
              cursor='pointer'
            >
              Ox431277732423bh4234
            </Text>
          </Flex>
          <Flex
            justifyContent={{ base: 'center', sm: 'start' }}
            alignItems='center'
            gap={4}
          >
            <Text>
              <Text as='span' fontWeight='bold'>
                20
              </Text>{' '}
              Eelections
            </Text>

            <Text>
              <Text as='span' fontWeight='bold'>
                627
              </Text>{' '}
              Members
            </Text>
          </Flex>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            laboliquip ex ea commodo const dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </Text>
        </Flex>
      </Flex>
      <Tabs variant='enclosed'>
        <TabList>
          <Tab>
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
          <Tab>
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
          <InputSearch width='300px' marginLeft='auto' />
        </TabList>
        <TabPanels bg='gray.100'>
          <TabPanel>
            <Grid
              templateColumns={{
                base: '1fr',
                lg: 'repeat(2, 1fr)',
              }}
            >
              {electionsList.map(election => (
                <GridItem
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  p={4}
                  key={election.id}
                  cursor='pointer'
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
    </>
  )
}

export default Organitzation
