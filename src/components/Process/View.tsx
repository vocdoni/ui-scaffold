import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import {
  ElectionDescription,
  ElectionProvider,
  ElectionProviderComponentProps,
  ElectionSchedule,
  ElectionStatusBadge,
  ElectionTitle,
  QuestionsForm,
  useElection,
} from '@vocdoni/react-components'
import { ReactNode } from 'react'

const ProcessViewTabContents = ({ children }: { children: ReactNode }) => {
  const { election } = useElection()
  // const count = election?.results.reduce(
  //   (acc, val) => val.reduce((cur, v) => acc + parseInt(v, 10), 0),
  //   0
  // )

  const count2 = election?.voteCount

  return (
    <Flex justifyContent='space-between' alignItems='start'>
      {children}
      <Box>
        <Box>
          <ElectionStatusBadge />
          <Text>{count2} votes cast so far!</Text>
        </Box>
        <Button type='submit' form='election-create-form' width='full'>
          Vote
        </Button>
      </Box>
    </Flex>
  )
}

export const ProcessView = (props: ElectionProviderComponentProps) => (
  <ElectionProvider {...props}>
    <Box>
      <ElectionSchedule textAlign='left' color='branding.pink' />
      <ElectionTitle textAlign='left' />
      <ElectionDescription />
    </Box>
    <Tabs>
      <TabList>
        <Tab>Questions</Tab>
        <Tab>Results</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProcessViewTabContents>
            <QuestionsForm />
          </ProcessViewTabContents>
        </TabPanel>
        <TabPanel>
          <ProcessViewTabContents>TODO: Results</ProcessViewTabContents>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </ElectionProvider>
)
