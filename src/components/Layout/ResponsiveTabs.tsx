import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useMultiStyleConfig } from '@chakra-ui/react'
import { ChakraStylesConfig, Select } from 'chakra-react-select'
import { useState } from 'react'
import { customStylesSelect } from '~theme/tokenSelectStyles'

type TabOption = {
  label: string
  value: number
}

const ResponsiveTabs = (props) => {
  const { size, variant, colorScheme, data, stylesSelect } = props
  const styles = useMultiStyleConfig('TabsResponsive', { size, variant })
  const [selectedTab, setSelectedTab] = useState(0)

  const tabOptions: TabOption[] = data.tabList.map((label, idx) => ({
    label,
    value: idx,
  }))

  return (
    <Box __css={styles.container}>
      <Box __css={styles.selectWrapper}>
        <Select<TabOption>
          defaultValue={tabOptions[0]}
          options={tabOptions}
          value={tabOptions.find((option) => option.value === selectedTab)}
          onChange={(option) => setSelectedTab(option?.value ?? 0)}
          chakraStyles={stylesSelect || (customStylesSelect as ChakraStylesConfig)}
        />
      </Box>
      <Tabs
        variant={variant}
        colorScheme={colorScheme}
        index={selectedTab}
        onChange={(index) => setSelectedTab(index)}
        sx={styles.tabs}
        isFitted
      >
        <TabList sx={styles.tabList}>
          {data.tabList.map((el, idx) => (
            <Tab sx={styles.tab} key={idx}>
              {el}
            </Tab>
          ))}
        </TabList>
        <TabPanels sx={styles.tabPanels}>
          {data.tabPanels.map((el, idx) => (
            <TabPanel sx={styles.tabPanel} key={idx}>
              {el}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default ResponsiveTabs
