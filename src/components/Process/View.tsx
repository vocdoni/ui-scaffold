import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { ElectionQuestions, ElectionResults, useElection } from '@vocdoni/chakra-components'
import { ElectionStatus } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProcessAside from './Aside'
import Header from './Header'

export const ProcessView = () => {
  const { election } = useElection()
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
      <Header />
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
            <TabPanel>
              <ElectionResults />
            </TabPanel>
          </TabPanels>
        </Tabs>
        {election?.status === ElectionStatus.ONGOING && (
          <Flex
            justifyContent='center'
            position='sticky'
            bottom={{ base: 'px', lg: undefined }}
            top={{ lg: '80px' }}
            w={{ base: '100%', lg: '30%' }}
            mt={{ lg: 10 }}
          >
            <ProcessAside />
          </Flex>
        )}
      </Flex>
    </>
  )
}
