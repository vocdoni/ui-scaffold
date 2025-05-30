import {
  Accordion,
  AccordionButton,
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
import { ElectionStatusBadge, ElectionTitle } from '@vocdoni/chakra-components'
import { ElectionProvider, useClient, useOrganization } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { format } from 'date-fns'
import { Trans, useTranslation } from 'react-i18next'
import { LuArrowUpRight, LuCheck, LuPlus, LuUsers, LuVote, LuX } from 'react-icons/lu'
import { generatePath, Link as ReactRouterLink } from 'react-router-dom'
import { useSubscription } from '~components/Auth/Subscription'
import { BookerModalButton } from '~components/Dashboard/Booker'
import { DashboardBox, DashboardContents } from '~components/Layout/Dashboard'
import InvertedAccordionIcon from '~components/Layout/InvertedAccordionIcon'
import { usePlanTranslations } from '~components/Pricing/Plans'
import { Routes } from '~routes'
import { useProfile } from '~src/queries/account'
import { CheckboxTypes, paginatedElectionsQuery, useOrganizationSetup, useTutorials } from '~src/queries/organization'

const OrganizationDashboard = () => {
  const { t } = useTranslation()

  return (
    <DashboardContents p={0}>
      <Heading size='lg' fontWeight='extrabold' mb={1}>
        {t('dashboard_empty_processes.title', { defaultValue: 'Welcome to Vocdoni Coop' })}
      </Heading>
      <Text color='gray.500' mb={6}>
        {t('dashboard_empty_processes.subtitle', {
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
  const { data: profile, isLoading } = useProfile()
  const translations = usePlanTranslations()
  const { subscription, loading } = useSubscription()
  const { isDashboardTutorialClosed, isLoading: isDashboardTutorialLoading, closeDashboardTutorial } = useTutorials()
  const plan = subscription ? translations[subscription.plan.id] : undefined

  if (isDashboardTutorialLoading) return <Progress isIndeterminate />

  if (isDashboardTutorialClosed) return null

  return (
    <DashboardBox p={6} mb={12} display='flex' gap={10} position='relative' flexDirection='row'>
      <IconButton
        aria-label='Close'
        icon={<Icon as={LuX} />}
        size='sm'
        variant='ghost'
        colorScheme='white'
        position='absolute'
        top={2}
        right={2}
        onClick={closeDashboardTutorial}
      />
      <Box flex='1 1 60%'>
        <Text fontWeight='extrabold' mb={2} fontSize='2xl'>
          <Trans
            i18nKey='dashboard_empty_processes.hello'
            defaultValue='👋 Hello {{name}}!'
            values={{ name: profile?.firstName }}
          />
        </Text>
        {loading || isLoading ? (
          <Progress isIndeterminate mb={4} />
        ) : !subscription ? (
          <Text color='gray.500' mb={4}>
            {t('dashboard_empty_processes.no_subscription', {
              defaultValue: 'No subscription available. Please create an organization to activate your plan.',
            })}
          </Text>
        ) : (
          <Text color='gray.500' mb={4}>
            <Trans
              i18nKey='plan.details'
              values={{ title: plan.title, subtitle: plan.subtitle }}
              defaultValue="You're currently on the {{ title }} plan, {{ subtitle }}"
            />
          </Text>
        )}
        <Text color='gray.500' mb={4}>
          <Trans i18nKey='plan.encouragement'>
            So go ahead, explore the platform, create your first vote, and see just how easy secure digital governance
            can be! But if you need help, just schedule a call with our experts!
          </Trans>
        </Text>
        <Flex gap={3} flexDirection={{ base: 'column', sm: 'row' }}>
          <Button
            as={ReactRouterLink}
            to={generatePath(Routes.processes.create)}
            leftIcon={<Icon as={LuPlus} />}
            colorScheme='gray'
          >
            <Trans i18nKey='new_voting'>New vote</Trans>
          </Button>
          <BookerModalButton size='sm' />
        </Flex>
      </Box>
      <Flex display={{ base: 'none', lg: 'flex' }} flex='1 1 33%' flexDirection='column'>
        <Text size='lg' fontWeight='bold' textAlign='center' mb={2}>
          {t('dashboard_empty_processes.how_first_vote', {
            defaultValue: 'How to create your first vote',
          })}
        </Text>
        <AspectRatio ratio={16 / 9}>
          <Box
            as='iframe'
            src='https://www.youtube.com/embed/arZZw8NyPq8'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            border='0'
            borderRadius='md'
          />
        </AspectRatio>
      </Flex>
    </DashboardBox>
  )
}

const Setup = () => {
  const { t } = useTranslation()
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const { checklist, progress, isStepsAccordionOpen } = useOrganizationSetup()

  return (
    isStepsAccordionOpen &&
    isOpen && (
      <Box
        position='fixed'
        bottom={6}
        right={6}
        p={0}
        w='xs'
        borderRadius='2xl'
        boxShadow='xl'
        zIndex='overlay'
        border='1px solid'
        _light={{ borderColor: 'gray.200', bgColor: 'white' }}
        _dark={{ borderColor: 'black.700', bgColor: 'black.650' }}
      >
        <Accordion defaultIndex={0} allowToggle border='none'>
          <AccordionItem border='none' alignItems='center'>
            <Flex px={4} py={3}>
              <Flex flex='1' align='center'>
                <Icon as={LuCheck} mr={2} boxSize={5} />
                <Text fontWeight='bold'>
                  {t('setup.title', {
                    defaultValue: 'Complete your setup',
                  })}
                </Text>
              </Flex>
              <Flex>
                <AccordionButton
                  p={0}
                  as={IconButton}
                  variant='ghost'
                  h='28px'
                  minW='28px'
                  colorScheme='gray'
                  icon={<Icon as={InvertedAccordionIcon} />}
                ></AccordionButton>
                <IconButton
                  aria-label='Close'
                  icon={<Icon as={LuX} />}
                  h='28px'
                  minW='28px'
                  variant='ghost'
                  colorScheme='gray'
                  onClick={onClose}
                />
              </Flex>
            </Flex>
            <AccordionPanel p={0}>
              <Flex flexDirection='column' px={4} py={2}>
                <Flex justify='space-between' align='center'>
                  <Text fontSize='xs'>{t('setup.progress', { defaultValue: 'Your progress' })}</Text>
                  <Text fontSize='xs'>{Math.round(progress)}%</Text>
                </Flex>
                <Progress
                  value={progress}
                  colorScheme='gray'
                  size='sm'
                  borderRadius='md'
                  sx={{
                    '& > [role="progressbar"]': {
                      borderRadius: '0',
                    },
                  }}
                />
              </Flex>
              <Stack spacing={3} direction='column' p={3} pt={2}>
                {checklist.map((checkbox) => {
                  const type = checkbox.type || CheckboxTypes.route
                  if (type === CheckboxTypes.modal) {
                    return (
                      <Checkbox key={checkbox.id} colorScheme='gray' isChecked={checkbox.completed} size='sm' p={2}>
                        <BookerModalButton variant='unstyled' ml={1} height='auto' display='flex' fontWeight='normal'>
                          {checkbox.label}
                        </BookerModalButton>
                      </Checkbox>
                    )
                  }
                  return (
                    <Checkbox
                      key={checkbox.id}
                      as={ReactRouterLink}
                      to={checkbox.to}
                      colorScheme='gray'
                      isChecked={checkbox.completed}
                      size='sm'
                      p={2}
                    >
                      <HStack ml={1} spacing={2} align='center'>
                        <Icon as={checkbox.icon} boxSize={4} />
                        <Text size='sm'>{checkbox.label}</Text>
                      </HStack>
                    </Checkbox>
                  )
                })}
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
      <DashboardBox p={6} minH='324px' flex='1 1 66%' display='flex' flexDirection='column'>
        <Box mb={4}>
          <Text fontWeight='extrabold' mb={1.5} fontSize='2xl'>
            {t('dashboard_empty_processes.recent_voting_title', { defaultValue: 'Recent Voting Processes' })}
          </Text>
          <Text color='gray.500' fontSize='sm'>
            {t('dashboard_empty_processes.recent_voting_description', {
              defaultValue: "Your organization's latest voting activities",
            })}
          </Text>
        </Box>
        <Flex flexDirection='column' flex='1'>
          <Processes />
        </Flex>
      </DashboardBox>
      {organization && <QuickActions />}
    </Flex>
  )
}

const Processes = () => {
  const { t } = useTranslation()
  const { client, account } = useClient()
  const { organization } = useOrganization()

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

  if (isLoading) {
    return <Progress isIndeterminate />
  }

  if (isError) {
    return (
      <Flex flexGrow={1} flexDir='column' justify='center' align='center' gap={4}>
        <Text color='gray.500'>
          {t('dashboard_empty_processes.error_loading_processes', {
            defaultValue: 'Error loading voting processes',
          })}
        </Text>
      </Flex>
    )
  }

  if (!organization) {
    return (
      <Flex flexGrow={1} flexDir='column' justify='center' align='center' gap={4}>
        <Text color='gray.500'>
          {t('dashboard_empty_processes.no_organization', { defaultValue: 'No organization found' })}
        </Text>
        <Button
          as={ReactRouterLink}
          to={generatePath(Routes.dashboard.organizationCreate)}
          colorScheme='gray'
          variant='outline'
        >
          {t('dashboard_empty_processes.create_first_organization', {
            defaultValue: 'Create your first organization',
          })}
        </Button>
      </Flex>
    )
  }

  if (!elections?.elections?.length) {
    return (
      <Flex flexGrow={1} flexDir='column' justify='center' align='center' gap={4}>
        <Text color='gray.500'>
          {t('dashboard_empty_processes.empty', {
            defaultValue: 'No voting processes found',
          })}
        </Text>
        <Button as={ReactRouterLink} to={generatePath(Routes.processes.create)} colorScheme='gray' variant='outline'>
          {t('dashboard_empty_processes.create_first_vote', {
            defaultValue: 'Create your first vote',
          })}
        </Button>
      </Flex>
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
                <Text fontSize='sm' color='gray.500'>
                  {t('election.ends_on', {
                    defaultValue: 'Ends on {{date}}',
                    date: format(election.endDate, t('organization.date_format')),
                  })}
                </Text>
              </Box>
              <Spacer />
              <Flex align='center' gap={2}>
                <ElectionStatusBadge />
                <Text fontWeight='bold'>
                  {t('election.total_votes', { defaultValue: '{{totalVotes}} votes', totalVotes: election.voteCount })}
                </Text>
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
          <Icon as={LuArrowUpRight} boxSize={4} />
        </Link>
      </Flex>
    </Flex>
  )
}

const QuickActions = () => {
  const { t } = useTranslation()
  return (
    <DashboardBox p={6} flex='1 1 33%' justifyContent='normal' gap={0}>
      <Text fontWeight='extrabold' mb={1.5} size='2xl'>
        {t('dashboard_empty_processes.quick_actions', {
          defaultValue: 'Quick Actions',
        })}
      </Text>
      <Text color='gray.500' size='sm' mb={6}>
        {t('dashboard_empty_processes.common_tasks_actions', {
          defaultValue: 'Common tasks and actions',
        })}
      </Text>
      <Flex flexDirection='column' gap={4}>
        <Button
          as={ReactRouterLink}
          to={generatePath(Routes.processes.create)}
          colorScheme='gray'
          variant='outline'
          justifyContent='start'
          leftIcon={<Icon as={LuPlus} mr={2} />}
          fontWeight='bold'
        >
          {t('actions.create_new_vote', {
            defaultValue: 'Create new vote',
          })}
        </Button>
        <Button
          as={ReactRouterLink}
          to={generatePath(Routes.dashboard.processes)}
          colorScheme='gray'
          variant='outline'
          justifyContent='start'
          leftIcon={<Icon as={LuVote} mr={2} />}
          fontWeight='bold'
        >
          {t('actions.view_active_votes', {
            defaultValue: 'View active votes',
          })}
        </Button>
        <Button
          as={ReactRouterLink}
          to={generatePath(Routes.dashboard.settings.base)}
          colorScheme='gray'
          variant='outline'
          justifyContent='start'
          leftIcon={<Icon as={LuUsers} mr={2} />}
          fontWeight='bold'
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
