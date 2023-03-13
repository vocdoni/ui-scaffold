import { EmailIcon } from '@chakra-ui/icons'
import { Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
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

  return (
    <Flex justifyContent='space-between' alignItems='start'>
      {children}
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        gap={4}
        padding={8}
        borderRadius='10px'
        bgColor='branding.lightpink1'
        position='sticky'
        top={8}
      >
        <ElectionStatusBadge />
        <Button
          type='submit'
          form='election-create-form'
          variant='brandVote'
          rightIcon={<EmailIcon _hover={{ size: '10px' }} />}
        >
          Vote
        </Button>
        <Text color='branding.pink'>{election?.voteCount} votes</Text>
      </Flex>
    </Flex>
  )
}

export const ProcessView = (props: ElectionProviderComponentProps) => (
  <ElectionProvider {...props}>
    <Flex direction='column' gap={5}>
      <ElectionSchedule textAlign='left' color='branding.pink' isTruncated />
      <ElectionTitle fontSize='1.5em' mb={0} textAlign='left' isTruncated />
      <ElectionDescription />
    </Flex>
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
          <ProcessViewTabContents>
            <p>TODO: Results</p>
          </ProcessViewTabContents>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </ElectionProvider>
)
