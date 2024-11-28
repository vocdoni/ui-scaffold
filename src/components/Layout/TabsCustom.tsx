import { Box, Tabs } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useState } from 'react'

type TabOption = {
  label: string
  value: number
}

const TabsCustom = ({ children, tabProps, selectProps, selectBoxProps }: any) => {
  const [selectedTab, setSelectedTab] = useState(0)

  const tabOptions: TabOption[] = children[0].props.children.map((opt: any, idx: number) => ({
    label: opt.props.children,
    value: idx,
  }))

  return (
    <>
      <Box {...selectBoxProps}>
        <Select<TabOption>
          {...selectProps}
          defaultValue={tabOptions[0]}
          options={tabOptions}
          value={tabOptions.find((option) => option.value === selectedTab)}
          onChange={(option) => setSelectedTab(option?.value ?? 0)}
        />
      </Box>
      <Tabs index={selectedTab} onChange={(index) => setSelectedTab(index)} {...tabProps}>
        {children}
      </Tabs>
    </>
  )
}

export default TabsCustom
