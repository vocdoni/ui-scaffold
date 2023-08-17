import { Box, Card, CardBody, Link as ChakraLink, Flex, Grid, GridItem, Link, Spinner, Text } from '@chakra-ui/react'
import Logo from '@components/Layout/Logo'
import { useClient, useOrganization } from '@vocdoni/react-providers'
import { InvalidElection, PublishedElection, areEqualHexStrings } from '@vocdoni/sdk'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import ProcessCardDetailed from '../Process/CardDetailed'
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

  const refObserver = useRef<any>()
  const [page, setPage] = useState<number>(-1)
  useObserver(refObserver, setPage)

  // resets fields on account change
  useEffect(() => {
    setElectionsList([])
    setFinished(false)
    setPage(0)
    setLoaded(false)
    setLoading(false)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, error, finished, organization?.address])

  return (
    <Box maxW='1200px' mx='auto'>
      <Header />

      <Text as='h2' fontSize='xl' fontWeight='bold' mb={8} textAlign={{ base: 'center', md2: 'start' }}>
        {t('organization.elections')}
      </Text>

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

      <Flex justifyContent='center' my={4}>
        {loading && <Spinner />}
        {loaded && !electionsList.length && (
          <Card variant='no-elections'>
            <CardBody>
              <Box>
                <Logo />
              </Box>
              <Box>
                {areEqualHexStrings(account?.address, organization?.address) ? (
                  <>
                    <Text textAlign='center'>{t('organization.elections_list_empty.title')}</Text>
                    <Text textAlign='center'>{t('organization.elections_list_empty.description')}</Text>
                    <Text>
                      <Trans
                        i18nKey='organization.elections_list_empty.footer'
                        components={{
                          tos: <Link variant='primary' href='' target='_blank' />,
                        }}
                      />
                    </Text>

                    <ChakraLink as={ReactRouterLink} to='/processes/create' variant='button' colorScheme='primary'>
                      {t('menu.create')}
                    </ChakraLink>
                  </>
                ) : (
                  <Text textAlign='center'>{t('organization.elections_list_empty.not_owner')}</Text>
                )}
              </Box>
            </CardBody>
          </Card>
        )}

        {error && <Text>{error}</Text>}
      </Flex>
    </Box>
  )
}

const useObserver = (refObserver: any, setPage: Dispatch<SetStateAction<number>>) => {
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

    return () => {
      if (refObserver.current) refObserver.current = null
    }
  }, [refObserver, setPage])
}
export default OrganizationView
