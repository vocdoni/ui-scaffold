import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { ElectionQuestions, ElectionResults } from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
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
    <Box>
      <Header />
      <Flex direction={{ base: 'column', xl: 'row' }} gap={{ xl: 10 }} alignItems='start'>
        <Tabs variant='process' index={tabIndex} onChange={handleTabsChange} flexGrow={1} w='full'>
          <TabList>
            <Tab>{t('process.questions')}</Tab>
            {election?.status !== ElectionStatus.CANCELED && <Tab>{t('process.results')}</Tab>}
          </TabList>
          <TabPanels>
            <TabPanel>
              <ElectionQuestions />
            </TabPanel>
            <TabPanel mb={20}>
              <ElectionResults />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Flex
          justifyContent='center'
          position='sticky'
          bottom={{ base: 'px', xl: undefined }}
          top={{ xl: 20 }}
          mx='auto'
          mt={{ xl: 10 }}
        >
          <ProcessAside />
        </Flex>
      </Flex>
    </Box>
  )
}
