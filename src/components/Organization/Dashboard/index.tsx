import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Progress,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight, Calendar, CheckCircle, Mail04, Plus, Users01, XClose } from '@untitled-ui/icons-react'
import { ElectionStatusBadge, ElectionTitle } from '@vocdoni/chakra-components'
import { ElectionProvider, useClient, useOrganization } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { format } from 'date-fns'
import { Trans, useTranslation } from 'react-i18next'
import { generatePath, Link as ReactRouterLink } from 'react-router-dom'
import { DashboardBox, DashboardContents } from '~components/Layout/Dashboard'
import { Routes } from '~routes'
import { useProfile } from '~src/queries/account'
import { paginatedElectionsQuery, useSetupChecklist } from '~src/queries/organization'

const OrganizationDashboard = () => {
  const { t } = useTranslation()

  return (
    <DashboardContents>
      <Heading size={'xs'} fontWeight={'extrabold'} mb={1}>
        {t('dashboard_empty_processes.title', { defaultValue: 'Welcome to Vocdoni Coop' })}
      </Heading>
      <Text mb={6}>
        {t('dashboard_empty_processes.title', {
          defaultValue: "Here's an overview of your organization's voting activities",
        })}
      </Text>
      <Tutorial />
      <OrganizationProcesses />
      <Setup />
    </DashboardContents>
  )
}

const Tutorial = () => {
  const { t } = useTranslation()
  const { data: profile } = useProfile()
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  if (!isOpen) return null

  return (
    <>
      {isOpen && (
        <DashboardBox p={6} mb={8} display='flex' gap={10} position='relative'>
          <IconButton
            aria-label='Close'
            icon={<XClose />}
            size='sm'
            variant='ghost'
            colorScheme='gray'
            position='absolute'
            top={2}
            right={2}
            onClick={onClose}
          />
          <Box flex='1 1 60%'>
            <Text fontWeight='extrabold' mb={2} fontSize='2xl'>
              <Trans
                i18nKey='dashboard_empty_processes.hello'
                defaultValue='Hello'
                values={{ emoji: '👋', name: profile?.firstName }}
                components={{
                  emoji: <Text as='span' fontSize='24px' />,
                  name: <Text as='span' fontSize='2xl' />,
                }}
              />
            </Text>
            <Text color='gray.400' mb={4}>
              You're currently on the Free plan, which gives you access to almost everything for up to 50 members.
            </Text>
            <Text color='gray.400' mb={4}>
              So go ahead, explore the platform, create your first vote, and see just how easy secure digital governance
              can be! But if you need help, just schedule a call with our experts!
            </Text>
            <Flex gap={3} flexDirection={{ base: 'column', sm: 'row' }}>
              <Button
                as={ReactRouterLink}
                to={generatePath(Routes.processes.create)}
                leftIcon={<Plus />}
                colorScheme='black'
                size={'md'}
              >
                <Trans i18nKey='new_voting'>New vote</Trans>
              </Button>
              <Button
                as={ReactRouterLink}
                to={generatePath(Routes.processes.create)}
                leftIcon={<Calendar />}
                colorScheme='black'
                variant={'outline'}
                size={'md'}
              >
                <Trans i18nKey='home.support.btn_watch'></Trans>
              </Button>
            </Flex>
          </Box>
          <Flex display={{ base: 'none', lg: 'flex' }} flex={'1 1 33%'} flexDirection={'column'}>
            <Text size={'lg'} fontWeight={'bold'} textAlign={'center'} mb={2}>
              {t('dashboard_empty_processes.how_first_vote', { defaultValue: 'How to create your first vote' })}
            </Text>
            <AspectRatio ratio={16 / 9}>
              <Box
                as='iframe'
                src='https://www.youtube.com/embed/arZZw8NyPq8'
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                border='0'
                borderRadius={'md'}
              />
            </AspectRatio>
          </Flex>
        </DashboardBox>
      )}
    </>
  )
}

const Setup = () => {
  const { t } = useTranslation()
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const { checklist, progress } = useSetupChecklist()

  return (
    isOpen && (
      <Box position='fixed' bottom={4} right={4} w='sm' bg='white' borderRadius='lg' boxShadow='xl' zIndex='overlay'>
        <Accordion allowMultiple defaultIndex={[0]}>
          <AccordionItem>
            <Flex p={3}>
              <Flex flex='1' align='center'>
                <Icon as={CheckCircle} mr={2} />
                <Text fontWeight='bold'>
                  {t('setup.title', {
                    defaultValue: 'Complete your setup',
                  })}
                </Text>
              </Flex>
              <Flex>
                <AccordionButton as={Button} variant='ghost' size='sm' colorScheme='gray' p={1} minW='unset'>
                  <AccordionIcon />
                </AccordionButton>
                <IconButton
                  aria-label='Close'
                  icon={<XClose />}
                  size='sm'
                  variant='ghost'
                  colorScheme='gray'
                  ml={2}
                  onClick={onClose}
                />
              </Flex>
            </Flex>
            <AccordionPanel pt={4} pb={2}>
              <Flex justify='space-between' align='center' mb={2}>
                <Text fontSize='sm'>{t('setup.progress', { defaultValue: 'Your progress' })}</Text>
                <Text fontSize='sm'>{Math.round(progress)}%</Text>
              </Flex>
              <Progress
                value={progress}
                colorScheme='black'
                size='sm'
                borderRadius='md'
                sx={{
                  '& > [role="progressbar"]': {
                    borderRadius: '0',
                  },
                }}
              />
              <Stack spacing={5} direction='column' mt={4} mb={4}>
                {checklist.map((checkbox, index) => (
                  <Checkbox key={checkbox.id} colorScheme='gray' isChecked={checkbox.completed} size='sm'>
                    <HStack ml={2} spacing={2} align='center'>
                      <Icon as={checkbox.icon} boxSize={4} />
                      <Text>{checkbox.label}</Text>
                    </HStack>
                  </Checkbox>
                ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    )
  )
}

const OrganizationProcesses = () => {
  const { t } = useTranslation()
  const { organization } = useOrganization()

  return (
    <Flex flexDirection={{ base: 'column', md: 'row' }} gap={4}>
      <DashboardBox p={6} minH={'324px'} flex='1 1 66%' display='flex' flexDirection='column'>
        <Box mb={4}>
          <Text fontWeight='extrabold' mb={1.5} fontSize='2xl'>
            {t('dashboard_empty_processes.recent_voting_title', { defaultValue: 'Recent Voting Processes' })}
          </Text>
          <Text color='gray.400' fontSize='sm'>
            {t('dashboard_empty_processes.recent_voting_description', {
              defaultValue: "Your organization's latest voting activities",
            })}
          </Text>
        </Box>
        <Flex flexDirection='column' flex='1'>
          <Processes organization={organization} />
        </Flex>
      </DashboardBox>
      {organization && <QuickActions />}
    </Flex>
  )
}

const Processes = ({ organization }) => {
  const { t } = useTranslation()
  const { client, account } = useClient()

  const { queryKey, queryFn } = paginatedElectionsQuery(account, client, {})

  const {
    data: elections,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn,
    enabled: !!organization,
  })

  // Helper UI components
  const CenteredMessage = ({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) => (
    <Flex flexGrow={1} flexDir='column' justify='center' align='center' gap={4}>
      <Text color='gray.400'>{children}</Text>
      {action}
    </Flex>
  )

  if (!organization) {
    return (
      <CenteredMessage
        action={
          <Button
            as={ReactRouterLink}
            to={generatePath(Routes.dashboard.organizationCreate)}
            colorScheme='black'
            variant='outline'
          >
            {t('dashboard_empty_processes.create_first_organization', {
              defaultValue: 'Create your first organization',
            })}
          </Button>
        }
      >
        No organization found
      </CenteredMessage>
    )
  }

  if (isLoading) {
    return <CenteredMessage>Loading...</CenteredMessage>
  }

  if (isError) {
    return <CenteredMessage>Error loading voting processes</CenteredMessage>
  }

  if (!elections?.elections?.length) {
    return (
      <CenteredMessage
        action={
          <Button as={ReactRouterLink} to={generatePath(Routes.processes.create)} colorScheme='black' variant='outline'>
            {t('dashboard_empty_processes.create_first_vote', {
              defaultValue: 'Create your first vote',
            })}
          </Button>
        }
      >
        No voting processes found
      </CenteredMessage>
    )
  }

  return (
    <Flex flexDir='column' gap={4} flex='1'>
      {elections.elections.map((election) => {
        if (!(election instanceof PublishedElection)) return null

        return (
          <ElectionProvider election={election} id={election.id} key={election.id}>
            <Flex align='center'>
              <Box>
                <ElectionTitle mb={0} fontSize='md' textAlign='left' fontWeight='500' isTruncated />
                <Text fontSize='sm' color='gray.400'>
                  {t('organization.ends_on', {
                    defaultValue: 'Ends on {{date}}',
                    date: format(election.endDate, t('organization.date_format')),
                  })}
                </Text>
              </Box>
              <Spacer />
              <Flex align='center' gap={2}>
                <ElectionStatusBadge />
                <Text fontWeight='bold'>{election.voteCount} votes</Text>
              </Flex>
            </Flex>
          </ElectionProvider>
        )
      })}
      <Flex justify='flex-end' mt={4}>
        <Link
          as={ReactRouterLink}
          to={generatePath(Routes.dashboard.processes)}
          display='inline-flex'
          alignItems='center'
          gap={3}
          fontSize='sm'
          color='black'
          fontWeight='medium'
          textDecoration='none'
          _hover={{
            textDecoration: 'underline',
            color: 'black',
          }}
        >
          {t('actions.create_first_vote', {
            defaultValue: 'View all processes',
          })}
          <Icon as={ArrowUpRight} boxSize={4} />
        </Link>
      </Flex>
    </Flex>
  )
}

const QuickActions = () => {
  const { t } = useTranslation()
  return (
    <DashboardBox p={6} flex='1 1 33%'>
      <Text fontWeight={'extrabold'} mb={1.5} size='2xl'>
        {t('dashboard_empty_processes.quick_actions', {
          defaultValue: 'Quick Actions',
        })}
      </Text>
      <Text color='gray.400' size={'sm'} mb={6}>
        {t('dashboard_empty_processes.common_tasks_actions', {
          defaultValue: 'Common tasks and actions',
        })}{' '}
      </Text>
      <Flex flexDirection={'column'} gap={4}>
        <Button
          as={ReactRouterLink}
          to={generatePath(Routes.processes.create)}
          colorScheme='black'
          variant={'outline'}
          justifyContent={'start'}
          leftIcon={<Plus />}
          size='lg'
          fontWeight={'bold'}
        >
          {t('actions.create_new_vote', {
            defaultValue: 'Create new vote',
          })}
        </Button>
        <Button
          as={ReactRouterLink}
          to={generatePath(Routes.dashboard.processes)}
          colorScheme='black'
          variant={'outline'}
          justifyContent={'start'}
          leftIcon={<Mail04 />}
          size='lg'
          fontWeight={'bold'}
        >
          {t('actions.view_active_votes', {
            defaultValue: 'View active votes',
          })}
        </Button>
        <Button
          as={ReactRouterLink}
          to={generatePath(Routes.dashboard.settings)}
          colorScheme='black'
          variant={'outline'}
          justifyContent={'start'}
          leftIcon={<Users01 />}
          size='lg'
          fontWeight={'bold'}
        >
          {t('actions.manage_team', {
            defaultValue: 'Manage team',
          })}
        </Button>
      </Flex>
    </DashboardBox>
  )
}

export default OrganizationDashboard
