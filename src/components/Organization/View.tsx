import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useOutsideClick,
} from '@chakra-ui/react'
import { useClient, useOrganization } from '@vocdoni/chakra-components'
import { InvalidElection, PublishedElection, areEqualHexStrings } from '@vocdoni/sdk'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import ProcessCardDetailed from '../Process/CardDetailed'
import SearchButton from '../Search/Button'
import SearchInput from '../Search/Input'
import Header from './Header'

const OrganizationView = () => {
  const { t } = useTranslation()
  const { client, account } = useClient()
  const { organization } = useOrganization()

  const [electionsList, setElectionsList] = useState<(PublishedElection | InvalidElection)[]>([])
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

  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

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

        setElectionsList((prev: (PublishedElection | InvalidElection)[]) => {
          if (prev) return [...prev, ...res]
          return res
        })
      })
      .catch((err) => {
        console.error('fetch elections error', err)
        setError(err.message)
        setFinished(true)
      })
      .finally(() => {
        setLoading(false)
        setLoaded(true)
      })
  }, [client, organization?.address, page, error, finished])

  return (
    <>
      <Header />
      <Tabs variant='organization' align='center' index={tabIndex} onChange={handleTabsChange}>
        {!isFullInput ? (
          <TabList>
            <Tab>
              {t('organization.rounds.all')}
              <Box>{organization?.electionIndex}</Box>
            </Tab>

            <Tab>{t('organization.rounds.active')}</Tab>

            <SearchInput
              position='absolute'
              zIndex={30}
              right={0}
              display={{ base: 'none', md: 'inline-block' }}
              mb={{ base: 25, sm: 0 }}
              w={{ md: '30%', lg: '20%' }}
              mt={2}
            />

            <Box position='absolute' right={0} display={{ base: 'inline-block', md: 'none' }} justifyContent='center'>
              <SearchButton displayFullInput={displayFullInput} aria={t('menu.search')} />
            </Box>
          </TabList>
        ) : (
          <Flex
            ref={refSearchInput}
            position='sticky'
            top='72px'
            zIndex={30}
            justifyContent='center'
            bgColor='organization.tabs.bg'
          >
            <SearchInput width='80%' />
          </Flex>
        )}

        <TabPanels>
          <TabPanel>
            <Grid
              templateColumns={{
                base: '1fr',
                md2: 'repeat(2, 1fr)',
                xl2: 'repeat(3, 1fr)',
              }}
              columnGap={{ base: 3, lg: 4 }}
              rowGap={6}
            >
              {electionsList?.map((election: any, idx: number) => (
                <GridItem key={idx} display='flex' justifyContent='center' alignItems='start'>
                  <ProcessCardDetailed election={election} />
                </GridItem>
              ))}
              <div ref={refObserver}></div>
            </Grid>

            <Flex justifyContent='center' mt={4}>
              {loading && <Spinner />}
              {loaded && !electionsList.length && areEqualHexStrings(account?.address, organization?.address) && (
                <Card variant='no-elections'>
                  <CardBody>
                    <Text>{t('organization.elections_list_empty')}</Text>
                    <NavLink to='/processes/create'>
                      <Button colorScheme='primary' rightIcon={<AddIcon />}>
                        {t('menu.create')}
                      </Button>
                    </NavLink>
                  </CardBody>
                </Card>
              )}
              {error && <Text>{error}</Text>}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Text textAlign='center'>{t('work_in_progress')}</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
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
