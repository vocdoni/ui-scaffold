import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Img,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { useClient, useOrganization } from '@vocdoni/react-providers'
import { ArchivedElection, areEqualHexStrings, InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import ProcessCardDetailed from '../Process/CardDetailed'
import Header from './Header'
import org from '/assets/empty-list-org.png'
import user from '/assets/empty-list-user.png'

const OrganizationView = () => {
  const { t } = useTranslation()
  const { client, account } = useClient()
  const { organization, fetch } = useOrganization()

  const [electionsList, setElectionsList] = useState<(PublishedElection | InvalidElection | ArchivedElection)[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [finished, setFinished] = useState<boolean>(false)
  // we need refobserver to be in state to ensure the observer is assigned when rendering the ref layer
  // otherwise, the observer is not assigned and the intersection is not triggered
  const [refObserver, setRefObserver] = useState<HTMLDivElement | null>(null)

  const [page, setPage] = useState<number>(-1)
  useObserver(refObserver, setPage, setRefObserver)

  // refetch account info in case it changes in client (i.e. when editing the account profile in this same page)
  useEffect(() => {
    // only re-fetch if account is the same as the one rendered, otherwise it will load incorrect data
    if (!areEqualHexStrings(account?.address, organization?.address)) return

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

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
    if (finished || loading || !client || page === -1 || error || !organization?.address) return

    setLoading(true)

    client
      .fetchElections(organization.address, page)
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
    <Box>
      <Header />

      <Text as='h2' fontSize='xl' fontWeight='bold' mb={4} textAlign={{ base: 'center', md2: 'start' }}>
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
        {/* we need to render only when loaded, to avoid loading pages when there's no content */}
        {loaded && <div className='ref-observer-buddy' ref={setRefObserver}></div>}
      </Grid>

      <Flex justifyContent='center' my={4}>
        {loading && <Spinner />}
        {loaded && !electionsList.length && (
          <Card variant='no-elections'>
            <CardBody>
              <Box>
                <Img
                  src={areEqualHexStrings(account?.address, organization?.address) ? org : user}
                  alt={t('organization.elections_list_empty.alt')}
                />
              </Box>
              <Box>
                {areEqualHexStrings(account?.address, organization?.address) ? (
                  <>
                    <Text>{t('organization.elections_list_empty.title')}</Text>
                    <Text>{t('organization.elections_list_empty.description')}</Text>

                    <Link as={ReactRouterLink} to='/processes/create' variant='button' colorScheme='primary'>
                      {t('menu.create')}
                    </Link>
                  </>
                ) : (
                  <Text textAlign='center'>{t('organization.elections_list_empty.not_owner')}</Text>
                )}
              </Box>
            </CardBody>
          </Card>
        )}
      </Flex>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Box>
  )
}

const useObserver = (
  refObserver: any,
  setPage: Dispatch<SetStateAction<number>>,
  setRefObserver: Dispatch<SetStateAction<HTMLDivElement | null>>
) => {
  useEffect(() => {
    if (!refObserver) return

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

    observer.observe(refObserver)

    return () => {
      if (refObserver) setRefObserver(null)
    }
  }, [refObserver, setPage])
}
export default OrganizationView
