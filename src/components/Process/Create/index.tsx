import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuSettings } from 'react-icons/lu'
import { createPath, useBlocker, useLocation } from 'react-router-dom'
import { DashboardContents } from '~components/shared/Dashboard/Contents'
import DeleteModal from '~components/shared/Modal/DeleteModal'
import { useProcessTemplates } from '../TemplateProvider'
import { Questions } from './MainContent/Questions'
import { CreateSidebar } from './Sidebar'

type Question = {
  title: string
  description: string
  minSelections?: number
  maxSelections?: number
  options: { text: string }[]
}

export type Process = {
  title: string
  description: string
  autoStart: boolean
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  questionType: QuestionTypes
  questions: Question[]
  resultVisibility: 'live' | 'hidden'
  voterPrivacy: 'anonymous' | 'public'
  voteOverwrite: boolean
  maxVoteOverwrites: number
  group: string
}

export enum QuestionTypes {
  Single = 'single',
  Multiple = 'multiple',
}

export type DefaultQuestionsType = Record<QuestionTypes, Question>

export const DefaultQuestions: DefaultQuestionsType = {
  [QuestionTypes.Single]: {
    title: '',
    description: '',
    options: [{ text: '' }, { text: '' }],
  },
  [QuestionTypes.Multiple]: {
    title: '',
    description: '',
    minSelections: 1,
    maxSelections: 1,
    options: [{ text: '' }, { text: '' }],
  },
}

const defaultProcessValues: Process = {
  title: '',
  description: '',
  autoStart: true,
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  questionType: QuestionTypes.Single,
  questions: [DefaultQuestions[QuestionTypes.Single]],
  resultVisibility: 'live',
  voterPrivacy: 'anonymous',
  voteOverwrite: false,
  maxVoteOverwrites: 0,
  group: '',
}

const TemplateButtons = () => {
  const { t } = useTranslation()
  const methods = useFormContext<Process>()
  const { setActiveTemplate } = useProcessTemplates()

  const annualGeneralMeetingTemplate = () => {
    setActiveTemplate('annual_general_meeting')
    methods.reset({
      autoStart: true,
      questionType: QuestionTypes.Single,
      questions: [
        { options: [{ text: '' }, { text: '' }] },
        { options: [{ text: '' }, { text: '' }] },
        { options: [{ text: '' }, { text: '' }] },
      ],
    })
  }

  const electionTemplate = () => {
    setActiveTemplate('election')
    methods.reset({
      autoStart: true,
      questionType: QuestionTypes.Multiple,
      questions: [
        {
          minSelections: 1,
          maxSelections: 3,
          options: [{ text: '' }, { text: '' }, { text: '' }],
        },
      ],
    })
  }

  return (
    <>
      <Text fontSize='sm' color='texts.subtle'>
        {t('process.create.template.title', { defaultValue: 'Get started with a template...' })}
      </Text>
      <HStack spacing={2} alignItems='center'>
        <Button variant='outline' size='sm' onClick={annualGeneralMeetingTemplate}>
          {t('process.create.template.annual_general_meeting', 'Annual General Meeting')}
        </Button>
        <Button variant='outline' size='sm' onClick={electionTemplate}>
          {t('process.create.template.election', 'Election')}
        </Button>
      </HStack>
    </>
  )
}

const LeaveConfirmationModal = ({ blocker, isOpen, onClose, ...modalProps }) => {
  const { t } = useTranslation()
  const methods = useFormContext()
  const location = useLocation()

  const currentPath = createPath(location)
  const nextPath = blocker?.location ? createPath(blocker.location) : null
  const isSamePath = currentPath === nextPath

  const onLeave = () => {
    if (!blocker || !blocker.location) {
      onClose()
      return
    }

    if (isSamePath) {
      methods.reset(defaultProcessValues)
      onClose()
      return
    }

    blocker.proceed()
  }

  return (
    <DeleteModal
      title={t('process.create.leave_confirmation.title', { defaultValue: 'Unsaved Changes' })}
      subtitle={
        isSamePath
          ? t('process.create.leave_confirmation.reset_message', {
              defaultValue: 'This will reset the form. Do you want to continue?',
            })
          : t('process.create.leave_confirmation.message', {
              defaultValue: 'You have unsaved changes. Are you sure you want to leave?',
            })
      }
      isOpen={isOpen}
      onClose={onClose}
      {...modalProps}
    >
      <Flex justifyContent='flex-end' mt={4} gap={2}>
        <Button variant='outline' onClick={onClose}>
          {t('process.create.leave_confirmation.cancel', { defaultValue: 'Cancel' })}
        </Button>
        <Button colorScheme='red' onClick={onLeave}>
          {isSamePath
            ? t('process.create.leave_confirmation.reset', { defaultValue: 'Reset' })
            : t('process.create.leave_confirmation.leave', { defaultValue: 'Leave without saving' })}
        </Button>
      </Flex>
    </DeleteModal>
  )
}

export const ProcessCreate = () => {
  const { t } = useTranslation()
  const [showSidebar, setShowSidebar] = useState(true)
  const methods = useForm({ defaultValues: defaultProcessValues })
  const { activeTemplate, placeholders } = useProcessTemplates()
  const { isOpen, onOpen: openConfirmationModal, onClose } = useDisclosure()

  const blocker = useBlocker(methods.formState.isDirty)

  // Trigger confirmation modal when form is dirty and user tries to navigate away
  useEffect(() => {
    if (blocker.state === 'blocked') openConfirmationModal()
  }, [blocker])

  const onSubmit = (data: Process) => {
    console.log('Form data:', data)
  }

  return (
    <FormProvider {...methods}>
      <DashboardContents
        as='form'
        onSubmit={methods.handleSubmit(onSubmit)}
        display='flex'
        flexDirection='row'
        position='relative'
      >
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
          {/* Top bar with draft status and sidebar toggle */}
          <HStack justifyContent='space-between'>
            <Box px={3} py={1} borderRadius='full' bg='gray.100' _dark={{ bg: 'whiteAlpha.200' }} fontSize='sm'>
              <Trans i18nKey='process.create.status.draft'>Draft</Trans>
            </Box>
            <ButtonGroup size='sm'>
              <IconButton
                aria-label={t('dashboard.actions.toggle_sidebar', {
                  defaultValue: 'Toggle sidebar',
                })}
                icon={<Icon as={LuSettings} />}
                variant='outline'
                onClick={() => setShowSidebar((prev) => !prev)}
              />
              <Button type='submit' colorScheme='black' alignSelf='flex-end'>
                <Trans i18nKey='process.create.action.publish'>Publish</Trans>
              </Button>
            </ButtonGroup>
          </HStack>

          {/* Title and Description */}
          <VStack as='header' align='stretch' spacing={4}>
            <TemplateButtons />
            <Input
              px={0}
              variant='unstyled'
              placeholder={
                placeholders[activeTemplate]?.title ??
                t('process.create.description.title', {
                  defaultValue: 'Voting Process Title',
                })
              }
              fontSize='2xl'
              fontWeight='bold'
              {...methods.register('title')}
            />
            <Textarea
              variant='unstyled'
              placeholder={
                placeholders[activeTemplate]?.description ??
                t('process.create.description.placeholder', 'Add a description...')
              }
              resize='none'
              minH='100px'
              {...methods.register('description')}
            />
          </VStack>

          <Questions />
        </Box>

        <CreateSidebar show={showSidebar} />
      </DashboardContents>
      <LeaveConfirmationModal blocker={blocker} isOpen={isOpen} onClose={onClose} />
    </FormProvider>
  )
}

export default ProcessCreate
