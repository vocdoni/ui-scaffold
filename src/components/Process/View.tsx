import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Card, CardHeader, Circle, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import {
  ElectionActions,
  ElectionDescription,
  ElectionQuestions,
  ElectionResults,
  ElectionSchedule,
  ElectionTitle,
  enforceHexPrefix,
  useElection,
  useOrganization,
} from '@vocdoni/chakra-components'
import { ElectionStatus } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ExplorerBaseURL } from '../../constants'
import ProcessAside from './Aside'
import { ProcessDate } from './Date'

export const ProcessView = () => {
  const { organization } = useOrganization()
  const { election, isInCensus, voted } = useElection()
  const { t } = useTranslation()

  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  useEffect(() => {
    if (election?.status === ElectionStatus.RESULTS) setTabIndex(1)
  }, [election])

  return (
    <>
      <Flex direction='column' gap={5}>
        <Link to={`/organization/0x${election?.organizationId}`}>
          <ArrowBackIcon /> {organization?.account.name.default || enforceHexPrefix(organization?.address)}
        </Link>
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
              <ElectionActions />
            </Flex>

            <Flex gap={4} flexDirection={{ base: 'column', lg: 'row' }}>
              <Box flexGrow={{ lg: 1 }} flexShrink={{ lg: 1 }} flexBasis={{ lg: 124 }} order={{ base: 2, lg: 1 }}>
                <ElectionQuestions />
              </Box>
              <ProcessAside
                isInCensus={isInCensus}
                hasAlreadyVoted={voted !== null && voted.length > 0}
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
                  <Text color='process.canceled' textAlign='center' w='full'>
                    {t('process.date.canceled')}
                  </Text>
                ) : (
                  <Box flexGrow={{ lg: 1 }} flexShrink={{ lg: 1 }} flexBasis={{ lg: 124 }} order={{ base: 2, lg: 1 }}>
                    <ElectionResults />
                  </Box>
                )}

                {voted && (
                  <Card
                    cursor='pointer'
                    variant='process-info'
                    order={{ base: 1, lg: 2 }}
                    alignSelf={{ base: 'center', lg: 'start' }}
                  >
                    <CardHeader>
                      <Circle>
                        <ExternalLinkIcon />
                      </Circle>

                      <Box>
                        <Text>
                          {/* TODO: update to send directly to /verify/#/:voteid when we have it from SDK */}
                          <Link to={`${ExplorerBaseURL}/verify`} target='_blank'>
                            {t('aside.verify_vote_on_explorer')}
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
    </>
  )
}
