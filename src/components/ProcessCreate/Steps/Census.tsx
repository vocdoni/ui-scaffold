import { Box, Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiCoinStack, BiFile, BiWallet } from 'react-icons/bi'
import { CensusType, CensusTypes } from '../Census/TypeSelector'

import Wrapper from '../Wrapper'
import { StepsCensusWeb3 } from './CensusWeb3'
import { StepsNavigation } from './Navigation'
import { useProcessCreationSteps } from './use-steps'

export interface CensusValues {
  censusType: CensusType
}

export const Census = () => {
  const { t } = useTranslation()
  const CARDS = [
    {
      title: t('form.process_create.census.csv_title'),
      description: t('form.process_create.census.csv_description'),
      icon: BiFile,
    },
    {
      title: t('form.process_create.census.token_base_title'),
      description: t('form.process_create.census.token_base_description'),
      icon: BiCoinStack,
    },
    {
      title: t('form.process_create.census.wallet_address_title'),
      description: t('form.process_create.census.wallet_address_description'),
      icon: BiWallet,
    },
  ]

  const { form, setForm } = useProcessCreationSteps()

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
            <TabList>
              {CARDS.map((card: any, index: number) => (
                <>
                  <Tab>
                    <Box textAlign='center'>
                      <Icon as={card.icon} boxSize={6} color='lightgray' />
                      <Text fontWeight={700}>{card.title}</Text>
                    </Box>
                    <Text color='process_create.description' textAlign='center' fontSize='xs'>
                      {card.description}
                    </Text>
                  </Tab>
                </>
              ))}
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text textAlign='center' color='#00DAAE'>
                  TO DO
                </Text>
              </TabPanel>
              <TabPanel>
                <Text textAlign='center' color='#00DAAE'>
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
