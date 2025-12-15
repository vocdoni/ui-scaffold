import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
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
  Spinner,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
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
import { addDays, formatDistanceToNow, parse } from 'date-fns'
import { ca as caLocale, enUS as enLocale, es as esLocale } from 'date-fns/locale'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuCheck, LuInfo, LuRotateCcw, LuSettings, LuSparkles, LuX } from 'react-icons/lu'
import ReactPlayer from 'react-player'
import {
  createPath,
  generatePath,
  useBlocker,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { useAnalytics } from '~components/AnalyticsProvider'
import { useSubscription } from '~components/Auth/Subscription'
import { ApiEndpoints, ApiError, ErrorCode } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import Editor from '~components/Editor'
import { Web3Address } from '~components/Process/Census/Web3'
import { DashboardContents } from '~components/shared/Dashboard/Contents'
import { SubscriptionLockedContent } from '~components/shared/Layout/SubscriptionLockedContent'
import DeleteModal from '~components/shared/Modal/DeleteModal'
import { SubscriptionPermission } from '~constants'
import { useDeleteDraft } from '~elements/dashboard/processes/drafts'
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
  saveStatus?: 'saving' | 'saved' | 'error' | 'idle'
  lastSaveTime?: Date | null
  onOpen: () => void
  onClose: () => void
}

type LeaveConfirmationModalProps = {
  isOpen: boolean
  onCancel: () => void
  onSaveAndLeave: () => void
  onLeave: () => void
  onResetSamePath: () => void
  isSamePath: boolean
  saveStatus: 'saving' | 'saved' | 'error' | 'idle'
  lastSaveTime: Date | null
}

type CreateProcessRequest = {
  metadata: Process
  orgAddress: string
}

type UpdateProcessRequest = {
  processId: string
  body: CreateProcessRequest
}

export const saveTimeoutMs = 30000

export const isAccountData = (account: AccountData | ArchivedAccountData): account is AccountData =>
  'electionIndex' in account

export const useConfirmOnNavigate = ({
  isDirty,
  isSubmitting,
  isSubmitSuccessful,
  saveStatus,
  lastSaveTime,
  onOpen,
  onClose,
}: ConfirmOnNavigateOptions) => {
  const [snoozeUntil, setSnoozeUntil] = useState<number | null>(null)
  const isSnoozed = snoozeUntil !== null && Date.now() < snoozeUntil

  // Don't block if auto-saved within last 5 seconds
  const isRecentlySaved = saveStatus === 'saved' && lastSaveTime && Date.now() - lastSaveTime.getTime() < 5000

  const shouldBlock = useCallback(() => {
    if (!isDirty || isSubmitting || isSubmitSuccessful || isSnoozed) return false
    if (saveStatus === 'saved' && lastSaveTime && Date.now() - lastSaveTime.getTime() < 5000) return false
    return true
  }, [isDirty, isSubmitting, isSubmitSuccessful, isSnoozed, saveStatus, lastSaveTime])

  const blocker = useBlocker(shouldBlock)

  const isOpenRef = useRef(false)
  const isProceedingRef = useRef(false)

  const { pathname: currentPath } = useLocation()
  const nextPath = blocker.location ? createPath(blocker.location) : null
  const isSamePath = nextPath === null || nextPath === currentPath

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

  // Reset snooze when time is up
  useEffect(() => {
    if (snoozeUntil === null) return

    const msLeft = Math.max(0, snoozeUntil - Date.now())
    const id = setTimeout(() => setSnoozeUntil(null), msLeft)
    return () => clearTimeout(id)
  }, [snoozeUntil])

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

  const saveCooldown = (ms: number) => {
    setSnoozeUntil(Date.now() + Math.max(0, ms))
  }

  return { isSamePath, cancel, proceed, resetSamePath, saveCooldown }
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

      resetFn(
        {
          ...defaultProcessValues,
          ...overrides,
          groupId: groupId ?? '',
        },
        {
          keepDefaultValues: false,
          keepErrors: false,
        }
      )
    },
    [externalReset, contextReset, groupId]
  )
}

export const useFormDraftSaver = (
  isDirty: boolean,
  getValues: () => any,
  draftId: string | null,
  storeDraftId: (id: string | null) => void,
  saveCooldown?: (ms: number) => void,
  setSaveStatus?: (status: 'saving' | 'saved' | 'error' | 'idle') => void,
  setLastSaveTime?: (time: Date | null) => void
) => {
  const { account } = useClient()
  const createProcess = useCreateProcess()
  const updateProcess = useUpdateProcess()
  const skipNextSaveRef = useRef(false)
  const [draftLimitReached, setDraftLimitReached] = useState(false)
  const [internalLastSaveTime, setInternalLastSaveTime] = useState<Date | null>(null)
  const [internalSaveStatus, setInternalSaveStatus] = useState<'saving' | 'saved' | 'error' | 'idle'>('idle')

  // Use external state setters if provided, otherwise use internal state
  const updateSaveStatus = setSaveStatus || setInternalSaveStatus
  const updateLastSaveTime = setLastSaveTime || setInternalLastSaveTime

  const isCreating = createProcess.isPending
  const isUpdating = updateProcess.isPending
  const isSaving = isCreating || isUpdating

  const skipSave = (skip) => {
    skipNextSaveRef.current = skip
  }

  const saveDraft = useCallback(
    async (isAutoSave = true) => {
      if (!isDirty || skipNextSaveRef.current) return 'skipped'
      // Prevent repeated auto-save attempts once the draft limit is reached
      if (isAutoSave && draftLimitReached) return 'limit-reached'

      try {
        updateSaveStatus('saving')
        const form = getValues()
        if (draftId) {
          await updateProcess.mutateAsync({
            processId: draftId,
            body: { metadata: form, orgAddress: ensure0x(account?.address) },
          })
        } else {
          const draftProcessId = await createProcess.mutateAsync({
            metadata: form,
            orgAddress: ensure0x(account?.address),
          })
          storeDraftId(draftProcessId)
        }
        saveCooldown?.(saveTimeoutMs)
        setDraftLimitReached(false)
        updateLastSaveTime(new Date())
        updateSaveStatus('saved')
        return 'saved'
      } catch (e) {
        // Check if it's a draft limit error
        if (e instanceof ApiError && e.apiError?.code === ErrorCode.DraftLimitReached) {
          setDraftLimitReached(true)
          updateSaveStatus('error')
          // Silently fail for auto-save, throw for manual save
          if (isAutoSave) {
            return 'limit-reached'
          }
          throw e
        }
        // For other errors, only log in auto-save mode
        if (isAutoSave) {
          console.error('Failed to save draft:', e)
          updateSaveStatus('error')
          return 'error'
        }
        updateSaveStatus('error')
        throw e
      }
    },
    [
      isDirty,
      draftLimitReached,
      getValues,
      draftId,
      account?.address,
      updateProcess,
      createProcess,
      storeDraftId,
      saveCooldown,
      updateSaveStatus,
      updateLastSaveTime,
    ]
  )

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return
      e.preventDefault()
      e.returnValue = ''
      saveDraft(true)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty, saveDraft])

  useEffect(() => {
    const handleFocusOut = () => {
      saveDraft(true)
    }
    window.addEventListener('focusout', handleFocusOut)
    return () => window.removeEventListener('focusout', handleFocusOut)
  }, [saveDraft])

  useEffect(() => {
    const id = setInterval(() => {
      saveDraft(true)
    }, saveTimeoutMs)
    return () => clearInterval(id)
  }, [saveDraft])

  return {
    saveDraft,
    isSaving,
    skipSave,
    draftLimitReached,
    saveStatus: internalSaveStatus,
    lastSaveTime: internalLastSaveTime,
  }
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

  // Collapsible state - start collapsed, user can expand
  const [showTemplates, setShowTemplates] = useState(false)

  const applyTemplate = (templateId: TemplateTypes) => {
    const config = TemplateConfigs[templateId]
    const previousFormValues = methods.getValues()

    // Save current scroll position
    const scrollY = window.scrollY

    // Collapse templates before applying to prevent scroll issues
    setShowTemplates(false)

    // Use requestAnimationFrame to ensure the collapse happens before form updates
    requestAnimationFrame(() => {
      setActiveTemplate(templateId)
      reset({
        ...previousFormValues,
        ...config,
      })

      // Restore scroll position immediately after reset to prevent jump
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY)
      })
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

  const getTemplateLabel = (template: TemplateTypes) => {
    switch (template) {
      case TemplateTypes.AnnualGeneralMeeting:
        return t('process.create.template.annual_general_meeting', 'Annual General Meeting')
      case TemplateTypes.Election:
        return t('process.create.template.election', 'Election')
      case TemplateTypes.ParticipatoryBudgeting:
        return t('process.create.template.participatory_budgeting', 'Participatory Budgeting')
      default:
        return template
    }
  }

  return (
    <>
      {showTemplates ? (
        <VStack
          align='stretch'
          spacing={4}
          p={4}
          borderWidth='1px'
          borderColor='blue.200'
          borderRadius='md'
          bg='blue.50'
          _dark={{ bg: 'blue.900', borderColor: 'blue.700' }}
          boxShadow='0 1px 3px rgba(0, 0, 0, 0.05)'
        >
          <HStack justify='space-between'>
            <VStack align='start' spacing={1}>
              <Text fontSize='sm' fontWeight='semibold' color='blue.900' _dark={{ color: 'blue.100' }}>
                {t('process.create.template.quick_start', 'Quick Start Templates')}
              </Text>
              <Text fontSize='xs' color='blue.700' _dark={{ color: 'blue.300' }}>
                {t('process.create.template.subtitle', 'Choose a template to get started faster')}
              </Text>
            </VStack>
            <IconButton
              icon={<Icon as={LuX} />}
              size='xs'
              variant='ghost'
              aria-label={t('process.create.template.dismiss', 'Dismiss templates')}
              onClick={() => setShowTemplates(false)}
            />
          </HStack>
          <HStack spacing={3} flexWrap='wrap'>
            {Object.values(TemplateTypes).map((template) => (
              <Button
                key={template}
                variant={activeTemplate === template ? 'solid' : 'outline'}
                colorScheme='blue'
                size='sm'
                data-template={template}
                onClick={handleTemplateClick}
                leftIcon={activeTemplate === template ? <Icon as={LuCheck} /> : undefined}
              >
                {getTemplateLabel(template)}
              </Button>
            ))}
          </HStack>
        </VStack>
      ) : (
        <Button variant='link' size='sm' leftIcon={<Icon as={LuSparkles} />} onClick={() => setShowTemplates(true)}>
          {t('process.create.template.browse', 'Browse templates')}
        </Button>
      )}

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
  saveStatus,
  lastSaveTime,
}: LeaveConfirmationModalProps) => {
  const { t, i18n } = useTranslation()

  const getDateFnsLocale = () => {
    switch (i18n.language) {
      case 'ca':
        return caLocale
      case 'es':
        return esLocale
      case 'en':
      default:
        return enLocale
    }
  }

  const isSaved = saveStatus === 'saved'

  const getTitle = () => {
    if (isSamePath) {
      return t('process.create.leave_confirmation.title', { defaultValue: 'Unsaved Changes' })
    }
    return isSaved
      ? t('process.create.leave_confirmation.title_saved', { defaultValue: 'Leave this page?' })
      : t('process.create.leave_confirmation.title_unsaved', { defaultValue: 'You have unsaved changes' })
  }

  const getSubtitle = () => {
    if (isSamePath) {
      return t('process.create.leave_confirmation.reset_message', {
        defaultValue: 'This will reset the form. Do you want to continue?',
      })
    }

    if (isSaved && lastSaveTime) {
      return t('process.create.leave_confirmation.message_saved', {
        defaultValue: 'Your changes were auto-saved {{time}}. You can safely leave this page.',
        time: formatDistanceToNow(lastSaveTime, { addSuffix: true, locale: getDateFnsLocale() }),
      })
    }

    return t('process.create.leave_confirmation.message_unsaved', {
      defaultValue: "Your changes haven't been saved yet. Do you want to save before leaving?",
    })
  }

  return (
    <DeleteModal title={getTitle()} subtitle={getSubtitle()} isOpen={isOpen} onClose={onCancel}>
      <Flex justifyContent='flex-end' mt={4} gap={2}>
        <Button variant='outline' onClick={onCancel}>
          {t('process.create.leave_confirmation.stay', { defaultValue: 'Stay' })}
        </Button>
        <Spacer />
        {isSamePath ? (
          <Button colorScheme='red' onClick={() => onResetSamePath()}>
            {t('process.create.leave_confirmation.reset', { defaultValue: 'Reset' })}
          </Button>
        ) : (
          <>
            {!isSaved && (
              <Button colorScheme='black' onClick={onSaveAndLeave}>
                {t('process.create.leave_confirmation.save_and_leave', { defaultValue: 'Save & Leave' })}
              </Button>
            )}
            <Button variant={isSaved ? 'solid' : 'outline'} colorScheme={isSaved ? 'black' : 'red'} onClick={onLeave}>
              {isSaved
                ? t('process.create.leave_confirmation.leave_saved', { defaultValue: 'Leave' })
                : t('process.create.leave_confirmation.leave_unsaved', { defaultValue: 'Leave without saving' })}
            </Button>
          </>
        )}
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

export const useCreateProcess = () => {
  const { bearedFetch } = useAuth()

  return useMutation<string, Error, CreateProcessRequest>({
    mutationFn: async (body) => {
      return await bearedFetch(ApiEndpoints.OrganizationProcesses, {
        method: 'POST',
        body,
      })
    },
  })
}

const useUpdateProcess = () => {
  const { bearedFetch } = useAuth()
  return useMutation<void, Error, UpdateProcessRequest>({
    mutationFn: async ({ processId, body }) => {
      return await bearedFetch(ApiEndpoints.OrganizationProcess.replace('{processId}', processId), {
        method: 'PUT',
        body,
      })
    },
  })
}

export const useFormToElectionMapper = () => {
  const { permission } = useSubscription()

  const parseLocalDateTime = (dateStr?: string, timeStr?: string) => {
    if (!dateStr || !timeStr) return undefined

    return parse(`${dateStr} ${timeStr}`, 'yyyy-MM-dd HH:mm', new Date())
  }

  const getMaxCensusSize = (form: Process, census: Census) => {
    switch (form.censusType) {
      case CensusTypes.Spreadsheet:
      case CensusTypes.Web3:
        return form.addresses?.length ?? census?.size
      case CensusTypes.CSP:
      default:
        return form.census?.size ?? census?.size
    }
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
      maxCensusSize: getMaxCensusSize(form, census),
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
        maxVoteOverwrites: form.censusType === CensusTypes.CSP ? 0 : 10,
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

export const useDraft = (draftId?: string | null) => {
  const { bearedFetch } = useAuth()

  return useQuery<{ metadata: Process }, Error>({
    queryKey: ['draft', draftId],
    enabled: !!draftId,
    queryFn: async () => {
      return bearedFetch(ApiEndpoints.OrganizationProcess.replace('{processId}', draftId!))
    },
    refetchOnWindowFocus: false,
  })
}

type SaveStatusProps = {
  saveStatus: 'saving' | 'saved' | 'error' | 'idle'
  lastSaveTime: Date | null
  onRetry: () => void
}

const SaveStatus = ({ saveStatus, lastSaveTime, onRetry }: SaveStatusProps) => {
  const { t, i18n } = useTranslation()

  if (saveStatus === 'idle') return null

  // Get the appropriate date-fns locale based on the current language
  const getDateFnsLocale = () => {
    switch (i18n.language) {
      case 'ca':
        return caLocale
      case 'es':
        return esLocale
      case 'en':
      default:
        return enLocale
    }
  }

  return (
    <HStack spacing={2} fontSize='xs' color='gray.700' _dark={{ color: 'gray.300' }}>
      {saveStatus === 'saving' && (
        <>
          <Spinner size='xs' color='blue.500' />
          <Text>{t('process.create.save_status.saving', { defaultValue: 'Saving draft...' })}</Text>
        </>
      )}
      {saveStatus === 'saved' && lastSaveTime && (
        <>
          <Icon as={LuCheck} color='green.500' _dark={{ color: 'green.400' }} />
          <Text>
            {t('process.create.save_status.saved', {
              defaultValue: 'Saved {{time}}',
              time: formatDistanceToNow(lastSaveTime, { addSuffix: true, locale: getDateFnsLocale() }),
            })}
          </Text>
        </>
      )}
      {saveStatus === 'error' && (
        <>
          <Icon as={LuInfo} color='red.500' _dark={{ color: 'red.400' }} />
          <Text>{t('process.create.save_status.error', { defaultValue: 'Auto-save failed' })}</Text>
          <Button size='xs' variant='link' onClick={onRetry} colorScheme='red'>
            {t('process.create.save_status.retry', { defaultValue: 'Retry' })}
          </Button>
        </>
      )}
    </HStack>
  )
}

export const ProcessCreate = () => {
  const { t } = useTranslation()
  const toast = useToast()
  const [formDraftLoaded, setFormDraftLoaded] = useState(false)
  const [nextId, setNextId] = useState('')
  const { groupId } = useParams()
  const [searchParams] = useSearchParams()
  const draftId = searchParams.get('draftId')
  const [storedDraftId, storeDraftId] = useLocalStorage('draft-id', null)
  const isDesktop = useBreakpointValue({ base: false, md: true })
  const deleteDraft = useDeleteDraft()
  const navigate = useNavigate()
  const location = useLocation()
  const [showSidebar, setShowSidebar] = useState(isDesktop || false)
  const methods = useForm<Process>({
    defaultValues: {
      ...defaultProcessValues,
      groupId,
    },
  })
  const reset = useSafeReset(methods.reset)
  const { activeTemplate, placeholders, setActiveTemplate } = useProcessTemplates()
  const { isOpen, onOpen: openConfirmationModal, onClose } = useDisclosure()
  const { organization } = useOrganization()
  const { client } = useClient()
  const { isSubmitting, isSubmitSuccessful, isDirty } = methods.formState
  const { setStepDoneAsync } = useOrganizationSetup()
  const processBundleMutation = useProcessBundle()
  const { trackPlausibleEvent } = useAnalytics()
  const formToElectionMapper = useFormToElectionMapper()
  const effectiveDraftId = draftId ?? storedDraftId

  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error' | 'idle'>('idle')
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null)

  // Confirm navigation if form is dirty
  const { isSamePath, cancel, proceed, resetSamePath, saveCooldown } = useConfirmOnNavigate({
    isDirty,
    isSubmitting,
    isSubmitSuccessful,
    saveStatus,
    lastSaveTime,
    onOpen: openConfirmationModal,
    onClose,
  })

  // useFormDraftSaver will be modified to use the state setters
  const { saveDraft, isSaving, skipSave } = useFormDraftSaver(
    isDirty,
    methods.getValues,
    effectiveDraftId,
    storeDraftId,
    saveCooldown,
    setSaveStatus,
    setLastSaveTime
  )
  const { permission } = useSubscription()
  const { data: formDraft } = useDraft(effectiveDraftId)

  // Show sidebar by default on desktop
  useEffect(() => {
    setShowSidebar(isDesktop)
  }, [isDesktop])

  // Apply form draft if it exists
  useEffect(() => {
    setFormDraftLoaded(true)
    setNextId(Date.now().toString())
    if (!formDraft) return

    Object.entries(formDraft.metadata).forEach(([key, value]) => {
      if (key === 'groupId' && groupId) return
      methods.setValue(key as keyof Process, value as Process[keyof Process], { shouldDirty: true })
    })
  }, [formDraft, groupId, methods])

  const resetForm = () => {
    setActiveTemplate(null)
    reset()
    skipSave(true)
    queueMicrotask(() => {
      navigate(location.pathname, { replace: true })
      storeDraftId(null)
      skipSave(false)
    })
  }

  const showDraftSaveError = (error: unknown) => {
    const limit = permission(SubscriptionPermission.Drafts)
    let description = error instanceof Error ? error.message : String(error)

    if (error instanceof ApiError && error.apiError?.code === ErrorCode.DraftLimitReached) {
      description = t('process.create.limit_reached.message', {
        defaultValue:
          "You've reached your limit of {{ count }} drafts. To save this draft, delete an existing draft or upgrade your plan.",
        count: limit,
      })
    }

    toast({
      title: t('process.create.save_draft_error.title', { defaultValue: 'Error saving draft' }),
      description,
      status: 'error',
      duration: 10000,
    })
  }

  const handleSaveAndLeave = async () => {
    try {
      const result = await saveDraft(false)
      // Only proceed if save was successful
      if (result === 'saved') {
        proceed()
      }
    } catch (error) {
      showDraftSaveError(error)
    }
  }

  const handleManualSave = async () => {
    try {
      const result = await saveDraft(false)
      if (result === 'saved') {
        toast({
          title: t('process.create.save_draft_success', { defaultValue: 'Draft saved' }),
          status: 'success',
          duration: 3000,
        })
      }
    } catch (error) {
      showDraftSaveError(error)
    }
  }

  const discardAndLeave = () => {
    try {
      proceed()
      reset()
      storeDraftId(null)
    } catch (error) {
      toast({
        title: t('form.process_create.error_deleting_draft_title', { defaultValue: 'Error deleting draft' }),
        description: error instanceof Error ? error.message : String(error),
        status: 'error',
        duration: 3000,
      })
    }
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

      const targetPath = electionId
        ? generatePath(Routes.dashboard.process, { id: electionId })
        : Routes.dashboard.processes.all

      if (effectiveDraftId) {
        await deleteDraft.mutateAsync({ draftId: effectiveDraftId, silent: true })
        localStorage.removeItem('draft-id')
      }

      navigate(targetPath)
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

  // Detect sidebar errors for visual indicators
  const sidebarFieldKeys = ['groupId', 'census', 'resultVisibility', 'endDate', 'endTime', 'startDate', 'startTime']
  const sidebarErrors = sidebarFieldKeys.filter((key) => key in methods.formState.errors)
  const hasSidebarErrors = sidebarErrors.length > 0
  const sidebarErrorCount = sidebarErrors.length

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
          gap={6}
          paddingRight={4}
          paddingBottom={4}
          maxW='900px'
          mx='auto'
          w='full'
          _before={{
            content: '""',
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            height: 0,
            bg: 'chakra.body.bg',
            zIndex: 'sticky',
            display: 'block',
          }}
        >
          {/* Top bar with draft status and sidebar toggle */}
          <Flex
            position='sticky'
            top={0}
            p={4}
            pb={6}
            bg='chakra.body.bg'
            zIndex='sticky'
            gap={4}
            flexWrap='wrap'
            justify='space-between'
            align='center'
          >
            <HStack spacing={3}>
              {effectiveDraftId && (
                <Box
                  px={3}
                  py={1}
                  borderRadius='full'
                  bg='gray.200'
                  color='gray.800'
                  _dark={{ bg: 'gray.700', color: 'gray.100' }}
                  fontSize='sm'
                  fontWeight='medium'
                >
                  <Trans i18nKey='process.create.status.draft'>Draft</Trans>
                </Box>
              )}
              {isDirty && (
                <IconButton
                  onClick={openConfirmationModal}
                  icon={<Icon as={LuRotateCcw} />}
                  variant='ghost'
                  size='sm'
                  aria-label={t('dashboard.actions.reset_form', {
                    defaultValue: 'Reset form',
                  })}
                />
              )}
              <IconButton
                aria-label={t('dashboard.actions.toggle_sidebar', {
                  defaultValue: 'Toggle sidebar',
                })}
                icon={<Icon as={LuSettings} />}
                variant={hasSidebarErrors ? 'solid' : 'ghost'}
                colorScheme={hasSidebarErrors ? 'red' : 'gray'}
                size='sm'
                onClick={() => setShowSidebar((prev) => !prev)}
                position='relative'
              >
                {hasSidebarErrors && (
                  <Badge
                    position='absolute'
                    top='-1'
                    right='-1'
                    colorScheme='red'
                    borderRadius='full'
                    px={2}
                    fontSize='xs'
                  >
                    {sidebarErrorCount}
                  </Badge>
                )}
              </IconButton>
            </HStack>
            <HStack spacing={3}>
              <SaveStatus saveStatus={saveStatus} lastSaveTime={lastSaveTime} onRetry={handleManualSave} />
              {(saveStatus === 'error' || saveStatus === 'idle') && (
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={handleManualSave}
                  isLoading={isSaving}
                  shouldWrapChildren
                >
                  <Trans i18nKey='process.create.action.save_draft'>Save</Trans>
                </Button>
              )}
              <Button
                type='submit'
                colorScheme='black'
                size='sm'
                isLoading={methods.formState.isSubmitting}
                shouldWrapChildren
              >
                <Trans i18nKey='process.create.action.publish'>Publish</Trans>
              </Button>
            </HStack>
          </Flex>

          {/* Title, Video, and Description */}
          <VStack as='header' align='stretch' spacing={6}>
            <TemplateButtons />

            <VStack align='stretch' spacing={4} pt={4}>
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
                    key={nextId}
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
          </VStack>

          <Box borderTop='1px' borderColor='borders.default' pt={6}>
            <Questions />
          </Box>
        </Box>

        <CreateSidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
      </DashboardContents>
      <LeaveConfirmationModal
        isOpen={isOpen}
        onCancel={cancel}
        onLeave={discardAndLeave}
        onSaveAndLeave={handleSaveAndLeave}
        onResetSamePath={() => resetSamePath(() => resetForm())}
        isSamePath={isSamePath}
        saveStatus={saveStatus}
        lastSaveTime={lastSaveTime}
      />
    </FormProvider>
  )
}

export default ProcessCreate
