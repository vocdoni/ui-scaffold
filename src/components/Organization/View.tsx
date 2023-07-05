import { Flex, Grid, GridItem, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { ElectionProvider, useClient, useOrganization } from '@vocdoni/chakra-components'
import { InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ProcessCard from '../Process/Card'
import SearchInput from '../Search/Input'
import Header from './Header'

const OrganizationView = () => {
  const { t } = useTranslation()
  const { client } = useClient()
  const { organization } = useOrganization()

  const [electionsList, setElectionsList] = useState<(PublishedElection | InvalidElection)[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [finished, setFinished] = useState<boolean>(false)

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
      <Tabs mt={8} colorScheme='brand.scheme'>
        <TabList
          position='relative'
          display='flex'
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent='center'
          alignItems='center'
        >
          <SearchInput
            position={{ md: 'absolute' }}
            right={0}
            mb={{ base: 25, sm: 0 }}
            w={{ base: '50%', md: '30%', lg: '20%' }}
          />
          <Flex>
            <Tab whiteSpace='nowrap'>{t('organization.rounds.all')}</Tab>
            <Tab whiteSpace='nowrap'> {t('organization.rounds.active')} </Tab>
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid templateColumns={templateColumnsAllRounds} gap={4}>
              {electionsList?.map((election: any, idx: number) => (
                <Link to={`/processes/0x${election.id}`} key={idx}>
                  <GridItem display='flex' justifyContent='center' alignItems='center'>
                    <ElectionProvider election={election}>
                      <ProcessCard />
                    </ElectionProvider>
                  </GridItem>
                </Link>
              ))}
              <div ref={refObserver}></div>
            </Grid>
            <Flex justifyContent='center' mt={4}>
              {loading && <Spinner />}
              {loaded && !electionsList.length && !error && <Text>{t('organization.elections_list_empty')}</Text>}
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
