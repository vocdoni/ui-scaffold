import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Button,
  Grid,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Tag,
  Text,
  useClipboard,
  VStack,
} from '@chakra-ui/react'
import {
  ActionCancel,
  ActionContinue,
  ActionEnd,
  ActionPause,
  ActionsProvider,
  ElectionDescription,
  ElectionQuestions,
  ElectionResults,
  ElectionSchedule,
  ElectionStatusBadge,
  ElectionTitle,
} from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { AiOutlinePieChart, AiOutlineQuestionCircle } from 'react-icons/ai'
import { FaCopy, FaEye, FaFilePdf } from 'react-icons/fa'
import { FaPause, FaPlay, FaStop, FaTrash } from 'react-icons/fa6'
import { generatePath, useOutletContext } from 'react-router-dom'
import { DashboardBox, DashboardContents } from '~components/Layout/Dashboard'
import { useReadMoreMarkdown } from '~components/Layout/use-read-more'
import { DashboardLayoutContext } from '~elements/LayoutDashboard'
import { Routes } from '~src/router/routes'

export const ProcessView = () => {
  const { setTitle, setBack } = useOutletContext<DashboardLayoutContext>()
  const { id, election, participation, turnout } = useElection()
  const { ReadMoreMarkdownWrapper, ReadMoreMarkdownButton } = useReadMoreMarkdown(600, 20)

  const votingLink = `${document.location.origin}${generatePath(Routes.processes.view, { id })}`
  const { hasCopied, onCopy } = useClipboard(votingLink)
  const { t } = useTranslation()

  useEffect(() => {
    setTitle(t('vote_details', { defaultValue: 'Vote details' }))
    setBack(generatePath(Routes.dashboard.processes))
  }, [setTitle, setBack, t])

  return (
    <Grid templateColumns={{ base: '1fr', md: '1fr', lg: '1fr 350px' }} position='relative' gap={6} height='full'>
      {/* Main content area */}
      <DashboardContents display='flex' flexDir='column' gap={6} order={{ base: 1, lg: 0 }}>
        {/* Title, schedule, and description */}
        <ElectionSchedule showRemaining as={Tag} />
        <ElectionTitle variant='contents-title' />
        {election instanceof PublishedElection && election.description && (
          <>
            <ReadMoreMarkdownWrapper
              from={'var(--chakra-colors-dashboard-read_more-from)'}
              toLight={'var(--chakra-colors-dashboard-read_more-to-light)'}
              toDark={'var(--chakra-colors-dashboard-read_more-to-dark)'}
            >
              <ElectionDescription mb={0} fontSize='lg' lineHeight={1.5} color='process.description' />
            </ReadMoreMarkdownWrapper>
            <ReadMoreMarkdownButton alignSelf='center' />
          </>
        )}

        {/* Calendar */}
        <DashboardBox display='flex' flexDir='column' gap={4}>
          <Heading as='h4' variant='contents-section'>
            <Trans i18nKey='voting_link'>Calendar</Trans>
          </Heading>
          <Box display='flex'>
            <Box display='flex' flexDirection='column' flex={1}>
              <Box>
                <Text variant='enumeration-title'>Start:</Text>
              </Box>
              <Text>
                {election instanceof PublishedElection && election.startDate && election.startDate.toLocaleString()}
              </Text>
            </Box>
            <Box display='flex' flexDirection='column' flex={1}>
              <Box>
                <Text variant='enumeration-title'>End:</Text>
              </Box>
              <Text>
                {election instanceof PublishedElection && election.endDate && election.endDate.toLocaleString()}
              </Text>
            </Box>
          </Box>
        </DashboardBox>

        {/* Voting link */}
        <Heading variant='contents-subtitle'>
          <Trans i18nKey='voting_link'>Voting Link</Trans>
        </Heading>
        <DashboardBox display='flex' gap={4} flexDirection={{ base: 'column', xl: 'row' }} alignItems='center'>
          <Link href={votingLink} isExternal overflowWrap='anywhere' whiteSpace='normal' wordBreak='break-all' flex={1}>
            {votingLink}
          </Link>
          <Button onClick={onCopy} leftIcon={<FaCopy />}>
            {hasCopied ? <Trans i18nKey='copy.copied'>Copied</Trans> : <Trans i18nKey='share.copy'>Copy</Trans>}
          </Button>
          <Button as={Link} href={votingLink} isExternal leftIcon={<FaEye />} colorScheme='blue'>
            <Trans i18nKey='preview'>Preview</Trans>
          </Button>
        </DashboardBox>

        {/* Accordion section for extra info */}
        <Accordion allowToggle variant='dashboard'>
          <AccordionItem>
            <DashboardAccordionButton icon={AiOutlinePieChart}>
              <Trans i18nKey='voting_results'>Voting Results</Trans>
            </DashboardAccordionButton>
            <AccordionPanel>
              <ElectionResults />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <DashboardAccordionButton icon={AiOutlineQuestionCircle}>
              <Trans i18nKey='voting_questions'>Voting Questions</Trans>
            </DashboardAccordionButton>
            <AccordionPanel>
              <ElectionQuestions />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </DashboardContents>

      {/* Right Sidebar */}
      <VStack
        as='aside'
        gap={{ base: 4, lg: 10 }}
        align='stretch'
        display={{ base: 'flex', lg: 'flex' }}
        flexDirection={{ base: 'column', md: 'row', lg: 'column' }}
      >
        <Stack flexDir='column'>
          {/* Running label */}
          <ElectionStatusBadge variant='solid' />

          {/* Control Panel */}
          <Box>
            <Heading as='h4' mb={4} variant='sidebar-title'>
              <Trans i18nKey='control'>Control:</Trans>
            </Heading>
            <HStack justifyContent='space-around'>
              <ActionsProvider>
                <ActionContinue
                  variant='outline'
                  aria-label={t('process_actions.continue', { defaultValue: 'Continue' })}
                >
                  <FaPlay />
                </ActionContinue>
                <ActionPause variant='outline' aria-label={t('process_actions.pause', { defaultValue: 'Pause' })}>
                  <FaPause />
                </ActionPause>
                <ActionEnd variant='outline' aria-label={t('process_actions.end', { defaultValue: 'End' })}>
                  <FaStop />
                </ActionEnd>
                <ActionCancel
                  variant='outline'
                  colorScheme='red'
                  aria-label={t('process_actions.cancel', { defaultValue: 'Cancel' })}
                >
                  <FaTrash />
                </ActionCancel>
              </ActionsProvider>
            </HStack>
          </Box>
        </Stack>

        {/* Total Votes Submitted */}
        <DashboardBox textAlign='center' display='flex' flexDir='column' gap={3}>
          <Heading as='h4' variant='sidebar-section'>
            <Trans i18nKey='total_votes_submitted'>Total Votes Submitted</Trans>
          </Heading>
          <Box display='flex' alignItems='center' justifyContent='center' gap={3}>
            <Text fontSize='3xl'>{participation}</Text>
            <Text fontSize='sm' color='gray.600' _dark={{ color: 'gray.400' }}>
              ({turnout}%)
            </Text>
          </Box>
          <Button leftIcon={<FaFilePdf />} colorScheme='green' isDisabled>
            <Trans i18nKey='generate_pdf'>Generate PDF</Trans>
          </Button>
          <Text>
            <Trans i18nKey='generate_pdf_description'>Generate a PDF with the results</Trans>
          </Text>
        </DashboardBox>

        {/* Census Details */}
        <DashboardBox textAlign='center' display='flex' flexDir='column' gap={3}>
          <Heading as='h4' variant='sidebar-section'>
            <Trans i18nKey='census_details'>Census Details</Trans>
          </Heading>
          <Text fontSize='2xl'>
            {election instanceof PublishedElection && election.census.size} <Trans i18nKey='voters'>voters</Trans>
          </Text>
        </DashboardBox>

        {/* Features Section */}
        <DashboardBox textAlign='center' display='flex' flexDir='column' gap={3}>
          <Heading as='h4' variant='sidebar-section'>
            <Trans i18nKey='features.title'>Features</Trans>
          </Heading>
          <HStack spacing={3} justifyContent='center'>
            <Text fontSize='sm'>Feature 1</Text>
            <Text fontSize='sm'>Feature 2</Text>
            <Text fontSize='sm'>Feature 3</Text>
          </HStack>
        </DashboardBox>
      </VStack>
    </Grid>
  )
}

type AccordionButtonProps = BoxProps & {
  icon: any
}

const DashboardAccordionButton = ({ icon, children, ...rest }: AccordionButtonProps) => (
  <AccordionButton>
    <Box flex='1' textAlign='left' fontWeight={600} display='flex' alignItems='center' gap={4} {...rest}>
      <Icon as={icon} fontSize='3rem' color='teal.400' /> {children}
    </Box>
    <AccordionIcon />
  </AccordionButton>
)
