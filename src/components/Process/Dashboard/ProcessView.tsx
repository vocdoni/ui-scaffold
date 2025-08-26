import {
  AspectRatio,
  Badge,
  BadgeProps,
  Box,
  BoxProps,
  Button,
  Flex,
  forwardRef,
  HStack,
  Icon,
  IconButton,
  IconProps,
  Input,
  Link,
  Progress,
  Text,
  Tooltip,
  useClipboard,
  useStyleConfig,
  VStack,
} from '@chakra-ui/react'
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
import { ElectionResultsTypeNames, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { formatDate } from 'date-fns'
import { ReactNode, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  LuCalendar,
  LuCirclePlay,
  LuCircleStop,
  LuClock,
  LuCopy,
  LuExternalLink,
  LuEye,
  LuInfo,
  LuPause,
  LuRotateCw,
  LuSearch,
  LuSettings,
  LuShield,
  LuTrash2,
  LuUsers,
  LuVote,
} from 'react-icons/lu'
import ReactPlayer from 'react-player'
import { generatePath } from 'react-router-dom'
import {
  DashboardBox,
  DashboardContents,
  Heading,
  Sidebar,
  SidebarContents,
  SidebarProps,
  SidebarSubtitle,
  SidebarTitle,
} from '~shared/Dashboard/Contents'
import { Routes } from '~src/router/routes'

export const ElectionVideo = forwardRef<BoxProps, 'div'>((props, ref) => {
  const { election } = useElection()
  const styles = useStyleConfig('ElectionVideo', props)

  if (!election) return null

  const streamUri = election instanceof PublishedElection ? election.streamUri : undefined

  if (!streamUri) return null

  return (
    <Box ref={ref} __css={styles} {...props}>
      <AspectRatio ratio={16 / 9} width='100%' height='100%'>
        <ReactPlayer src={streamUri} width='100%' controls height='100%' />
      </AspectRatio>
    </Box>
  )
})

export const ProcessView = () => {
  const { t } = useTranslation()
  const [showSidebar, setShowSidebar] = useState(true)
  const { id, election } = useElection()

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
            icon={<Icon as={LuSettings} />}
            variant='outline'
            onClick={() => setShowSidebar((prev) => !prev)}
          />
        </HStack>

        <Box as='header'>
          <ElectionTitle textAlign={'start'} fontWeight={'bold'} />
          <ElectionVideo mb='3' />
          <ElectionDescription color='gray.500' />
        </Box>

        {/* Schedule */}
        <DashboardBox display='flex' flexDirection='column' flexWrap={'wrap'} justifyContent={'space-between'} gap={4}>
          <Heading>
            <Icon as={LuCalendar} />
            <Trans i18nKey='calendar.title'>Schedule</Trans>
          </Heading>
          <HStack>
            <SettingsField
              icon={LuCalendar}
              text={t('start_date', 'Start date')}
              subtext={
                election instanceof PublishedElection &&
                formatDate(election.startDate, t('dashboard.process_view.date_format', 'MMMM do, y'))
              }
            />
            <SettingsField
              icon={LuClock}
              text={t('start_time', 'Start time')}
              subtext={
                election instanceof PublishedElection &&
                formatDate(election.startDate, t('dashboard.process_view.time_format', 'p'))
              }
            />
          </HStack>
          <HStack>
            <SettingsField
              icon={LuCalendar}
              text={t('end_date', 'End date')}
              subtext={
                election instanceof PublishedElection &&
                formatDate(election.endDate, t('dashboard.process_view.date_format', 'MMMM do, y'))
              }
            />
            <SettingsField
              icon={LuClock}
              text={t('end_time', 'End time')}
              subtext={
                election instanceof PublishedElection &&
                formatDate(election.endDate, t('dashboard.process_view.time_format', 'p'))
              }
            />
          </HStack>
        </DashboardBox>

        {/* Voting link */}

        <DashboardBox>
          <Box>
            <Heading>
              <Icon as={LuExternalLink} />
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
              icon={<Icon as={LuCopy} />}
              title={t('copy.copy', 'Copy')}
              aria-label={t('copy.copy')}
            />
            <IconButton
              as={Link}
              href={votingLink}
              isExternal
              icon={<Icon as={LuEye} />}
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
          {tooltip && <Icon as={LuInfo} />}
        </Badge>
      </Tooltip>
    )
  }

  return null
}

const ProcessViewSidebar = (props: SidebarProps) => {
  const { election, participation, client } = useElection()
  const { t } = useTranslation()

  const resultTypesNames = {
    [ElectionResultsTypeNames.BUDGET]: t('results_type.budget', 'Budget allocation'),
    [ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION]: t(
      'results_type.single_choice_multiquestion',
      'Single choice'
    ),
    [ElectionResultsTypeNames.QUADRATIC]: t('results_type.quadratic', 'Quadratic voting'),
    // Yeah we name approval and multiple choice the same, they're also unified during creation
    [ElectionResultsTypeNames.APPROVAL]: t('results_type.multiple_choice', 'Multiple choice'),
    [ElectionResultsTypeNames.MULTIPLE_CHOICE]: t('results_type.multiple_choice', 'Multiple choice'),
  }

  return (
    <Sidebar {...props}>
      <SidebarContents borderBottom='1px solid' borderColor='table.border'>
        <SidebarTitle>
          <Trans i18nKey='vote_information'>Vote information</Trans>
        </SidebarTitle>
      </SidebarContents>
      <SidebarContents flex='1' overflowY='auto'>
        <VStack align='stretch'>
          <SidebarSubtitle>
            <Trans i18nKey='control_panel'>Control panel</Trans>
          </SidebarSubtitle>
          <ActionsProvider>
            {election instanceof PublishedElection && election.status === ElectionStatus.ONGOING && (
              <ActionPause variant='outline' aria-label={t('process_actions.pause', { defaultValue: 'Pause' })}>
                <ControlIcon as={LuPause} color='orange.400' />
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
                <ControlIcon as={LuCirclePlay} color='green.400' />
                <Text as='span' flex={1} textAlign='left' fontSize='sm'>
                  Resume
                </Text>
              </ActionContinue>
            )}
            <ActionEnd variant='outline' aria-label={t('process_actions.end', { defaultValue: 'End' })}>
              <ControlIcon as={LuCircleStop} color='red.500' />
              <Text as='span' flex={1} textAlign='left' fontSize='sm'>
                End vote
              </Text>
            </ActionEnd>
            <ActionCancel variant='outline' aria-label={t('process_actions.cancel', { defaultValue: 'Cancel' })}>
              <ControlIcon as={LuTrash2} color='red.400' />
              <Text as='span' flex={1} textAlign='left' fontSize='sm'>
                Cancel vote
              </Text>
            </ActionCancel>
          </ActionsProvider>
          <SidebarSubtitle>
            <Trans i18nKey='voting_status'>Voting status</Trans>
          </SidebarSubtitle>
          {/* Total Votes Submitted */}
          <DashboardBox display='flex' flexDir='column' gap={3} alignContent='start'>
            <Box display='flex' justifyContent='space-between' w='full'>
              <Box display='flex' gap={2} alignItems='center'>
                <Icon as={LuVote} />
                <Text textTransform='capitalize'>
                  <Trans i18nKey='total_votes'>Total votes</Trans>
                </Text>
              </Box>
              <Text fontWeight='bold'>{(election instanceof PublishedElection && election.voteCount) || 0}</Text>
            </Box>
            <Box pb={6} borderBottom='1px solid' borderColor='table.border'>
              <Box display='flex' w='full' justifyContent='space-between' alignItems='center' fontSize='xs' mb={1}>
                <Box>
                  <Trans i18nKey='turnout'>Turnout</Trans>
                </Box>
                <Box>{participation}%</Box>
              </Box>
              <Progress colorScheme='gray' w='full' value={participation} />
            </Box>
            <Box display='flex' justifyContent='space-between' fontSize='sm'>
              <Text display='flex' gap={2} alignItems='center' fontSize='inherit'>
                <Icon as={LuUsers} />
                <Trans i18nKey='census_size'>Census size</Trans>
              </Text>
              <Text fontSize='inherit'>{election instanceof PublishedElection && election.census.size}</Text>
            </Box>
          </DashboardBox>

          {/* Voting settings */}
          <SidebarSubtitle>
            <Trans i18nKey='voting_settings'>Voting settings</Trans>
          </SidebarSubtitle>
          <SettingsField
            icon={LuVote}
            text={t('results_type.title', 'Results type')}
            subtext={
              election instanceof PublishedElection &&
              resultTypesNames[election.resultsType.name as ElectionResultsTypeNames]
            }
          />
          <SettingsField
            icon={LuEye}
            text={t('result_visibility', 'Results visibility')}
            subtext={
              election instanceof PublishedElection &&
              (election.electionType.secretUntilTheEnd
                ? t('results_state.hidden_until_end', 'Hidden until the end')
                : t('results_state.live_results', 'Live results'))
            }
          />
          <SettingsField
            icon={LuShield}
            text={t('anonymous_voting', 'Anonymous voting')}
            subtext={
              election instanceof PublishedElection &&
              (election.electionType.anonymous
                ? t('results_state.enabled', 'Enabled')
                : t('results_state.not_enabled', 'Not enabled'))
            }
          />
          <SettingsField
            icon={LuRotateCw}
            text={t('vote_overwrite', 'Vote overwrite')}
            subtext={
              election instanceof PublishedElection &&
              (election.voteType.maxVoteOverwrites
                ? t('results_state.enabled', 'Enabled')
                : t('results_state.not_enabled', 'Not enabled'))
            }
          />

          {/* Additional actions */}
          <SidebarSubtitle>
            <Trans i18nKey='additional_actions'>Additional actions</Trans>
          </SidebarSubtitle>
          <Button
            as={Link}
            variant='outline'
            w='full'
            size='sm'
            href={`${client.explorerUrl}/process/${election.id}`}
            justifyContent='start'
            leftIcon={<Icon as={LuSearch} />}
            isExternal
          >
            <Trans i18nKey='view_in_explorer'>View in explorer</Trans>
          </Button>
        </VStack>
      </SidebarContents>
    </Sidebar>
  )
}

const SettingsField = ({ subtext, icon, text }: { subtext?: string; icon: typeof LuCalendar; text: ReactNode }) => (
  <Box display='flex' gap={2} flex={1} alignItems='center'>
    <Box
      color='gray.600'
      bg='gray.100'
      _dark={{ bg: 'black.700', color: 'gray.400' }}
      display='flex'
      alignItems='center'
      justifyContent='center'
      h='full'
      p={2}
      borderRadius='md'
    >
      <Icon as={icon} boxSize={5} />
    </Box>
    <Box flex={1} display='flex' flexDirection='column'>
      <Text fontSize='sm' fontWeight='bold' textTransform='capitalize'>
        {text}
      </Text>
      <Text whiteSpace='nowrap' color='gray.500' fontSize='sm'>
        {subtext}
      </Text>
    </Box>
  </Box>
)

const ControlIcon = forwardRef<IconProps, 'svg'>((props, ref) => <Icon mr={3} boxSize={4} ref={ref} {...props} />)
