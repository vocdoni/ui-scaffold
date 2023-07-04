// import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
// import { ElectionQuestions, ElectionResults, useElection } from '@vocdoni/chakra-components'
// import { ElectionStatus } from '@vocdoni/sdk'
// import { useEffect, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import ProcessAside from './Aside'
// import Header from './Header'

// export const ProcessView = () => {
//   const { election } = useElection()
//   const { t } = useTranslation()

//   const [tabIndex, setTabIndex] = useState(0)

//   const handleTabsChange = (index: number) => {
//     setTabIndex(index)
//   }

//   useEffect(() => {
//     if (election?.status === ElectionStatus.RESULTS) setTabIndex(1)
//   }, [election])

//   return (
//     <>
//       <Header />
//       <Flex direction={{ base: 'column', lg: 'row' }} alignItems='start'>
//         <Tabs index={tabIndex} onChange={handleTabsChange} w={{ base: '100%', lg: '70%' }}>
//           <TabList display='flex' justifyContent='center' alignItems='center'>
//             <Flex gap={2}>
//               <Tab
//                 whiteSpace='nowrap'
//                 color='tabs.color'
//                 fontWeight={tabIndex === 0 ? 'bold' : 'normal'}
//                 borderTopRadius={6}
//                 _hover={{ bgColor: 'tabs.hover' }}
//                 _active={{
//                   bgColor: 'tabs.active',
//                 }}
//               >
//                 {t('process.questions')}
//               </Tab>

//               {election?.status !== ElectionStatus.CANCELED && (
//                 <>
//                   <Box my={1} borderRight='2px solid' borderColor='tabs.divider' />
//                   <Tab
//                     whiteSpace='nowrap'
//                     color='process.tabs.color'
//                     fontWeight={tabIndex === 1 ? 'bold' : 'normal'}
//                     borderTopRadius={6}
//                     _hover={{ bgColor: 'tabs.hover' }}
//                     _active={{
//                       bgColor: 'tabs.active',
//                     }}
//                   >
//                     {t('process.results')}
//                   </Tab>
//                 </>
//               )}
//             </Flex>
//           </TabList>
//           <TabPanels>
//             <TabPanel>
//               <ElectionQuestions />
//             </TabPanel>
//             <TabPanel mb={20}>
//               <ElectionResults />
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
//         <Flex
//           justifyContent='center'
//           position={{ base: election?.status === 'ONGOING' ? 'sticky' : 'relative', lg: 'sticky' }}
//           bottom={{ base: 'px', lg: undefined }}
//           top={{ lg: 20 }}
//           w={{ base: '100%', lg: '30%' }}
//           mt={{ lg: 10 }}
//         >
//           <ProcessAside />
//         </Flex>
//       </Flex>
//     </>
//   )
// }

import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
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
        <Tabs variant='process' index={tabIndex} onChange={handleTabsChange}>
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
          position={{ base: election?.status === 'ONGOING' ? 'sticky' : 'relative', lg: 'sticky' }}
          bottom={{ base: 'px', lg: undefined }}
          top={{ lg: 20 }}
          w={{ base: '100%', lg: '30%' }}
          mt={{ lg: 10 }}
        >
          <ProcessAside />
        </Flex>
      </Flex>
    </>
  )
}
