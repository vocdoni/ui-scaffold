import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Progress,
  Spacer,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useClient, useOrganization } from '@vocdoni/react-providers'
import {
  AccountData,
  ArchivedAccountData,
  Census,
  CspCensus,
  Election,
  ElectionCreationSteps,
  ensure0x,
  IElectionParameters,
  IQuestion,
  MultiChoiceElection,
  PlainCensus,
  UnpublishedElection,
} from '@vocdoni/sdk'
import { addDays, parse } from 'date-fns'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuRotateCcw, LuSettings } from 'react-icons/lu'
import ReactPlayer from 'react-player'
import { createPath, generatePath, useBlocker, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAnalytics } from '~components/AnalyticsProvider'
import { useSubscription } from '~components/Auth/Subscription'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import Editor from '~components/Editor'
import { Web3Address } from '~components/Process/Census/Web3'
import { DashboardContents } from '~components/shared/Dashboard/Contents'
import { SubscriptionLockedContent } from '~components/shared/Layout/SubscriptionLockedContent'
import DeleteModal from '~components/shared/Modal/DeleteModal'
import { SubscriptionPermission } from '~constants'
import { Routes } from '~routes'
import { SetupStepIds, useOrganizationSetup } from '~src/queries/organization'
import { AnalyticsEvent } from '~utils/analytics'
import { CensusMeta, CensusTypes } from '../Census/CensusType'
import { Questions } from './MainContent'
import { CreateSidebar } from './Sidebar'
import { useProcessTemplates } from './TemplateProvider'
import { defaultProcessValues, Option, Process, SelectorTypes, TemplateConfigs, TemplateTypes } from './common'

type ConfirmOnNavigateOptions = {
  isDirty: boolean
  isSubmitting?: boolean
  isSubmitSuccessful?: boolean
  onOpen: () => void
  onClose: () => void
}

type LeaveConfirmationModalProps = {
  isOpen: boolean
  onCancel: () => void
  onLeave: () => void
  onResetSamePath: () => void
  onSaveAndLeave: () => void
  isSamePath: boolean
}

export const isAccountData = (account: AccountData | ArchivedAccountData): account is AccountData =>
  'electionIndex' in account

export const useConfirmOnNavigate = ({
  isDirty,
  isSubmitting,
  isSubmitSuccessful,
  onOpen,
  onClose,
}: ConfirmOnNavigateOptions) => {
  const shouldBlock = isDirty && !isSubmitting && !isSubmitSuccessful
  const blocker = useBlocker(shouldBlock)

  const isOpenRef = useRef(false)
  const isProceedingRef = useRef(false)

  const routerLocation = useLocation()
  const currentPath = createPath(routerLocation)
  const nextPath = blocker.location ? createPath(blocker.location) : null
  const isSamePath = nextPath === currentPath

  useEffect(() => {
    if (!shouldBlock) {
      if (isOpenRef.current) {
        isOpenRef.current = false
        onClose()
      }
      if (blocker.state === 'blocked') {
        blocker.reset()
      }
      return
    }

    if (blocker.state === 'blocked' && !isOpenRef.current && !isProceedingRef.current) {
      isOpenRef.current = true
      onOpen()
    }

    if (blocker.state === 'unblocked' && isOpenRef.current) {
      isOpenRef.current = false
      onClose()
    }
  }, [blocker.state, shouldBlock, onOpen, onClose])

  const closeAll = () => {
    isProceedingRef.current = false
    isOpenRef.current = false
    onClose()
  }

  const cancel = () => {
    closeAll()
    blocker.reset()
  }

  const proceed = () => {
    isProceedingRef.current = true
    closeAll()
    blocker.proceed()

    setTimeout(() => {
      isProceedingRef.current = false
      blocker.reset()
    }, 0)
  }

  const resetSamePath = (cb?: () => void) => {
    cb?.()
    cancel()
  }

  return { isSamePath, cancel, proceed, resetSamePath }
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

export function toBase64(input: string): string {
  const bytes = new TextEncoder().encode(input) // UTF-8
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary)
}

export const useFormDraftSaver = (
  isDirty: boolean,
  getValues: () => any,
  createProcess: { mutate: (process) => void }
) => {
  const { account } = useClient()
  const formToElectionMapper = useFormToElectionMapper()
  const [draftId, storeDraftId] = useLocalStorage('draft-id', null)

  const saveDraft = () => {
    if (!isDirty) return
    const form = getValues()
    const election = formToElectionMapper(form, new CspCensus('0x23', document.location.href))
    const draftProcessId = createProcess.mutate({
      metadata: election.generateMetadata(),
      draft: true,
      orgAddress: ensure0x(account?.address),
    })
    storeDraftId(draftProcessId)
  }

  // Save when the user accidentally closes the tab, navigates away, or refreshes the page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return
      e.preventDefault()
      e.returnValue = ''
      saveDraft()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isDirty])

  // Save on focus out on every field
  useEffect(() => {
    const handleFocusOut = () => saveDraft()

    window.addEventListener('focusout', handleFocusOut)

    return () => {
      window.removeEventListener('focusout', handleFocusOut)
    }
  }, [isDirty])

  // Save every 30 seconds if the form is dirty
  useEffect(() => {
    const interval = setInterval(() => saveDraft(), 30000)

    return () => clearInterval(interval)
  }, [isDirty])
}

const LiveStreamingInput = () => {
  const { t } = useTranslation()
  const methods = useFormContext<Process>()
  const { errors } = methods.formState
  const streamUri = methods.watch('streamUri')

  return (
    <Accordion allowToggle>
      <AccordionItem border='none'>
        <AccordionButton px={0}>
          <Box textAlign='left'>
            <Text fontSize='sm' color='texts.subtle'>
              {t('process_create.youtube.accordion_title', {
                defaultValue: 'Attach video (optional)',
              })}
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel px={0} display='flex' flexDirection='column' gap={4}>
          <SubscriptionLockedContent permissionType={SubscriptionPermission.LiveStreaming}>
            {({ isLocked }) => (
              <>
                <FormControl isInvalid={!!errors.streamUri}>
                  <FormLabel>
                    <Trans i18nKey='process_create.youtube.title'>Live streaming video</Trans>
                  </FormLabel>
                  <Controller
                    control={methods.control}
                    name='streamUri'
                    rules={{
                      pattern: {
                        value: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/).+$/,
                        message: t('form.error.invalid_youtube_url', 'Please enter a valid YouTube URL'),
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type='url'
                        placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        tabIndex={isLocked ? -1 : 0}
                      />
                    )}
                  />
                  <FormErrorMessage>{errors.streamUri?.message?.toString()}</FormErrorMessage>
                </FormControl>
                {/* Video Preview */}
                {streamUri && <ReactPlayer src={streamUri} controls />}
              </>
            )}
          </SubscriptionLockedContent>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

const TemplateButtons = () => {
  const { t } = useTranslation()
  const methods = useFormContext<Process>()
  const { activeTemplate, setActiveTemplate } = useProcessTemplates()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const reset = useSafeReset()
  const pendingTemplateRef = useRef<TemplateTypes | null>(null)

  const applyTemplate = (templateId: TemplateTypes) => {
    const config = TemplateConfigs[templateId]
    const previousFormValues = methods.getValues()
    setActiveTemplate(templateId)
    reset({
      ...previousFormValues,
      ...config,
    })
  }

  const handleTemplateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const template = e.currentTarget.dataset.template as TemplateTypes
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
      <HStack spacing={2} flexWrap='wrap'>
        <Button
          variant='outline'
          size='sm'
          data-template={TemplateTypes.AnnualGeneralMeeting}
          onClick={handleTemplateClick}
        >
          {t('process.create.template.annual_general_meeting', 'Annual General Meeting')}
        </Button>
        <Button variant='outline' size='sm' data-template={TemplateTypes.Election} onClick={handleTemplateClick}>
          {t('process.create.template.election', 'Election')}
        </Button>
        <Button
          variant='outline'
          size='sm'
          data-template={TemplateTypes.ParticipatoryBudgeting}
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

const LeaveConfirmationModal = ({
  isOpen,
  onCancel,
  onLeave,
  onResetSamePath,
  onSaveAndLeave,
  isSamePath,
}: LeaveConfirmationModalProps) => {
  const { t } = useTranslation()

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
      onClose={onCancel}
    >
      <Flex justifyContent='flex-end' mt={4} gap={2}>
        <Button variant='outline' onClick={onCancel}>
          {t('process.create.leave_confirmation.cancel', { defaultValue: 'Cancel' })}
        </Button>
        <Spacer />
        {isSamePath ? (
          <Button colorScheme='red' onClick={() => onResetSamePath()}>
            {t('process.create.leave_confirmation.reset', { defaultValue: 'Reset' })}
          </Button>
        ) : (
          <>
            <Button colorScheme='red' onClick={onLeave}>
              {t('process.create.leave_confirmation.leave', { defaultValue: 'Leave without saving' })}
            </Button>
            <Button colorScheme='black' onClick={onSaveAndLeave}>
              {t('process.create.leave_confirmation.save_and_leave', { defaultValue: 'Save and leave' })}
            </Button>
          </>
        )}
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

const useProcessBundle = () => {
  const { bearedFetch } = useAuth()
  return useMutation({
    mutationFn: async ({ censusId, processes }: { censusId: string; processes?: string[] }) => {
      return await bearedFetch<{ uri: string; root: string }>(ApiEndpoints.ProcessBundle, {
        method: 'POST',
        body: {
          censusId,
          processes,
        },
      })
    },
  })
}

const useCreateProcess = () => {
  const { bearedFetch } = useAuth()

  return useMutation({
    mutationFn: async (body) => {
      return await bearedFetch(ApiEndpoints.OrganizationProcesses, {
        method: 'POST',
        body,
      })
    },
  })
}

const useFormToElectionMapper = () => {
  const { permission } = useSubscription()

  const parseLocalDateTime = (dateStr?: string, timeStr?: string) => {
    if (!dateStr || !timeStr) return undefined

    return parse(`${dateStr} ${timeStr}`, 'yyyy-MM-dd HH:mm', new Date())
  }

  return (form: Process, census: Census): UnpublishedElection | MultiChoiceElection => {
    const start = form.autoStart ? new Date() : parseLocalDateTime(form.startDate, form.startTime)
    const startDate = form.autoStart ? undefined : parseLocalDateTime(form.startDate, form.startTime)
    const endDate = form.endDate && form.endTime ? parseLocalDateTime(form.endDate, form.endTime) : addDays(start, 1)

    let base: IElectionParameters = {
      census,
      title: form.title,
      description: form.description,
      electionType: {
        secretUntilTheEnd: Boolean(form.resultVisibility === 'hidden'),
      },
      maxCensusSize: form.addresses?.length > 0 ? form.addresses.length : form.census.size,
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
                image: { default: q.image },
              },
            })),
          }) as IQuestion
      ),
      startDate,
      endDate,
      voteType: {
        maxVoteOverwrites: 10,
      },
      streamUri: permission(SubscriptionPermission.LiveStreaming) ? form.streamUri : undefined,
      temporarySecretIdentity:
        form.censusType === CensusTypes.Spreadsheet && Boolean(form.voterPrivacy === 'anonymous'),
      meta: {
        generated: 'ui-scaffold',
        app: 'vocdoni',
        census: {
          type: form.censusType,
          fields: form.spreadsheet?.header ?? undefined,
        } as CensusMeta,
      },
    }

    if (form.questionType === SelectorTypes.Multiple) {
      return MultiChoiceElection.from({
        ...base,
        canAbstain: form.minNumberOfChoices === 0,
        maxNumberOfChoices: form.maxNumberOfChoices > 0 ? form.maxNumberOfChoices : form.questions[0].options.length,
        minNumberOfChoices: form.minNumberOfChoices ?? 0,
      })
    }

    return Election.from(base)
  }
}

export const ProcessCreate = () => {
  const { t } = useTranslation()
  const toast = useToast()
  const [formDraftLoaded, setFormDraftLoaded] = useState(false)
  const [formDraft, storeFormDraft] = useLocalStorage('form-draft', null)
  const createProcess = useCreateProcess()
  const { groupId } = useParams()
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(true)
  const methods = useForm<Process>({
    defaultValues: {
      ...defaultProcessValues,
      groupId,
    },
  })
  const reset = useSafeReset(methods.reset)
  const { activeTemplate, placeholders, setActiveTemplate } = useProcessTemplates()
  const { isOpen, onOpen: openConfirmationModal, onClose } = useDisclosure()
  const { isOpen: isResetFormModalOpen, onOpen: onResetFormModalOpen, onClose: onResetFormModalClose } = useDisclosure()
  const { organization } = useOrganization()
  const { client } = useClient()
  const { isSubmitting, isSubmitSuccessful, isDirty } = methods.formState
  const { setStepDoneAsync } = useOrganizationSetup()
  const processBundleMutation = useProcessBundle()
  const { trackPlausibleEvent } = useAnalytics()

  const formToElectionMapper = useFormToElectionMapper()

  useFormDraftSaver(isDirty, methods.getValues, createProcess)

  // Apply form draft if it exists
  useEffect(() => {
    if (formDraft) {
      Object.entries(formDraft).forEach(([key, value]) => {
        if (key === 'groupId' && groupId) return
        methods.setValue(key as keyof Process, value as Process[keyof Process], { shouldDirty: true })
      })
    }
    setFormDraftLoaded(true)
  }, [])

  // Confirm navigation if form is dirty
  const { isSamePath, cancel, proceed, resetSamePath } = useConfirmOnNavigate({
    isDirty,
    isSubmitting,
    isSubmitSuccessful,
    onOpen: openConfirmationModal,
    onClose,
  })

  const resetForm = () => {
    setActiveTemplate(null)
    reset()
    storeFormDraft(null)
    onResetFormModalClose()
  }

  const handleLeaveWithoutSaving = () => {
    storeFormDraft(null)
    reset()
    proceed()
  }

  const handleSaveAndLeave = () => {
    const form = methods.getValues()
    storeFormDraft(form)
    proceed()
  }

  const getCensus = async (form: Process, salt: string): Promise<Census> => {
    if (form.censusType === 'spreadsheet') {
      form.addresses = (await form.spreadsheet?.generateWallets(salt)) as Web3Address[]
    }
    let census = null
    switch (form.censusType) {
      case CensusTypes.CSP:
        if (!form.census?.id) {
          throw new Error(
            t('process_create.census_missing', { defaultValue: 'Census data is missing for Memberbase census type' })
          )
        }

        const nextElectionId = await client.electionService.nextElectionId(
          organization.address,
          formToElectionMapper(form, new CspCensus('0x23', document.location.href))
        )
        const bundledProcess = await processBundleMutation.mutateAsync({
          censusId: form.census?.id,
          processes: [nextElectionId],
        })
        census = new CspCensus(bundledProcess.root, bundledProcess.uri)

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
        throw new Error(
          t('process_create.census_type_not_allowed', {
            type: form.censusType,
            defaultValue: 'Census type {{type}} not allowed',
          })
        )
    }
  }

  const onSubmit = async (form: Process) => {
    try {
      const account = await client.fetchAccountInfo()
      if (!account.address) {
        throw new Error(t('process_create.no_account_address', { defaultValue: 'No account address found.' }))
      }
      if (!isAccountData(account) || isNaN(account.electionIndex)) {
        throw new Error(
          t('process_create.no_election_index', { defaultValue: 'No election index found for the account.' })
        )
      }
      const salt = await client.electionService.getElectionSalt(account.address, account.electionIndex)
      const census = await getCensus(form, salt)
      const election = formToElectionMapper(form, census)

      let electionId: string | null = null
      for await (const step of client.createElectionSteps(election)) {
        if (step.key === ElectionCreationSteps.DONE) {
          electionId = step.electionId
          break
        }
      }

      await setStepDoneAsync(SetupStepIds.firstVoteCreation)

      trackPlausibleEvent({ name: AnalyticsEvent.ProcessCreated })

      toast({
        title: t('form.process_create.success_title'),
        description: t('form.process_create.success_description'),
        status: 'success',
        duration: 4000,
      })

      methods.reset(defaultProcessValues)

      storeFormDraft(null)
      navigate(generatePath(Routes.dashboard.process, { id: electionId }))
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
    const sidebarFieldKeys = ['groupId', 'census', 'resultVisibility', 'endDate', 'endTime', 'startDate', 'startTime']

    const hasSidebarErrors = sidebarFieldKeys.some((key) => key in errors)

    if (hasSidebarErrors) {
      setShowSidebar(true)
    }
  }

  if (!formDraftLoaded) return <Progress size='xs' isIndeterminate />

  return (
    <FormProvider {...methods}>
      <DashboardContents
        as='form'
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        display='flex'
        flexDirection='row'
        position='relative'
        id='process-create'
      >
        {/* Main content area */}
        <Box
          flex={1}
          marginRight={showSidebar ? { base: 0, md: 'sidebar' } : 0}
          transition='margin-right 0.3s'
          display='flex'
          flexDirection='column'
          gap={8}
          paddingRight={4}
          paddingBottom={4}
        >
          {/* Top bar with draft status and sidebar toggle */}
          <HStack position='sticky' top='64px' p={2} bg='chakra.body.bg' zIndex='contents'>
            {formDraft && (
              <Box px={3} py={1} borderRadius='full' bg='gray.100' _dark={{ bg: 'whiteAlpha.200' }} fontSize='sm'>
                <Trans i18nKey='process.create.status.draft'>Draft</Trans>
              </Box>
            )}
            <Spacer />
            <ButtonGroup size='sm'>
              {methods.formState.isDirty && (
                <IconButton
                  aria-label={t('form.reset', { defaultValue: 'Reset form' })}
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

          {/* Title, Video, and Description */}
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
                size='2xl'
                fontWeight='bold'
                {...methods.register('title', {
                  required: t('form.error.required', 'This field is required'),
                })}
              />
              <FormErrorMessage>{methods.formState.errors.title?.message?.toString()}</FormErrorMessage>
            </FormControl>

            {/* Live streaming video URL */}
            <LiveStreamingInput />
            <Controller
              name='description'
              control={methods.control}
              render={({ field }) => (
                <Editor
                  onChange={field.onChange}
                  placeholder={
                    placeholders[activeTemplate]?.description ??
                    t('process.create.description.placeholder', 'Add a description...')
                  }
                  defaultValue={field.value}
                />
              )}
            />
          </VStack>

          <Questions />
        </Box>

        <CreateSidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
      </DashboardContents>
      <LeaveConfirmationModal
        isOpen={isOpen}
        onCancel={cancel}
        onLeave={handleLeaveWithoutSaving}
        onResetSamePath={() => resetSamePath(() => reset())}
        onSaveAndLeave={handleSaveAndLeave}
        isSamePath={isSamePath}
      />
      <ResetFormModal isOpen={isResetFormModalOpen} onClose={onResetFormModalClose} onReset={resetForm} />
    </FormProvider>
  )
}

export default ProcessCreate
