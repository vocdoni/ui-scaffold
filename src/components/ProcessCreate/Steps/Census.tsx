import { Box, Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check } from '~theme/icons'
import { CensusType, useCensusTypes } from '../Census/TypeSelector'
import { UnimplementedCensusType, useUnimplementedCensusTypes } from '../Census/UnimplementedTypeSelector'
import ModalPro from '../ModalPro'
import { StepsNavigation } from './Navigation'
import { StepsFormValues, useProcessCreationSteps } from './use-steps'
import Wrapper from './Wrapper'
// import checkIcon from '/assets/check-icon.svg'

export interface CensusValues {
  censusType: CensusType | null
}

export const Census = () => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { form, setForm } = useProcessCreationSteps()
  const { defined, details } = useCensusTypes()
  const { defined: definedUnim, details: detailsUnim } = useUnimplementedCensusTypes()
  const { censusType } = form

  const [reason, setReason] = useState('')

  return (
    <>
      <ModalPro isOpen={isOpen} onClose={onClose} reason={reason} />
      <Wrapper>
        <Flex flexDirection='column' gap={10}>
          <Box>
            <Text className='process-create-title'>{t('census.title')}</Text>
            <Text fontSize='sm' color='process_create.description'>
              {t('census.description')}
            </Text>
          </Box>
          <Tabs
            defaultIndex={defined.findIndex((val) => val === censusType)}
            onChange={(index) => {
              const nform: StepsFormValues = { ...form, censusType: defined[index] }
              // ensure maxCensusSize is only set on token-based censuses
              // all other cases are handled automatically via the SDK
              if (defined[index] !== 'token' && 'maxCensusSize' in nform) {
                delete nform?.maxCensusSize
              }

              if (definedUnim[index - defined.length]) setReason(detailsUnim[definedUnim[index - defined.length]].title)

              setForm(nform)
            }}
            variant='card'
            isLazy
          >
            <TabList>
              {defined.map((ct: CensusType, index: number) => (
                <Tab key={index}>
                  <Check />

                  <Box>
                    <Icon as={details[ct].icon} />
                    <Text>{details[ct].title}</Text>
                  </Box>
                  <Text>{details[ct].description}</Text>
                  <Box />
                </Tab>
              ))}
              {definedUnim.map((ct: UnimplementedCensusType, index: number) => (
                <Tab key={index} onClick={onOpen}>
                  <Box>
                    <Icon as={detailsUnim[ct].icon} />
                    <Text>{detailsUnim[ct].title}</Text>
                  </Box>
                  <Text as='span'>Pro</Text>
                  <Text>{detailsUnim[ct].description}</Text>
                </Tab>
              ))}
            </TabList>

            <TabPanels className={censusType ? 'c' : ''} bgColor='process_create.section'>
              {defined.map((ct: CensusType, index: number) => (
                <TabPanel key={index}>{details[ct].component()}</TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Flex>
        <StepsNavigation />
      </Wrapper>
    </>
  )
}
