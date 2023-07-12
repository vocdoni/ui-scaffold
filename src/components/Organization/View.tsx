import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex, Grid, GridItem, Spinner, Text } from '@chakra-ui/react'
import { useClient, useOrganization } from '@vocdoni/chakra-components'
import { InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import Card from '../Process/CardDetailed'
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

  return (
    <>
      <Header />
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
            <Text textAlign='center' fontSize='xl2'>
              {t('organization.elections_list_empty')}
            </Text>
            <NavLink to='/processes/create'>
              <Button sx={{ span: { margin: 0 } }} rightIcon={<AddIcon />}>
                <Text as='span' display={{ base: 'none', md: 'inline-block' }} pr={2}>
                  {t('menu.create')}
                </Text>
              </Button>
            </NavLink>
          </Flex>
        )}
        {error && <Text>{error}</Text>}
      </Flex>
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
