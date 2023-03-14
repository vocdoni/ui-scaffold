import {
  ButtonGroup,
  Flex,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import {
  ElectionDescription,
  ElectionProvider,
  ElectionProviderComponentProps,
  ElectionSchedule,
  ElectionStatusBadge,
  ElectionTitle,
  QuestionsForm,
  useClientContext,
} from '@vocdoni/react-components'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import ProcessAside from './Aside'

export const ProcessView = (props: ElectionProviderComponentProps) => {
  const { account } = useClientContext()
  return (
    <ElectionProvider {...props}>
      <Flex direction='column' gap={5} mb={8}>
        <ElectionSchedule textAlign='left' color='branding.pink' isTruncated />
        <ElectionTitle fontSize='1.5em' mb={0} textAlign='left' isTruncated />
        <ElectionDescription />
      </Flex>
      <Tabs>
        <TabList>
          <Tab>Questions</Tab>
          <Tab>Results</Tab>
        </TabList>
        <TabPanels bg='gray.100'>
          <TabPanel>
            <Flex justifyContent='center' gap={4} mb={4}>
              {props.election?.organizationId === account && (
                <ButtonGroup
                  size='sm'
                  isAttached
                  variant='outline'
                  position='relative'
                >
                  <IconButton
                    aria-label='Search database'
                    icon={<FaPlay />}
                    // onClick={() => handleAction(ElectionStatus.READY)}
                    // isDisabled={getButtonsDisabled(el, ElectionStatus.READY)}
                  />
                  <IconButton
                    aria-label='Search database'
                    icon={<FaPause />}
                    // onClick={() => handleAction(ElectionStatus.PAUSED)}
                    // isDisabled={getButtonsDisabled(el, ElectionStatus.PAUSED)}
                  />
                  <IconButton
                    aria-label='Search database'
                    icon={<FaStop />}
                    // onClick={() => handleAction(ElectionStatus.CANCELED)}
                    // isDisabled={getButtonsDisabled(el, ElectionStatus.CANCELED)}
                  />
                </ButtonGroup>
              )}
              <ElectionStatusBadge />
            </Flex>
            <Flex gap={4} alignItems='start'>
              <QuestionsForm />
              <ProcessAside />
            </Flex>
          </TabPanel>
          <TabPanel>
            <p>TODO: Results</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ElectionProvider>
  )
}
