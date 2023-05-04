import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { ElectionQuestions, ElectionResults, useElection, useOrganization } from '@vocdoni/chakra-components'
import { ElectionStatus } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProcessAside from './Aside'
import Header from './Header'

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
      <Header election={election} />
      <Flex direction={{ base: 'column', lg: 'row' }} alignItems='start'>
        <Tabs
          index={tabIndex}
          onChange={handleTabsChange}
          align='center'
          w={{ base: '100%', lg: election?.status === ElectionStatus.ONGOING ? '70%' : '100%' }}
        >
          <TabList>
            <Tab whiteSpace='nowrap' color='process.tabs.color'>
              {t('process.questions')}
            </Tab>
            {election?.status !== ElectionStatus.CANCELED && (
              <>
                <Box my={1} borderRight='1px solid' borderColor='process.tabs.divider' />
                <Tab whiteSpace='nowrap' color='process.tabs.color'>
                  {t('process.results')}
                </Tab>
              </>
            )}
          </TabList>
          <TabPanels>
            <TabPanel>
              <ElectionQuestions />
            </TabPanel>
            <TabPanel mb={5}>
              <ElectionResults />

              {election?.electionType.secretUntilTheEnd && (
                <Text pt={25} textAlign='center' fontWeight='bold' color='process.secret_until_the_end'>
                  {t('process.secret_until_the_end')}
                </Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        {election?.status === ElectionStatus.ONGOING && (
          <Box position='sticky' bottom='px' mx='auto' mt={10}>
            <ProcessAside isInCensus={isInCensus} hasAlreadyVoted={voted !== null && voted.length > 0} />
          </Box>
        )}
      </Flex>
    </>
  )
}
