import {
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
} from '@chakra-ui/react'
import { useClientContext } from '@vocdoni/react-components'
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ProcessCard from '../Process/Card'
import Header from './Header'

const OrganizationView = ({ address }: { address: string | undefined }) => {
  const { t } = useTranslation()
  const { client } = useClientContext()
  const navigate = useNavigate()

  const [electionsList, setElectionsList] = useState<any>()
  const [page, setPage] = useState(0)
  const refObserver = useRef<any>()
  useObserver(refObserver, setPage)

  useEffect(() => {
    if (!client) return

    client
      .fetchElections('0x' + address, page)
      .then((res) =>
        setElectionsList((prev: any) => {
          if (prev) return [...prev, ...res]
          return res
        })
      )
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
        <TabList>
          <Tab whiteSpace='nowrap'>{t('organization.rounds.all')}</Tab>
          <Tab whiteSpace='nowrap'> {t('organization.rounds.active')} </Tab>
        </TabList>
        <TabPanels bg='gray.100'>
          <TabPanel>
            {!electionsList && (
              <Flex justifyContent='center'>
                <Spinner />
              </Flex>
            )}
            <Grid templateColumns={templateColumnsAllRounds} gap={4}>
              {electionsList?.map((election: any) => (
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
              <div ref={refObserver}></div>
            </Grid>
          </TabPanel>
          <TabPanel>
            <Text textAlign='center'>{t('work_in_progress')}</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

const useObserver = (
  refObserver: MutableRefObject<Element | null>,
  setPage: Dispatch<SetStateAction<number>>
) => {
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
