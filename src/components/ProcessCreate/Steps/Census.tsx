import { Box, Flex, Icon, Img, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { CensusType, CensusTypes, useCensusTypes } from '../Census/TypeSelector'
import { StepsNavigation } from './Navigation'
import { StepsFormValues, useProcessCreationSteps } from './use-steps'
import Wrapper from './Wrapper'
import checkIcon from '/assets/check-icon.svg'

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
          <Text fontWeight='bold' fontFamily='pixeloid' textTransform='uppercase' fontSize='md' mb={2}>
            {t('census.title')}
          </Text>
          <Text fontSize='sm' color='process_create.description'>
            {t('census.description')}
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
          <TabList>
            {list.map((ct: CensusType, index: number) => (
              <Tab key={index}>
                <Box bgColor='checkbox' p={1} maxW='fit-content'>
                  <Img src={checkIcon} w={2} />
                </Box>

                <Box>
                  <Icon as={details[ct].icon} />
                  <Text fontFamily='pixeloid' textTransform='uppercase'>
                    {details[ct].title}
                  </Text>
                </Box>
                <Text>{details[ct].description}</Text>
              </Tab>
            ))}
          </TabList>

          <TabPanels bgColor='process_create.section'>
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
