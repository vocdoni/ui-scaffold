import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Card, CardHeader, Circle, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
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
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { ExplorerBaseURL } from '../../constants'
import ProcessActions from './Actions'
import ProcessAside from './Aside'
import ProcessCardResults from './CardResults'
import { ProcessDate } from './Date'

export const ProcessView = (props: ElectionProviderComponentProps) => {
  const { election } = props
  const { isConnected } = useAccount()
  const { client, account } = useClientContext()

  const navigate = useNavigate()
  const { t } = useTranslation()

  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  const [isInCensus, setIsInCensus] = useState<boolean>(false)
  const [hasAlreadyVoted, setHasAlreadyVoted] = useState<boolean>(false)

  useEffect(() => {
    if (!isConnected || !account || !election) return

    client
      .isInCensus(election?.id)
      .then((res) => {
        setIsInCensus(res)
      })
      .catch(console.log)

    client
      .hasAlreadyVoted(election?.id)
      .then((res) => {
        setHasAlreadyVoted(res)
      })
      .catch(console.log)
  }, [account, isConnected, client, election])

  useEffect(() => {
    if (election?.status === ElectionStatus.RESULTS) setTabIndex(1)
  }, [election])

  return (
    <ElectionProvider {...props}>
      <Flex direction='column' gap={5}>
        <Text onClick={() => navigate(-1)} cursor='pointer'>
          <ArrowBackIcon /> Org Name
        </Text>
        <ElectionSchedule textAlign='left' color='branding.pink' />
        <ElectionTitle fontSize={18} mb={0} textAlign='left' />
        <ElectionDescription />
      </Flex>
      <Tabs index={tabIndex} onChange={handleTabsChange}>
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
                (election?.status === ElectionStatus.ONGOING || election?.status === ElectionStatus.PAUSED) && (
                  <>
                    {election?.electionType.interruptible && <ProcessActions />}
                    {!election?.electionType.interruptible && <Text fontWeight='bold'>Not interruptible</Text>}
                  </>
                )}
            </Flex>

            <Flex gap={4} flexDirection={{ base: 'column', lg: 'row' }}>
              <Box flex={{ lg: '1 1 500px' }} order={{ base: 2, lg: 1 }}>
                <QuestionsForm />
              </Box>
              <ProcessAside
                isInCensus={isInCensus}
                hasAlreadyVoted={hasAlreadyVoted}
                handleTabsChange={handleTabsChange}
                order={{ base: 1, lg: 2 }}
                alignSelf={{ base: 'center', lg: 'start' }}
              />
            </Flex>
          </TabPanel>
          <TabPanel>
            {election && (
              <Flex gap={4} flexDirection={{ base: 'column', lg: 'row' }} alignItems='center'>
                {election.status === ElectionStatus.CANCELED ? (
                  <Text color='branding.red' textAlign='center' w='full'>
                    {t('process.date.canceled')}
                  </Text>
                ) : (
                  <Box flex={{ lg: '1 1 500px' }} order={{ base: 2, lg: 1 }}>
                    <ProcessCardResults election={election} />
                  </Box>
                )}

                {hasAlreadyVoted && (
                  <Card
                    cursor='pointer'
                    variant='aside'
                    order={{ base: 1, lg: 2 }}
                    alignSelf={{ base: 'center', lg: 'start' }}
                  >
                    <CardHeader>
                      <Circle>
                        <ExternalLinkIcon />
                      </Circle>

                      <Box>
                        <Text>
                          <Link to={`${ExplorerBaseURL}/verify`} target='_blank'>
                            {t('aside.explorer')}
                          </Link>
                        </Text>
                      </Box>
                    </CardHeader>
                  </Card>
                )}
              </Flex>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ElectionProvider>
  )
}
