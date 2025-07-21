import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import {
  ApprovalElection,
  Election,
  ElectionCreationSteps,
  IElectionParameters,
  IQuestion,
  PlainCensus,
  UnpublishedElection,
} from '@vocdoni/sdk'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuRotateCcw, LuSettings } from 'react-icons/lu'
import { createPath, generatePath, useBlocker, useLocation, useNavigate, useParams } from 'react-router-dom'
import Editor from '~components/Editor'
import { CensusSpreadsheetManager } from '~components/Process/Census/Spreadsheet/CensusSpreadsheetManager'
import { Web3Address } from '~components/Process/Census/Web3'
import { DashboardContents } from '~components/shared/Dashboard/Contents'
import DeleteModal from '~components/shared/Modal/DeleteModal'
import { Routes } from '~routes'
import { SetupStepIds, useOrganizationSetup } from '~src/queries/organization'
import { CensusMeta } from '../Census/CensusType'
import { useProcessTemplates } from '../TemplateProvider'
import { Questions } from './MainContent/Questions'
import { CreateSidebar } from './Sidebar'
import { CensusTypes } from './Sidebar/CensusCreation'

export interface Option {
  option: string
  description?: string
  image?: string
}

type Question = {
  title: string
  description: string
  minSelections?: number
  maxSelections?: number
  options: Option[]
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
  groupId: string
  censusType: CensusTypes
  addresses?: Web3Address[]
  spreadsheet?: CensusSpreadsheetManager | undefined
}

export enum QuestionTypes {
  Single = 'single',
  Multiple = 'multiple',
  ParticipatoryBudgeting = 'participatory_budgeting',
}

enum TemplateIds {
  AnnualGeneralMeeting = 'annual_general_meeting',
  Election = 'election',
  ParticipatoryBudgeting = 'participatory_budgeting',
}

export type DefaultQuestionsType = Record<QuestionTypes, Question>

export const DefaultQuestions: DefaultQuestionsType = {
  [QuestionTypes.Single]: {
    title: '',
    description: '',
    options: [{ option: '' }, { option: '' }],
  },
  [QuestionTypes.Multiple]: {
    title: '',
    description: '',
    minSelections: 1,
    maxSelections: 1,
    options: [{ option: '' }, { option: '' }],
  },
  [QuestionTypes.ParticipatoryBudgeting]: {
    title: '',
    description: '',
    options: [
      { option: '', description: '' },
      { option: '', description: '' },
    ],
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
  resultVisibility: 'hidden',
  voterPrivacy: 'public',
  voteOverwrite: false,
  maxVoteOverwrites: 0,
  groupId: '',
  censusType: CensusTypes.Memberbase,
  addresses: [],
  spreadsheet: undefined,
}

type TemplateConfig = {
  questions: Process['questions']
  questionType: QuestionTypes
}

const TemplateConfigs: Record<TemplateIds, TemplateConfig> = {
  [TemplateIds.AnnualGeneralMeeting]: {
    questionType: QuestionTypes.Single,
    questions: [
      { title: '', description: '', options: [{ option: '' }, { option: '' }] },
      { title: '', description: '', options: [{ option: '' }, { option: '' }] },
      { title: '', description: '', options: [{ option: '' }, { option: '' }] },
    ],
  },
  [TemplateIds.Election]: {
    questionType: QuestionTypes.Multiple,
    questions: [
      {
        title: '',
        description: '',
        minSelections: 1,
        maxSelections: 3,
        options: [{ option: '' }, { option: '' }, { option: '' }],
      },
    ],
  },
  [TemplateIds.ParticipatoryBudgeting]: {
    questionType: QuestionTypes.ParticipatoryBudgeting,
    questions: [
      {
        title: '',
        description: '',
        options: [
          { option: '', description: '' },
          { option: '', description: '' },
          { option: '', description: '' },
        ],
      },
    ],
  },
}

export const useSafeReset = (externalReset?) => {
  const { groupId } = useParams()
  let contextReset

  try {
    contextReset = useFormContext().reset
  } catch (err) {
    // If useFormContext fails, it means we are not in a FormProvider context so we use the external reset
  }

  return useCallback(
    (overrides: Partial<Process> = {}) => {
      const resetFn = externalReset ?? contextReset

      if (!resetFn) return

      resetFn({
        ...defaultProcessValues,
        ...overrides,
        groupId: groupId ?? '',
      })
    },
    [externalReset, contextReset, groupId]
  )
}

const electionFromForm = (form) => {
  // max census size is calculated by the SDK when creating a process, but we need it to
  // calculate the cost preview... so here we set it for all cases anyway
  const maxCensusSize = 1

  return {
    ...form,
    electionType: {
      anonymous: Boolean(form.voterPrivacy === 'anonymous'),
      secretUntilTheEnd: Boolean(form.resultVisibility === 'hidden'),
    },
    maxCensusSize: form.spreadsheet?.data.length ?? form.addresses.length ?? maxCensusSize,
    // map questions back to IQuestion[]
    questions: form.questions.map(
      (question) =>
        ({
          title: { default: question.title },
          description: { default: question.description },
          choices: question.options.map((q: Option, i: number) => ({
            title: { default: q.option },
            value: i,
            meta: {
              description: q.description,
              image: {
                default: q.image,
              },
            },
          })),
        }) as IQuestion
    ),
    startDate: form.autoStart ? undefined : new Date(`${form.startDate}T${form.startTime}`).getTime(),
    endDate: new Date(`${form.endDate}T${form.endTime}`).getTime(),
    voteType: {
      maxVoteOverwrites: Number(form.maxVoteOverwrites),
    },
    temporarySecretIdentity: form.censusType === CensusTypes.Spreadsheet && Boolean(form.voterPrivacy === 'anonymous'),
    meta: {
      generated: 'ui-scaffold',
      app: 'vocdoni',
      census: {
        type: form.censusType,
        fields: form.spreadsheet?.header ?? undefined,
      } as CensusMeta,
    },
  }
}

const TemplateButtons = () => {
  const { t } = useTranslation()
  const methods = useFormContext<Process>()
  const { activeTemplate, setActiveTemplate } = useProcessTemplates()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const reset = useSafeReset()
  const pendingTemplateRef = useRef<TemplateIds | null>(null)

  const applyTemplate = (templateId: TemplateIds) => {
    const config = TemplateConfigs[templateId]
    setActiveTemplate(templateId)
    reset({
      autoStart: true,
      questionType: config.questionType,
      questions: config.questions,
    })
  }

  const handleTemplateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const template = e.currentTarget.dataset.template as TemplateIds
    if (!template) return

    if (activeTemplate === template) {
      onClose()
      return
    }

    if (!methods.formState.isDirty) {
      applyTemplate(template)
    } else {
      pendingTemplateRef.current = template
      onOpen()
    }
  }

  const handleConfirm = () => {
    if (pendingTemplateRef.current) {
      applyTemplate(pendingTemplateRef.current)
      pendingTemplateRef.current = null
    }
    onClose()
  }

  const handleCancel = () => {
    pendingTemplateRef.current = null
    onClose()
  }

  return (
    <>
      <Text fontSize='sm' color='texts.subtle'>
        {t('process.create.template.title', { defaultValue: 'Get started with a template...' })}
      </Text>
      <HStack spacing={2}>
        <Button
          variant='outline'
          size='sm'
          data-template={TemplateIds.AnnualGeneralMeeting}
          onClick={handleTemplateClick}
        >
          {t('process.create.template.annual_general_meeting', 'Annual General Meeting')}
        </Button>
        <Button variant='outline' size='sm' data-template={TemplateIds.Election} onClick={handleTemplateClick}>
          {t('process.create.template.election', 'Election')}
        </Button>
        <Button
          variant='outline'
          size='sm'
          data-template={TemplateIds.ParticipatoryBudgeting}
          onClick={handleTemplateClick}
        >
          {t('process.create.template.participatory_budgeting', 'Participatory Budgeting')}
        </Button>
      </HStack>

      <DeleteModal
        title={t('process.create.change_template.title', 'Change Template')}
        subtitle={t('process.create.change_template.message', {
          defaultValue: 'You have unsaved changes. Are you sure you want to switch templates?',
        })}
        isOpen={isOpen}
        onClose={handleCancel}
      >
        <Flex justifyContent='flex-end' mt={4} gap={2}>
          <Button variant='outline' onClick={handleCancel}>
            {t('process.create.change_template.cancel', 'Cancel')}
          </Button>
          <Button colorScheme='red' onClick={handleConfirm}>
            {t('process.create.change_template.change', 'Change Template')}
          </Button>
        </Flex>
      </DeleteModal>
    </>
  )
}

const LeaveConfirmationModal = ({ blocker, isOpen, onClose, ...modalProps }) => {
  const { t } = useTranslation()
  const reset = useSafeReset()
  const location = useLocation()

  const currentPath = createPath(location)
  const nextPath = blocker?.location ? createPath(blocker.location) : null
  const isSamePath = currentPath === nextPath

  const onCloseHandler = () => {
    blocker.reset()
    onClose()
  }

  const onLeave = () => {
    if (!blocker?.location) {
      blocker.reset()
      onClose()
      return
    }

    if (isSamePath) {
      reset()
      blocker.reset()
      onClose()
      return
    }

    if (blocker.state === 'blocked') {
      blocker.proceed()
    } else {
      blocker.reset()
    }
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
        <Button variant='outline' onClick={onCloseHandler}>
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

const ResetFormModal = ({ isOpen, onClose, onReset }) => {
  const { t } = useTranslation()

  return (
    <DeleteModal
      title={t('process.create.reset_form.title', { defaultValue: 'Reset Form' })}
      subtitle={t('process.create.reset_form.message', {
        defaultValue: 'Are you sure you want to reset the form? This action cannot be undone.',
      })}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Flex justifyContent='flex-end' mt={4} gap={2}>
        <Button variant='outline' onClick={onClose}>
          {t('process.create.reset_form.cancel', { defaultValue: 'Cancel' })}
        </Button>
        <Button colorScheme='red' onClick={onReset}>
          {t('process.create.reset_form.reset', { defaultValue: 'Reset Form' })}
        </Button>
      </Flex>
    </DeleteModal>
  )
}

export const ProcessCreate = () => {
  const { t } = useTranslation()
  const toast = useToast()
  const { groupId } = useParams()
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(true)
  const methods = useForm({
    defaultValues: {
      ...defaultProcessValues,
      groupId,
    },
  })
  const reset = useSafeReset(methods.reset)
  const { activeTemplate, placeholders, setActiveTemplate } = useProcessTemplates()
  const { isOpen, onOpen: openConfirmationModal, onClose } = useDisclosure()
  const { isOpen: isResetFormModalOpen, onOpen: onResetFormModalOpen, onClose: onResetFormModalClose } = useDisclosure()
  const sidebarMargin = useBreakpointValue({ base: 0, md: '350px' })
  const blocker = useBlocker(methods.formState.isDirty)
  const { client, account, fetchAccount } = useClient()
  const { setStepDoneAsync } = useOrganizationSetup()
  const { isSubmitting, isSubmitSuccessful } = methods.formState
  const description = methods.watch('description')

  // IMPORTANT: We need to ensure the electionIndex is updated before creating an election.
  useEffect(() => {
    ;(async () => {
      await fetchAccount()
    })()
  }, [])

  // Trigger confirmation modal when form is dirty and user tries to navigate away
  useEffect(() => {
    if (blocker.state !== 'blocked') return

    if (isSubmitting || isSubmitSuccessful) {
      blocker.proceed()
      return
    }

    openConfirmationModal()
  }, [blocker.state, isSubmitting, isSubmitSuccessful])

  const resetForm = () => {
    setActiveTemplate(null)
    reset()
    onResetFormModalClose()
  }

  const getCensus = async (form: Process, salt: string) => {
    if (form.censusType === 'spreadsheet') {
      form.addresses = (await form.spreadsheet?.generateWallets(salt)) as Web3Address[]
    }
    let census = null
    switch (form.censusType) {
      case CensusTypes.Memberbase:
        census = new PlainCensus()
        const addresses = '0x9b1e78c120dbe9B919397852D0B3d4D851b1cd7e'
        census.add(addresses)

        return census
      case CensusTypes.Spreadsheet:
      case CensusTypes.Web3:
        census = new PlainCensus()
        if (form.addresses && form.addresses.length > 0) {
          form.addresses.forEach(({ address }) => {
            if (address) census.add(address)
          })
        }

        return census
      default:
        throw new Error(`census type ${form.censusType} is not allowed`)
    }
  }

  const onSubmit = async (form) => {
    try {
      if (!account.address) {
        throw new Error('No account address found.')
      }
      if (isNaN(account.electionIndex)) {
        throw new Error('No election index found for the account.')
      }
      const salt = await client.electionService.getElectionSalt(account.address, account.electionIndex)
      const census = await getCensus(form, salt)
      const params: IElectionParameters = {
        ...electionFromForm(form),
        census,
      }

      let election: UnpublishedElection
      switch (form.questionType) {
        case QuestionTypes.ParticipatoryBudgeting:
        case QuestionTypes.Multiple:
          election = ApprovalElection.from(params)
          break
        case QuestionTypes.Single:
        default:
          election = Election.from(params)
      }

      let electionId: string | null = null

      for await (const step of client.createElectionSteps(election)) {
        switch (step.key) {
          case ElectionCreationSteps.DONE:
            electionId = step.electionId
        }
      }

      await setStepDoneAsync(SetupStepIds.firstVoteCreation)

      toast({
        title: t('form.process_create.success_title'),
        description: t('form.process_create.success_description'),
        status: 'success',
        duration: 4000,
      })

      methods.reset(defaultProcessValues)

      navigate(
        generatePath(Routes.dashboard.process, {
          id: electionId,
        })
      )
    } catch (error) {
      console.error('Error creating election:', error)
      toast({
        title: t('form.process_create.error_title', { defaultValue: 'Error creating process' }),
        description: error instanceof Error ? error.message : String(error),
        status: 'error',
        duration: 4000,
      })
    }
  }

  const onError = (errors) => {
    const sidebarFieldKeys = [
      'groupId',
      'resultVisibility',
      'voterPrivacy',
      'voteOverwrite',
      'maxVoteOverwrites',
      'endDate',
      'endTime',
      'startDate',
      'startTime',
    ]

    const hasSidebarErrors = sidebarFieldKeys.some((key) => key in errors)

    if (hasSidebarErrors) {
      setShowSidebar(true)
    }
  }

  return (
    <FormProvider {...methods}>
      <DashboardContents
        as='form'
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        display='flex'
        flexDirection='row'
        position='relative'
      >
        {/* Main content area */}
        <Box
          flex={1}
          marginRight={showSidebar ? sidebarMargin : 0}
          transition='margin-right 0.3s'
          display='flex'
          flexDirection='column'
          gap={8}
          paddingRight={4}
          paddingBottom={4}
        >
          {/* Top bar with draft status and sidebar toggle */}
          <HStack
            position='sticky'
            top='64px'
            p={2}
            bg='chakra.body.bg'
            zIndex='contents'
            justifyContent='space-between'
          >
            <Box px={3} py={1} borderRadius='full' bg='gray.100' _dark={{ bg: 'whiteAlpha.200' }} fontSize='sm'>
              <Trans i18nKey='process.create.status.draft'>Draft</Trans>
            </Box>
            <ButtonGroup size='sm'>
              {methods.formState.isDirty && (
                <IconButton
                  aria-label='Reset form'
                  icon={<Icon as={LuRotateCcw} />}
                  variant='outline'
                  onClick={onResetFormModalOpen}
                />
              )}
              <IconButton
                aria-label={t('dashboard.actions.toggle_sidebar', {
                  defaultValue: 'Toggle sidebar',
                })}
                icon={<Icon as={LuSettings} />}
                variant='outline'
                onClick={() => setShowSidebar((prev) => !prev)}
              />
              <Button type='submit' colorScheme='black' alignSelf='flex-end' isLoading={methods.formState.isSubmitting}>
                <Trans i18nKey='process.create.action.publish'>Publish</Trans>
              </Button>
            </ButtonGroup>
          </HStack>

          {/* Title and Description */}
          <VStack as='header' align='stretch' spacing={4}>
            <TemplateButtons />
            <FormControl isInvalid={!!methods.formState.errors.title}>
              <Input
                px={0}
                variant='unstyled'
                placeholder={
                  placeholders[activeTemplate]?.title ??
                  t('process.create.description.title', {
                    defaultValue: 'Voting Process Title',
                  })
                }
                _placeholder={{ fontSize: '2xl' }}
                fontSize='2xl'
                fontWeight='bold'
                {...methods.register('title', {
                  required: t('form.error.required', 'This field is required'),
                })}
              />
              <FormErrorMessage>{methods.formState.errors.title?.message?.toString()}</FormErrorMessage>
            </FormControl>
            <Editor
              onChange={(text: string) => methods.setValue('description', text)}
              placeholder={
                placeholders[activeTemplate]?.description ??
                t('process.create.description.placeholder', 'Add a description...')
              }
              defaultValue={description}
            />
          </VStack>

          <Questions />
        </Box>

        <CreateSidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
      </DashboardContents>
      <LeaveConfirmationModal blocker={blocker} isOpen={isOpen} onClose={onClose} />
      <ResetFormModal isOpen={isResetFormModalOpen} onClose={onResetFormModalClose} onReset={resetForm} />
    </FormProvider>
  )
}

export default ProcessCreate
