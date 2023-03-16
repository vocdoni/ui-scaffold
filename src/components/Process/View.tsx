import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import {
  ElectionDescription,
  ElectionProvider,
  ElectionProviderComponentProps,
  ElectionSchedule,
  ElectionTitle,
  QuestionsForm,
  useClientContext,
} from '@vocdoni/react-components'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ProcessActions from './Actions'
import ProcessAside from './Aside'
import ProcessCardResults from './CardResults'
import ProcessViewNav from './Nav'

export const ProcessView = (props: ElectionProviderComponentProps) => {
  const { client, account } = useClientContext()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { election } = props

  console.log(election?.organizationId, account?.address)
  console.log(election?.electionType.interruptible)

  return (
    <ElectionProvider {...props}>
      <Flex direction='column' gap={5} mb={8}>
        <Text onClick={() => navigate(-1)} cursor='pointer'>
          <ArrowBackIcon /> Org Name
        </Text>
        <ElectionSchedule textAlign='left' color='branding.pink' isTruncated />
        <ElectionTitle fontSize='1.5em' mb={0} textAlign='left' isTruncated />
        <ElectionDescription />
      </Flex>
      <Tabs>
        <TabList display='flex'>
          <Tab>{t('process.questions')}</Tab>
          <Tab>{t('process.results')}</Tab>
          <ProcessViewNav
            startDate={props.election?.startDate}
            endDate={props.election?.endDate}
          />
        </TabList>
        <TabPanels bg='gray.100'>
          <TabPanel>
            <Flex justifyContent='center' gap={4} mb={4}>
              {election?.organizationId === account?.address &&
                isOngoing(election) && (
                  <>
                    {election?.electionType.interruptible && (
                      <ProcessActions
                        client={client}
                        id={election?.id}
                        status={election?.status}
                      />
                    )}
                    {!election?.electionType.interruptible && (
                      <Text fontWeight='bold'>Not interruptible</Text>
                    )}
                  </>
                )}
            </Flex>

            <Flex gap={4} flexDirection={{ base: 'column', lg: 'row' }}>
              <Box flex={{ lg: '1 1 500px' }} order={{ base: 2, lg: 1 }}>
                <QuestionsForm />
              </Box>
              <ProcessAside
                order={{ base: 1, lg: 2 }}
                alignSelf={{ base: 'center', lg: 'start' }}
              />
            </Flex>
          </TabPanel>
          <TabPanel>
            {election && <ProcessCardResults election={election} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ElectionProvider>
  )
}

const isOngoing = (election: PublishedElection | undefined) => {
  if (!election) return false
  const now = new Date()

  const isStarted = now.getTime() > election.startDate.getTime()

  return (
    isStarted &&
    election.status !== ElectionStatus.RESULTS &&
    election.status !== ElectionStatus.CANCELED &&
    election.status !== ElectionStatus.ENDED
  )
}
