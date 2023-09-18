import { Box, Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { HiCheckCircle } from 'react-icons/hi'
import { CensusType, CensusTypes, useCensusTypes } from '../Census/TypeSelector'
import { StepsNavigation } from './Navigation'
import Wrapper from './Wrapper'
import { StepsFormValues, useProcessCreationSteps } from './use-steps'

export interface CensusValues {
  censusType: CensusType | null
}

export const Census = () => {
  const { t } = useTranslation()
  const { form, setForm } = useProcessCreationSteps()
  const { list, details } = useCensusTypes()
  const { censusType } = form

  return (
    <Wrapper>
      <Flex flexDirection='column' gap={10}>
        <Box>
          <Text fontWeight='bold' fontSize='md' mb={2}>
            {t('form.process_create.census.title')}
          </Text>
          <Text fontSize='sm' color='process_create.description'>
            {t('form.process_create.census.description')}
          </Text>
        </Box>
        <Tabs
          defaultIndex={CensusTypes.findIndex((val) => val === censusType)}
          onChange={(index) => {
            const nform: StepsFormValues = { ...form, censusType: CensusTypes[index] }
            // ensure maxCensusSize is only set on token-based censuses
            // all other cases are handled automatically via the SDK
            if (CensusTypes[index] !== 'token' && 'maxCensusSize' in nform) {
              delete nform?.maxCensusSize
            }
            setForm(nform)
          }}
          variant='card'
          isLazy
        >
          <TabList
            display='flex'
            justifyContent='space-around'
            flexWrap='wrap'
            gap={{ base: 5, xl: 0 }}
            alignItems='center'
          >
            {list.map((ct: CensusType, index: number) => (
              <Tab key={index}>
                <Icon as={HiCheckCircle} />
                <Box>
                  <Icon as={details[ct].icon} />
                  <Text>{details[ct].title}</Text>
                </Box>
                <Text>{details[ct].description}</Text>
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {list.map((ct: CensusType, index: number) => (
              <TabPanel key={index}>{details[ct].component()}</TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Flex>

      <StepsNavigation />
    </Wrapper>
  )
}
