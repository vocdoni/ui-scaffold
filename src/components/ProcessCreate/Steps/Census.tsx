import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { CensusType, CensusTypes } from '../Census/TypeSelector'
import { StepsCensusCSV } from './CensusCsv'
import { StepsCensusWeb3 } from './CensusWeb3'
import { useProcessCreationSteps } from './use-steps'

export interface CensusValues {
  censusType: CensusType
}

export const Census = () => {
  const { form, setForm } = useProcessCreationSteps()

  const { censusType } = form

  return (
    <>
      <Tabs
        defaultIndex={CensusTypes.findIndex((val) => val === censusType)}
        onChange={(index) => setForm({ ...form, censusType: CensusTypes[index] })}
      >
        <TabList>
          <Tab>Web3</Tab>
          <Tab>CSV</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <StepsCensusWeb3 />
          </TabPanel>
          <TabPanel>
            <StepsCensusCSV />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
