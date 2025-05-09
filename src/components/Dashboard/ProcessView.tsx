import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  useClipboard,
  VStack,
} from '@chakra-ui/react'
import {
  BarChart04,
  Calendar,
  Clock,
  List,
  PauseCircle,
  PlayCircle,
  Settings01,
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
  ElectionQuestions,
  ElectionResults,
  ElectionStatusBadge,
  ElectionTitle,
} from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { formatDate } from 'date-fns'
import { ReactNode, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FaCopy, FaEye } from 'react-icons/fa'
import { generatePath } from 'react-router-dom'
import { DashboardBox, DashboardContents, Sidebar, SidebarContents, SidebarProps } from '~components/Layout/Dashboard'
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

        {/* Calendar */}
        <DashboardBox display='flex' flexDirection='column' flexWrap={'wrap'} justifyContent={'space-between'} gap={4}>
          <Heading size='sm' fontSize='2xl' fontWeight={600} as='h3' display='flex' alignItems='center'>
            <Icon as={Calendar} mr={2} />
            <Trans i18nKey='calendar.title'>Schedule</Trans>
          </Heading>
          <HStack>
            <CalendarField
              icon={Calendar}
              date={election instanceof PublishedElection && election.startDate}
              format={t('dashboard.process_view.date_format', 'MMMM do, y')}
              text={t('start_date', 'Start Date')}
            />
            <CalendarField
              icon={Clock}
              date={election instanceof PublishedElection && election.startDate}
              format={t('dashboard.process_view.time_format', 'p')}
              text={t('start_time', 'Start Time')}
            />
          </HStack>
          <HStack>
            <CalendarField
              icon={Calendar}
              date={election instanceof PublishedElection && election.endDate}
              format={t('dashboard.process_view.date_format', 'MMMM do, y')}
              text={t('end_date', 'End Date')}
            />
            <CalendarField
              icon={Clock}
              date={election instanceof PublishedElection && election.endDate}
              format={t('dashboard.process_view.time_format', 'p')}
              text={t('end_time', 'End Time')}
            />
          </HStack>
        </DashboardBox>

        {/* Voting link */}

        <DashboardBox display='flex' gap={4} flexDirection={'column'} alignItems='center'>
          <Heading variant='contents-section'>
            <Trans i18nKey='voting_link'>Voting Link</Trans>
          </Heading>

          <Flex justifyContent={'space-between'}>
            <Link
              href={votingLink}
              isExternal
              overflowWrap='anywhere'
              whiteSpace='normal'
              wordBreak='break-all'
              flex={1}
            >
              {votingLink}
            </Link>
            <IconButton onClick={onCopy} icon={<FaCopy />} aria-label='' />

            <Button as={Link} href={votingLink} isExternal leftIcon={<FaEye />} colorScheme='blue'>
              <Trans i18nKey='preview'>Preview</Trans>
            </Button>
          </Flex>
        </DashboardBox>

        {/* Accordion section for extra info */}
        <Accordion allowToggle variant='dashboard'>
          <AccordionItem mb={6}>
            <DashboardAccordionButton icon={BarChart04}>
              <Trans i18nKey='voting_results'>Voting Results</Trans>
            </DashboardAccordionButton>
            <AccordionPanel>
              <ElectionResults />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <DashboardAccordionButton icon={List}>
              <Trans i18nKey='voting_questions'>Voting Questions</Trans>
            </DashboardAccordionButton>
            <AccordionPanel>
              <ElectionQuestions />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      <ProcessViewSidebar show={showSidebar} />
    </DashboardContents>
  )
}

const CalendarField = ({
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
