import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import {
  ElectionActions,
  ElectionQuestions,
  ElectionResults,
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
import Header from './Header'

import ProcessResults from './Results'

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
      <Flex direction={{ base: 'column', lg: 'row' }}>
        <Tabs
          index={tabIndex}
          onChange={handleTabsChange}
          align='center'
          flexBasis={election?.status === ElectionStatus.ONGOING ? '70%' : '100%'}
        >
          <TabList>
            <Tab whiteSpace='nowrap' color='process.tabs.color'>
              {t('process.questions')}
            </Tab>
            {election?.status !== ElectionStatus.CANCELED && (
              <>
                <Box borderRight='1px solid' borderColor='process.tabs.divider' my={1} />
                <Tab whiteSpace='nowrap' color='process.tabs.color'>
                  {t('process.results')}
                </Tab>
              </>
            )}
          </TabList>
          <TabPanels p={5}>
            <TabPanel>
              <ElectionQuestions />
            </TabPanel>
            <TabPanel>
            <ElectionResults />

              {election?.electionType.secretUntilTheEnd && (
                <Text color='process.secret_until_the_end' textAlign='center' fontWeight='bold' pt={25}>
                  {t('process.secret_until_the_end')}
                </Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        {election?.status === ElectionStatus.ONGOING && (
          <Box position='sticky' bottom='px' mx='auto' mt={10}>
            <ProcessAside isInCensus={isInCensus}  hasAlreadyVoted={voted !== null && voted.length > 0} />
          </Box>
        )}
      </Flex>
    </>
  )
}
