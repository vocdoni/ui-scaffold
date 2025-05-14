import {
  AccordionButton,
  AccordionIcon,
  Badge,
  BadgeProps,
  Box,
  BoxProps,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Link,
  Stack,
  Text,
  Tooltip,
  useClipboard,
  VStack,
} from '@chakra-ui/react'
import {
  Calendar,
  Clock,
  Copy01,
  Eye,
  InfoCircle,
  PauseCircle,
  PlayCircle,
  Settings01,
  Share04,
  StopCircle,
  Trash01,
} from '@untitled-ui/icons-react'
import {
  ActionCancel,
  ActionContinue,
  ActionEnd,
  ActionPause,
  ActionsProvider,
  ElectionDescription,
  ElectionResults,
  ElectionStatusBadge,
  ElectionTitle,
} from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { formatDate } from 'date-fns'
import { ReactNode, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import {
  DashboardBox,
  DashboardContents,
  Heading,
  Sidebar,
  SidebarContents,
  SidebarProps,
} from '~components/Layout/Dashboard'
import { Features } from '~components/Process/Features'
import { Routes } from '~src/router/routes'

export const ProcessView = () => {
  const { t } = useTranslation()
  const [showSidebar, setShowSidebar] = useState(true)
  const { id, election, participation } = useElection()

  const votingLink = `${document.location.origin}${generatePath(Routes.processes.view, { id })}`
  const { onCopy } = useClipboard(votingLink)

  return (
    <DashboardContents display='flex' flexDirection='row' position='relative'>
      {/* Main content area */}
      <Box
        flex={1}
        marginRight={showSidebar ? '350px' : 0}
        transition='margin-right 0.3s'
        display='flex'
        flexDirection='column'
        gap={8}
        paddingRight={4}
        paddingBottom={4}
      >
        {/* Title, schedule, and description */}
        <HStack justifyContent={'space-between'}>
          <ElectionStatusBadge />
          <IconButton
            aria-label={t('dashboard.actions.toggle_sidebar', { defaultValue: 'Toggle sidebar' })}
            icon={<Icon as={Settings01} />}
            variant='outline'
            onClick={() => setShowSidebar((prev) => !prev)}
          />
        </HStack>

        <Box as='header'>
          <ElectionTitle textAlign={'start'} fontWeight={'extrabold'} />
          <ElectionDescription color='gray.500' />
        </Box>

        {/* Schedule */}
        <DashboardBox display='flex' flexDirection='column' flexWrap={'wrap'} justifyContent={'space-between'} gap={4}>
          <Heading>
            <Icon as={Calendar} mr={2} />
            <Trans i18nKey='calendar.title'>Schedule</Trans>
          </Heading>
          <HStack>
            <ScheduleField
              icon={Calendar}
              date={election instanceof PublishedElection && election.startDate}
              format={t('dashboard.process_view.date_format', 'MMMM do, y')}
              text={t('start_date', 'Start Date')}
            />
            <ScheduleField
              icon={Clock}
              date={election instanceof PublishedElection && election.startDate}
              format={t('dashboard.process_view.time_format', 'p')}
              text={t('start_time', 'Start Time')}
            />
          </HStack>
          <HStack>
            <ScheduleField
              icon={Calendar}
              date={election instanceof PublishedElection && election.endDate}
              format={t('dashboard.process_view.date_format', 'MMMM do, y')}
              text={t('end_date', 'End Date')}
            />
            <ScheduleField
              icon={Clock}
              date={election instanceof PublishedElection && election.endDate}
              format={t('dashboard.process_view.time_format', 'p')}
              text={t('end_time', 'End Time')}
            />
          </HStack>
        </DashboardBox>

        {/* Voting link */}

        <DashboardBox>
          <Box>
            <Heading>
              <Icon as={Share04} mr={2} />
              <Trans i18nKey='voting_link.title'>Voting Link</Trans>
            </Heading>
            <Text color='gray.500' fontSize='sm'>
              <Trans i18nKey='voting_link.description'>
                Share this link with your voters to participate in the voting process
              </Trans>
            </Text>
          </Box>

          <Flex justifyContent='space-between' gap={2}>
            <Input readOnly value={votingLink} />
            <IconButton
              variant='outline'
              onClick={onCopy}
              icon={<Icon as={Copy01} />}
              title={t('copy.copy', 'Copy')}
              aria-label={t('copy.copy')}
            />
            <IconButton
              as={Link}
              href={votingLink}
              isExternal
              icon={<Icon as={Eye} />}
              variant='outline'
              title={t('preview', 'Preview')}
              aria-label={t('preview')}
            />
          </Flex>
        </DashboardBox>

        {/* Questions & Results */}
        <DashboardBox>
          <Heading as='h4' alignContent='center' justifyContent='space-between'>
            <Trans i18nKey='questions_and_results'>Questions and results</Trans>
            <ResultsStateBadge />
          </Heading>
          <ElectionResults />
        </DashboardBox>
      </Box>

      <ProcessViewSidebar show={showSidebar} />
    </DashboardContents>
  )
}

const ResultsStateBadge = (props: BadgeProps) => {
  const { election } = useElection()
  const { t } = useTranslation()

  if (!(election instanceof PublishedElection)) return null

  if ([ElectionStatus.ONGOING, ElectionStatus.RESULTS].includes(election.status)) {
    let color = 'blue'
    let text = t('results_state.live_results', 'Live results')
    let tooltip = t(
      'results_state.live_results_tooltip',
      'This voting process shows live results. However, it is still in progress, so the results may change before the vote ends.'
    )
    if (election.status === ElectionStatus.ONGOING && election.electionType.secretUntilTheEnd) {
      color = 'orange'
      text = t('results_state.secret_until_end', 'Awaiting results')
      tooltip = t(
        'results_state.secret_until_end_tooltip',
        'Results are hidden and will only be available once voting ends'
      )
    }
    if (election.status === ElectionStatus.RESULTS) {
      color = 'green'
      text = t('results_state.results_available', 'Results available')
      tooltip = null
    }
    return (
      <Tooltip label={tooltip} isDisabled={!tooltip} placement='top'>
        <Badge colorScheme={color} {...props}>
          {text}
          {tooltip && <Icon as={InfoCircle} />}
        </Badge>
      </Tooltip>
    )
  }

  return null
}

const ScheduleField = ({
  date,
  format,
  icon,
  text,
}: {
  date?: Date
  format: string
  icon: typeof Calendar
  text: ReactNode
}) => {
  const { t } = useTranslation()

  return (
    <Box display='flex' gap={2} flex={1} alignItems='center'>
      <Box
        color='gray.600'
        bg='gray.100'
        display='flex'
        alignItems='center'
        justifyContent='center'
        h='full'
        p={2}
        borderRadius='md'
      >
        <Icon as={icon} boxSize={5} color='gray.500' />
      </Box>
      <Box flex={1} display='flex' flexDirection='column'>
        <Text fontSize='sm' fontWeight='bold'>
          {text}
        </Text>
        <Text whiteSpace='nowrap' color='gray.500' fontSize='sm'>
          {date && formatDate(date, format)}
        </Text>
      </Box>
    </Box>
  )
}

const ProcessViewSidebar = (props: SidebarProps) => {
  const { election, participation } = useElection()
  const { t } = useTranslation()

  return (
    <Sidebar {...props}>
      <Stack flexDir='column'>
        <SidebarContents borderBottom='1px solid' borderColor='gray.200'>
          <Heading as='h4' variant='sidebar-title' pt={4}>
            <Trans i18nKey='vote_information'>Vote information</Trans>
          </Heading>
        </SidebarContents>
        <SidebarContents>
          <VStack align='stretch'>
            <Heading as='h5' variant='sidebar-section' py={4}>
              Control panel
            </Heading>
            <ActionsProvider>
              {election instanceof PublishedElection && election.status === ElectionStatus.ONGOING && (
                <ActionPause variant='outline' aria-label={t('process_actions.pause', { defaultValue: 'Pause' })}>
                  <Icon as={PauseCircle} color='yellow.500' mr={3} />
                  <Text as='span' flex={1} textAlign='left' fontSize='sm'>
                    Pause vote
                  </Text>
                </ActionPause>
              )}
              {election instanceof PublishedElection && election.status === ElectionStatus.PAUSED && (
                <ActionContinue
                  variant='outline'
                  aria-label={t('process_actions.continue', { defaultValue: 'Continue' })}
                >
                  <Icon as={PlayCircle} color='green.400' mr={3} />
                  <Text as='span' flex={1} textAlign='left' fontSize='sm'>
                    Resume
                  </Text>
                </ActionContinue>
              )}
              <ActionEnd variant='outline' aria-label={t('process_actions.end', { defaultValue: 'End' })}>
                <Icon as={StopCircle} color='orange.400' mr={3} />
                <Text as='span' flex={1} textAlign='left' fontSize='sm'>
                  End vote
                </Text>
              </ActionEnd>
              <ActionCancel variant='outline' aria-label={t('process_actions.cancel', { defaultValue: 'Cancel' })}>
                <Icon as={Trash01} color='red.400' mr={3} />
                <Text as='span' flex={1} textAlign='left' fontSize='sm'>
                  Cancel vote
                </Text>
              </ActionCancel>
            </ActionsProvider>
          </VStack>
        </SidebarContents>
      </Stack>
      <VStack px={4} gap={6} align='stretch'>
        {/* Total Votes Submitted */}
        <DashboardBox textAlign='center' display='flex' flexDir='column' gap={3}>
          <Text fontWeight={'bold'}>
            <Trans i18nKey='total_votes_submitted'>Total Votes Submitted</Trans>
          </Text>
          <Box display='flex' alignItems='center' justifyContent='center' gap={3}>
            <Text fontSize='3lg'>{(election instanceof PublishedElection && election.voteCount) || 0}</Text>
            <Text fontSize='sm' color='gray.600' _dark={{ color: 'gray.400' }}>
              ({participation}%)
            </Text>
          </Box>
        </DashboardBox>

        {/* Census Details */}
        <DashboardBox textAlign='center' display='flex' flexDir='column' gap={3}>
          <Text fontWeight={'bold'}>
            <Trans i18nKey='census_details'>Census Details</Trans>
          </Text>
          <Text fontSize='2lg'>
            {election instanceof PublishedElection && election.census.size} <Trans i18nKey='voters'>voters</Trans>
          </Text>
        </DashboardBox>

        {/* Features Section */}
        <DashboardBox textAlign='center' display='flex' flexDir='column' gap={3}>
          <Text fontWeight={'bold'}>
            <Trans i18nKey='features.title'>Features</Trans>
          </Text>
          <Features />
        </DashboardBox>
      </VStack>
    </Sidebar>
  )
}

type AccordionButtonProps = BoxProps & {
  icon: any
}

const DashboardAccordionButton = ({ icon, children, ...rest }: AccordionButtonProps) => (
  <AccordionButton>
    <Box flex='1' textAlign='left' fontWeight={600} display='flex' alignItems='center' gap={4} {...rest}>
      <Icon as={icon} /> {children}
    </Box>
    <AccordionIcon />
  </AccordionButton>
)
