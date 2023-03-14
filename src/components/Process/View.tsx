import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  ButtonGroup,
  Flex,
  IconButton,
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
  useClientContext,
} from '@vocdoni/react-components'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import ProcessAside from './Aside'
import ProcessViewNav from './Nav'

export const ProcessView = (props: ElectionProviderComponentProps) => {
  const { client, account } = useClientContext()
  const navigate = useNavigate()

  return (
    <ElectionProvider {...props}>
      <Flex direction='column' gap={5} mb={8}>
        <Text onClick={() => navigate(-1)} cursor='pointer'>
          <ArrowBackIcon /> Org Name
        </Text>
        <ElectionSchedule textAlign='left' color='branding.pink' isTruncated />
        <ElectionTitle fontSize='1.5em' mb={0} textAlign='left' isTruncated />
        <ElectionDescription />
      </Flex>
      <Tabs>
        <TabList display='flex'>
          <Tab>Questions</Tab>
          <Tab>Results</Tab>
          <ProcessViewNav
            startDate={props.election?.startDate}
            endDate={props.election?.endDate}
          />
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
                    onClick={async () => await client.continueElection()}
                  />
                  <IconButton
                    aria-label='Search database'
                    icon={<FaPause />}
                    onClick={async () => await client.pauseElection()}
                  />
                  <IconButton
                    aria-label='Search database'
                    icon={<FaStop />}
                    onClick={async () => await client.cancelElection()}
                  />
                </ButtonGroup>
              )}
              <ElectionStatusBadge />
            </Flex>
            <Flex gap={4} justifyContent='space-between' alignItems='start'>
              <Box flex='1 1 500px'>
                <QuestionsForm />
              </Box>
              <ProcessAside />
            </Flex>
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </ElectionProvider>
  )
}
