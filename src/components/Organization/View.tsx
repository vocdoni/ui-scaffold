import { Flex, Grid, GridItem, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { useClient, useOrganization } from '@vocdoni/chakra-components'
import { PublishedElection } from '@vocdoni/sdk'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import Card from '../Process/CardDetailed'
import SearchButton from '../Search/Button'
import SearchInput from '../Search/Input'
import Header from './Header'

const OrganizationView = () => {
  const { t } = useTranslation()
  const { client } = useClient()
  const { organization } = useOrganization()

  const [electionsList, setElectionsList] = useState<PublishedElection[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [finished, setFinished] = useState<boolean>(false)

  const [isFullInput, setIsFullInput] = useState(false)
  const displayFullInput = () => setIsFullInput(true)
  const refSearchInput = useRef<HTMLDivElement>(null)

  useOutsideClick({
    ref: refSearchInput,
    handler: () => setIsFullInput(false),
  })

  const refObserver = useRef<any>()
  const [page, setPage] = useState<number>(-1)
  useObserver(refObserver, setPage)

  // empties the list on account change
  useEffect(() => {
    // empty list to ensure it's properly populated
    setElectionsList([])
  }, [organization?.address])

  // loads elections. Note the load trigger is done via useObserver using a layer visibility.
  useEffect(() => {
    if (finished) return

    // start loading at first glance
    setLoaded(false)
    setLoading(true)

    if (!client || page === -1 || error || !organization?.address) return

    client
      .fetchElections(organization?.address, page)
      .then((res) => {
        if (!res || (res && !res.length)) {
          setFinished(true)
        }

        setElectionsList((prev: PublishedElection[]) => {
          if (prev) return [...prev, ...res]
          return res
        })
      })
      .catch((err) => {
        console.error('fetch elections error', err)
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
        setLoaded(true)
      })
  }, [client, organization?.address, page, error, finished])

  return (
    <Flex direction='column' gap={4}>
      <Header address={address} />
      <Tabs align='center' mt={8}>
        {!isFullInput ? (
          <TabList position='sticky' top='72px' zIndex={10} bgColor='organization.tabs.bg'>
            <Flex>
              <Tab whiteSpace='nowrap' color='organization.tabs.color'>
                {t('organization.rounds.all')}
              </Tab>
              <Box borderRight='1px solid' borderColor='organization.tabs.divider' p={2} my={1} />
              <Tab whiteSpace='nowrap' color='organization.tabs.color'>
                {t('organization.rounds.active')}
              </Tab>

              <SearchInput
                display={{ base: 'none', md: 'inline-block' }}
                position='absolute'
                right={0}
                mb={{ base: 25, sm: 0 }}
                w={{ base: '50%', md: '30%', lg: '20%' }}
              />

              <Box display={{ base: 'inline-block', md: 'none' }} justifyContent='center' position='absolute' right={0}>
                <SearchButton displayFullInput={displayFullInput} aria={t('menu.search')} />
              </Box>
            </Flex>
          </TabList>
        ) : (
          <Flex
            ref={refSearchInput}
            justifyContent='center'
            position='sticky'
            bgColor='organization.tabs.bg'
            top='72px'
            zIndex={10}
          >
            <SearchInput width='80vw' />
          </Flex>
        )}

        <TabPanels>
          <TabPanel>
            <Grid
              templateColumns={{
                base: '1fr',
                lg: 'repeat(2, 1fr)',
                '2.1xl': 'repeat(3, 1fr)',
              }}
              columnGap={6}
              rowGap={8}
            >
              {electionsList?.map((election: PublishedElection, idx: number) => (
                <GridItem key={idx} display='flex' justifyContent='center' alignItems='start'>
                  <Card election={election} />
                </GridItem>
              ))}
              <div ref={refObserver}></div>
            </Grid>
            <Flex justifyContent='center' mt={4}>
              {loading && <Spinner />}
              {loaded && !electionsList.length && (
                <Flex
                  direction='column'
                  justifyContent='center'
                  alignItems='center'
                  gap={3}
                  w={124}
                  p={12}
                  bgColor='organization.election_list_empty.bg'
                  borderRadius={2}
                  border='1px solid'
                  borderColor='organization.election_list_empty.border'
                >
                  <Text textAlign='center' fontSize='2xl'>
                    {t('organization.elections_list_empty')}
                  </Text>
                  <NavLink to='/processes/create'>
                    <Button
                      rightIcon={<AddIcon />}
                      variant='solid'
                      colorScheme='navbar.btn_create'
                      sx={{ span: { margin: 0 } }}
                    >
                      <Text as='span' display={{ base: 'none', md: 'inline-block' }} pr={2}>
                        {t('menu.create')}
                      </Text>
                    </Button>
                  </NavLink>
                </Flex>
              )}
              {error && <Text>{error}</Text>}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Text textAlign='center'>{t('work_in_progress')}</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

const useObserver = (refObserver: any, setPage: Dispatch<SetStateAction<number>>) => {
  useEffect(() => {
    return () => {
      if (refObserver.current) refObserver.current = null
    }
  }, [refObserver])

  useEffect(() => {
    if (!refObserver.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1)
        }
      },
      {
        threshold: 0.1,
      }
    )

    observer.observe(refObserver.current)
  }, [refObserver, setPage])
}
export default OrganizationView
