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
import { ElectionStatus } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ProcessActions from './Actions'
import ProcessAside from './Aside'
import ProcessCardResults from './CardResults'
import { ProcessDate } from './Date'

export const ProcessView = (props: ElectionProviderComponentProps) => {
  const { client, account } = useClientContext()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { election } = props

  return (
    <ElectionProvider {...props}>
      <Flex direction='column' gap={5}>
        <Text onClick={() => navigate(-1)} cursor='pointer'>
          <ArrowBackIcon /> Org Name
        </Text>
        <ElectionSchedule textAlign='left' color='branding.pink' isTruncated />
        <ElectionTitle fontSize={18} mb={0} textAlign='left' isTruncated />
        <ElectionDescription />
      </Flex>
      <Tabs>
        <TabList display='flex'>
          <Tab>{t('process.questions')}</Tab>
          <Tab>{t('process.results')}</Tab>
          <Flex ml='auto'>
            <ProcessDate />
          </Flex>
        </TabList>
        <TabPanels bg='gray.100'>
          <TabPanel>
            <Flex justifyContent='center' gap={4} mb={4}>
              {election?.organizationId === account?.address &&
                (election?.status === ElectionStatus.ONGOING ||
                  election?.status === ElectionStatus.PAUSED) && (
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
