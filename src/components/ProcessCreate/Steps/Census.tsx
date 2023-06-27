import { Box, Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { CensusType, CensusTypes, useCensusTypes } from '../Census/TypeSelector'

import Wrapper from '../Wrapper'
import { StepsCensusWeb3 } from './CensusWeb3'
import { StepsNavigation } from './Navigation'
import { useProcessCreationSteps } from './use-steps'

export interface CensusValues {
  censusType: CensusType | null
}

export const Census = () => {
  const { t } = useTranslation()
  const { form, setForm } = useProcessCreationSteps()
  const { list, details } = useCensusTypes()

  const { censusType } = form

  return (
    <>
      <Wrapper>
        <Flex flexDirection='column' gap={16}>
          <Box>
            <Text fontWeight={600} fontSize='2xl' mb={2}>
              {t('form.process_create.census.title')}
            </Text>
            <Text color='process_create.description'>{t('form.process_create.census.description')}</Text>
          </Box>
          <Tabs
            defaultIndex={CensusTypes.findIndex((val) => val === censusType)}
            onChange={(index) => setForm({ ...form, censusType: CensusTypes[index] })}
            variant='card'
          >
            <TabList display='flex' justifyContent='space-around' flexWrap='wrap' gap={5} alignItems='center'>
              {list.map((ct: CensusType, index: number) => (
                <Tab key={index}>
                  <Icon as={details[ct].icon} />
                  <Text>{details[ct].title}</Text>
                  <Text color='process_create.description' textAlign='center' fontSize='xs'>
                    {details[ct].description}
                  </Text>
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text textAlign='center' color='brand'>
                  TO DO
                </Text>
              </TabPanel>
              <TabPanel>
                <Text textAlign='center' color='brand'>
                  TO DO
                </Text>
              </TabPanel>
              <TabPanel>
                <StepsCensusWeb3 />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Wrapper>
      <StepsNavigation />
    </>
  )
}
