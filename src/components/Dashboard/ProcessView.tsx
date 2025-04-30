// import {
//   Accordion,
//   AccordionButton,
//   AccordionIcon,
//   AccordionItem,
//   AccordionPanel,
//   Box,
//   BoxProps,
//   Button,
//   Grid,
//   Heading,
//   HStack,
//   Icon,
//   IconButton,
//   Link,
//   Stack,
//   Tag,
//   Text,
//   useClipboard,
//   VStack,
// } from '@chakra-ui/react'
// import { BarChart04, Link03, List } from '@untitled-ui/icons-react'
// import {
//   ActionCancel,
//   ActionContinue,
//   ActionEnd,
//   ActionPause,
//   ActionsProvider,
//   ElectionDescription,
//   ElectionQuestions,
//   ElectionResults,
//   ElectionSchedule,
//   ElectionStatusBadge,
//   ElectionTitle,
// } from '@vocdoni/chakra-components'
// import { useElection } from '@vocdoni/react-providers'
// import { PublishedElection } from '@vocdoni/sdk'
// import { Trans, useTranslation } from 'react-i18next'
// import { FaCopy, FaEye } from 'react-icons/fa'
// import { FaPause, FaPlay, FaStop, FaTrash } from 'react-icons/fa6'
// import { generatePath } from 'react-router-dom'
// import { DashboardBox, DashboardContents } from '~components/Layout/Dashboard'
// import { useReadMoreMarkdown } from '~components/Layout/use-read-more'
// import { Features } from '~components/Process/Features'
// import { Routes } from '~src/router/routes'

// export const ProcessView = () => {
//   const { id, election, participation, turnout } = useElection()
//   const { ReadMoreMarkdownWrapper, ReadMoreMarkdownButton } = useReadMoreMarkdown(70, 40)

//   const votingLink = `${document.location.origin}${generatePath(Routes.processes.view, { id })}`
//   const { hasCopied, onCopy } = useClipboard(votingLink)
//   const { t } = useTranslation()

//   return (
//     <Grid templateColumns={{ base: '1fr', md: '1fr', lg: '1fr 350px' }} position='relative' gap={6} height='full'>
//       {/* Main content area */}
//       <DashboardContents display='flex' flexDir='column' gap={6} order={{ base: 1, lg: 0 }}>
//         {/* Title, schedule, and description */}
//         <ElectionSchedule showRemaining as={Tag} variant='solid' color='white' />
//         <ElectionTitle variant='contents-title' mb={0} />
//         {election instanceof PublishedElection && election.description && (
//           <Box>
//             <ReadMoreMarkdownWrapper
//               from={'var(--chakra-colors-dashboard-read_more-from)'}
//               toLight={'var(--chakra-colors-dashboard-read_more-to-light)'}
//               toDark={'var(--chakra-colors-dashboard-read_more-to-dark)'}
//             >
//               <ElectionDescription fontSize='lg' lineHeight={1.5} />
//             </ReadMoreMarkdownWrapper>
//             <ReadMoreMarkdownButton
//               alignSelf='start'
//               h='fit-content'
//               p={0}
//               mt={4}
//               color='dashboard.read_more.text.light'
//               _dark={{ color: 'dashboard.read_more.text.dark' }}
//             />
//           </Box>
//         )}

//         {/* Calendar */}
//         <Box>
//           <Heading as='h4' variant='contents-section'>
//             <Trans i18nKey='calendar.title'>Calendar</Trans>
//           </Heading>
//           <DashboardBox display='flex' flexDirection='row' flexWrap={'wrap'} justifyContent={'space-between'}>
//             <Box display='flex' flexDirection='row' gap={2} flex={1}>
//               <Text color={'dashboard.process_view.calendar_label'}>Start</Text>
//               <Text whiteSpace={'nowrap'}>
//                 {election instanceof PublishedElection && election.startDate && election.startDate.toLocaleString()}
//               </Text>
//             </Box>
//             <Box display='flex' flexDirection='row' gap={2} flex={1}>
//               <Text color={'dashboard.process_view.calendar_label'}>End</Text>
//               <Text whiteSpace={'nowrap'}>
//                 {election instanceof PublishedElection && election.endDate && election.endDate.toLocaleString()}
//               </Text>
//             </Box>
//           </DashboardBox>
//         </Box>

//         {/* Voting link */}
//         <Box>
//           <Heading variant='contents-section'>
//             <Trans i18nKey='voting_link'>Voting Link</Trans>
//           </Heading>
//           <DashboardBox display='flex' gap={4} flexDirection={{ base: 'column', lg: 'row' }} alignItems='center'>
//             <Icon as={Link03} color={'dashboard.process_view.link'} />
//             <Link
//               href={votingLink}
//               isExternal
//               overflowWrap='anywhere'
//               whiteSpace='normal'
//               wordBreak='break-all'
//               flex={1}
//             >
//               {votingLink}
//             </Link>
//             <IconButton onClick={onCopy} icon={<FaCopy />} aria-label='' />

//             <Button as={Link} href={votingLink} isExternal leftIcon={<FaEye />} colorScheme='blue'>
//               <Trans i18nKey='preview'>Preview</Trans>
//             </Button>
//           </DashboardBox>
//         </Box>

//         {/* Accordion section for extra info */}
//         <Accordion allowToggle variant='dashboard'>
//           <AccordionItem mb={6}>
//             <DashboardAccordionButton icon={BarChart04}>
//               <Trans i18nKey='voting_results'>Voting Results</Trans>
//             </DashboardAccordionButton>
//             <AccordionPanel>
//               <ElectionResults />
//             </AccordionPanel>
//           </AccordionItem>

//           <AccordionItem>
//             <DashboardAccordionButton icon={List}>
//               <Trans i18nKey='voting_questions'>Voting Questions</Trans>
//             </DashboardAccordionButton>
//             <AccordionPanel>
//               <ElectionQuestions />
//             </AccordionPanel>
//           </AccordionItem>
//         </Accordion>
//       </DashboardContents>

//       {/* Right Sidebar */}
//       <VStack
//         as='aside'
//         gap={{ base: 4, lg: 10 }}
//         align='stretch'
//         display={{ base: 'flex', lg: 'flex' }}
//         flexDirection={{ base: 'column', lg: 'column' }}
//       >
//         <Stack flexDir='column'>
//           {/* Running label */}
//           <ElectionStatusBadge variant='solid' w='full' py={2} />

//           {/* Control Panel */}
//           <Box>
//             <Heading as='h4' variant='sidebar-title'>
//               <Trans i18nKey='control'>Control:</Trans>
//             </Heading>
//             <HStack justifyContent='space-around'>
//               <ActionsProvider>
//                 <ActionContinue
//                   variant='outline'
//                   aria-label={t('process_actions.continue', { defaultValue: 'Continue' })}
//                   colorScheme='green'
//                 >
//                   <FaPlay />
//                 </ActionContinue>
//                 <ActionPause
//                   variant='outline'
//                   aria-label={t('process_actions.pause', { defaultValue: 'Pause' })}
//                   colorScheme='yellow'
//                 >
//                   <FaPause />
//                 </ActionPause>
//                 <ActionEnd
//                   variant='outline'
//                   aria-label={t('process_actions.end', { defaultValue: 'End' })}
//                   colorScheme='orange'
//                 >
//                   <FaStop />
//                 </ActionEnd>
//                 <ActionCancel
//                   variant='outline'
//                   colorScheme='red'
//                   aria-label={t('process_actions.cancel', { defaultValue: 'Cancel' })}
//                 >
//                   <FaTrash />
//                 </ActionCancel>
//               </ActionsProvider>
//             </HStack>
//           </Box>
//         </Stack>

//         {/* Total Votes Submitted */}
//         <DashboardBox textAlign='center' display='flex' flexDir='column' gap={3}>
//           <Text fontWeight={'bold'}>
//             <Trans i18nKey='total_votes_submitted'>Total Votes Submitted</Trans>
//           </Text>
//           <Box display='flex' alignItems='center' justifyContent='center' gap={3}>
//             <Text fontSize='3lg'>{(election instanceof PublishedElection && election.voteCount) || 0}</Text>
//             <Text fontSize='sm' color='gray.600' _dark={{ color: 'gray.400' }}>
//               ({participation}%)
//             </Text>
//           </Box>
//         </DashboardBox>

//         {/* Census Details */}
//         <DashboardBox textAlign='center' display='flex' flexDir='column' gap={3}>
//           <Text fontWeight={'bold'}>
//             <Trans i18nKey='census_details'>Census Details</Trans>
//           </Text>
//           <Text fontSize='2lg'>
//             {election instanceof PublishedElection && election.census.size} <Trans i18nKey='voters'>voters</Trans>
//           </Text>
//         </DashboardBox>

//         {/* Features Section */}
//         <DashboardBox textAlign='center' display='flex' flexDir='column' gap={3}>
//           <Text fontWeight={'bold'}>
//             <Trans i18nKey='features.title'>Features</Trans>
//           </Text>
//           <Features />
//         </DashboardBox>
//       </VStack>
//     </Grid>
//   )
// }

// type AccordionButtonProps = BoxProps & {
//   icon: any
// }

// const DashboardAccordionButton = ({ icon, children, ...rest }: AccordionButtonProps) => (
//   <AccordionButton>
//     <Box flex='1' textAlign='left' fontWeight={600} display='flex' alignItems='center' gap={4} {...rest}>
//       <Icon as={icon} /> {children}
//     </Box>
//     <AccordionIcon />
//   </AccordionButton>
// )
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
import { BarChart04, List, Settings01 } from '@untitled-ui/icons-react'
import {
  ActionCancel,
  ActionContinue,
  ActionEnd,
  ActionPause,
  ActionsProvider,
  ElectionQuestions,
  ElectionResults,
  ElectionStatusBadge,
  ElectionTitle,
} from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FaCopy, FaEye } from 'react-icons/fa'
import { FaPause, FaPlay, FaStop, FaTrash } from 'react-icons/fa6'
import { generatePath } from 'react-router-dom'
import { DashboardBox, DashboardContents } from '~components/Layout/Dashboard'
import { useReadMoreMarkdown } from '~components/Layout/use-read-more'
import { Features } from '~components/Process/Features'
import { Routes } from '~src/router/routes'

export const ProcessView = () => {
  const { t } = useTranslation()
  const [showAside, setShowAside] = useState(true)
  const { id, election, participation, turnout } = useElection()
  const { ReadMoreMarkdownWrapper, ReadMoreMarkdownButton } = useReadMoreMarkdown(70, 40)

  const votingLink = `${document.location.origin}${generatePath(Routes.processes.view, { id })}`
  const { hasCopied, onCopy } = useClipboard(votingLink)

  return (
    <Flex flexDirection='row'>
      {/* Main content area */}
      <DashboardContents display='flex' flexDir='column' gap={6} order={{ base: 1, lg: 0 }}>
        {/* Title, schedule, and description */}
        <HStack justifyContent={'space-between'}>
          <ElectionStatusBadge />
          <Flex>
            <IconButton
              aria-label='toggle aside'
              icon={<Settings01 />}
              onClick={() => setShowAside((prev) => !prev)}
              variant={'outline'}
              colorScheme='gray'
            />
          </Flex>
        </HStack>

        <ElectionTitle textAlign={'start'} fontWeight={'extrabold'} />

        {/* Calendar */}
        <DashboardBox display='flex' flexDirection='column' flexWrap={'wrap'} justifyContent={'space-between'}>
          <Heading size='xs' fontWeight={'extrabold'} as='h3'>
            <Trans i18nKey='calendar.title'>Schedule</Trans>
          </Heading>
          <Box display='flex' flexDirection='row' gap={2} flex={1}>
            <Text color={'dashboard.process_view.calendar_label'}>Start</Text>
            <Text whiteSpace={'nowrap'}>
              {election instanceof PublishedElection && election.startDate && election.startDate.toLocaleString()}
            </Text>
          </Box>
          <Box display='flex' flexDirection='row' gap={2} flex={1}>
            <Text color={'dashboard.process_view.calendar_label'}>End</Text>
            <Text whiteSpace={'nowrap'}>
              {election instanceof PublishedElection && election.endDate && election.endDate.toLocaleString()}
            </Text>
          </Box>
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
      </DashboardContents>

      {/* Right Sidebar */}
      {showAside && (
        <VStack
          as='aside'
          gap={{ base: 4, lg: 10 }}
          align='stretch'
          display={{ base: 'flex', lg: 'flex' }}
          flexDirection={{ base: 'column', lg: 'column' }}
        >
          <Stack flexDir='column'>
            {/* Running label */}

            {/* Control Panel */}
            <Box>
              <Heading as='h4' variant='sidebar-title'>
                <Trans i18nKey='control'>Control:</Trans>
              </Heading>
              <HStack justifyContent='space-around'>
                <ActionsProvider>
                  <ActionContinue
                    variant='outline'
                    aria-label={t('process_actions.continue', { defaultValue: 'Continue' })}
                    colorScheme='green'
                  >
                    <FaPlay />
                  </ActionContinue>
                  <ActionPause
                    variant='outline'
                    aria-label={t('process_actions.pause', { defaultValue: 'Pause' })}
                    colorScheme='yellow'
                  >
                    <FaPause />
                  </ActionPause>
                  <ActionEnd
                    variant='outline'
                    aria-label={t('process_actions.end', { defaultValue: 'End' })}
                    colorScheme='orange'
                  >
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
      )}
    </Flex>
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
