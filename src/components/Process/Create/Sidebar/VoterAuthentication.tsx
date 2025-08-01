import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertStatus,
  AlertTitle,
  Badge,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
  useDisclosure,
  useStyleConfig,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useOrganization } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { LuCheck, LuInfo, LuLock, LuMail, LuShield } from 'react-icons/lu'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { useMemberColumns } from '~elements/dashboard/memberbase/members'
import { useCensus } from './CensusProvider'

enum SecurityLevels {
  WEAK = 'WEAK',
  MID = 'MID',
  STRONG = 'STRONG',
}

type SecurityLevel = SecurityLevels.WEAK | SecurityLevels.MID | SecurityLevels.STRONG

type SecurityLevelMessages = {
  subtext: JSX.Element
  alert: {
    title: JSX.Element
    description: JSX.Element
    status: AlertStatus
  }
}

type ValidateGroupArgs = {
  groupId: string
  authFields?: string[]
  twoFaFields?: string[]
}

type PublishCensusArgs = {
  censusId: string
  groupId: string
  authFields: string[]
  twoFaFields: string[]
}

const useValidateGroup = () => {
  const { organization } = useOrganization()
  const { bearedFetch } = useAuth()

  return useMutation({
    mutationFn: async ({ groupId, authFields, twoFaFields }: ValidateGroupArgs) => {
      return await bearedFetch<{ valid: boolean }>(
        ApiEndpoints.OrganizationGroupValidate.replace('{address}', organization?.address).replace(
          '{groupId}',
          groupId
        ),
        {
          method: 'POST',
          body: {
            authFields,
            twoFaFields,
          },
        }
      )
    },
  })
}

const useCreateCensus = () => {
  const { bearedFetch } = useAuth()
  const { organization } = useOrganization()

  return useMutation({
    mutationFn: async () => {
      return await bearedFetch<{ id: string }>(ApiEndpoints.OrganizationCensuses, {
        method: 'POST',
        body: {
          orgAddress: ensure0x(organization?.address),
        },
      })
    },
  })
}

const usePublishCensus = () => {
  const { bearedFetch } = useAuth()

  return useMutation({
    mutationFn: async ({ censusId, groupId, authFields, twoFaFields }: PublishCensusArgs) => {
      const body: Record<string, any> = {}

      if (authFields?.length) {
        body.authFields = authFields
      }
      body.twoFaFields = twoFaFields

      const endpoint = ApiEndpoints.OrganizationCensusPublish.replace('{censusId}', censusId).replace(
        '{groupId}',
        groupId
      )

      return await bearedFetch<{ size: number }>(endpoint, {
        method: 'POST',
        body,
      })
    },
  })
}

const getSecurityLevelMessages = (level: SecurityLevel): SecurityLevelMessages => {
  switch (level) {
    case SecurityLevels.STRONG:
      return {
        subtext: (
          <Trans i18nKey='process_create.voter_auth_guarantees_sub_strong'>
            Strong authentication guarantees with two-factor verification enabled.
          </Trans>
        ),
        alert: {
          title: (
            <Trans i18nKey='process_create.voter_auth_guarantees_strong_title'>Strong Authentication Guarantees</Trans>
          ),
          description: (
            <Trans i18nKey='process_create.voter_auth_guarantees_strong_description'>
              Your configuration provides strong authentication guarantees with two-factor verification.
            </Trans>
          ),
          status: 'success',
        },
      }
    case SecurityLevels.MID:
      return {
        subtext: (
          <Trans i18nKey='process_create.voter_auth_guarantees_sub_mid'>
            Mid-level authentication guarantees with 3 credentials but no two-factor verification.
          </Trans>
        ),
        alert: {
          title: (
            <Trans i18nKey='process_create.voter_auth_guarantees_mid_title'>Mid-Level Authentication Guarantees</Trans>
          ),
          description: (
            <>
              <Trans i18nKey='process_create.voter_auth_guarantees_mid_description_intro'>
                Your configuration provides mid-level authentication guarantees with 3 credentials.
              </Trans>
              <UnorderedList mt={2} pl={4}>
                <ListItem>
                  <Trans i18nKey='process_create.voter_auth_guarantees_mid_list_1'>
                    Enable two-factor authentication for strong guarantees
                  </Trans>
                </ListItem>
              </UnorderedList>
            </>
          ),
          status: 'warning',
        },
      }
    case SecurityLevels.WEAK:
    default:
      return {
        subtext: (
          <Trans i18nKey='process_create.voter_auth_guarantees_sub_weak'>
            Basic authentication guarantees with 1 credential and no two-factor verification.
          </Trans>
        ),
        alert: {
          title: (
            <Trans i18nKey='process_create.voter_auth_guarantees_weak_title'>Weak Authentication Guarantees</Trans>
          ),
          description: (
            <>
              <Trans i18nKey='process_create.voter_auth_guarantees_weak_description_intro'>
                Your current configuration provides minimal authentication guarantees. We strongly recommend:
              </Trans>
              <UnorderedList mt={2} pl={4}>
                <ListItem>
                  <Trans i18nKey='process_create.voter_auth_guarantees_weak_list_1'>
                    Add more credentials (aim for 2) for better identity verification
                  </Trans>
                </ListItem>
                <ListItem>
                  <Trans i18nKey='process_create.voter_auth_guarantees_weak_list_2'>
                    Enable two-factor authentication for an additional verification layer
                  </Trans>
                </ListItem>
              </UnorderedList>
            </>
          ),
          status: 'error',
        },
      }
  }
}

const getSecurityLevel = (use2FA: boolean, credentials: string[]): SecurityLevel => {
  if (use2FA) return SecurityLevels.STRONG
  return credentials.length === 3 ? SecurityLevels.MID : SecurityLevels.WEAK
}

const CredentialSelectionTab = () => {
  const { t } = useTranslation()
  const { control, watch } = useFormContext()
  const fields = useMemberColumns()
  const credentials = watch('credentials')

  return (
    <TabPanel px={0} pb={0}>
      <Flex direction='column' border='1px solid' borderColor='table.border' p={4} borderRadius='md' gap={4}>
        <Text fontSize='sm' fontWeight='extrabold'>
          {t('process_create.voter_auth_select_credentials', {
            defaultValue: 'Select required credentials for voter authentication',
          })}
        </Text>
        <Text fontSize='sm' color='texts.subtle'>
          {t('process_create.voter_auth_select_credentials_description', {
            defaultValue:
              'Choose the fields voters must provide to authenticate. Select up to 3 for the best balance of security and ease of use. If you plan to use only email or phone for 2FA, skip this step and click Next to set it up',
          })}
        </Text>
        <Flex direction='column' gap={2}>
          <Controller
            name='credentials'
            control={control}
            rules={{ validate: (val) => val.length <= 3 }}
            render={({ field }) => (
              <CheckboxGroup value={field.value} onChange={(value: string[]) => field.onChange(value)}>
                {fields.map((column) => {
                  if (column.is2fa) return null // Skip 2FA fields in this selection
                  const isChecked = credentials.includes(column.id)
                  const isAtLimit = credentials.length >= 3 && !isChecked
                  return (
                    <Checkbox key={column.id} value={column.id} isDisabled={isAtLimit}>
                      {column.label}
                    </Checkbox>
                  )
                })}
              </CheckboxGroup>
            )}
          />
        </Flex>
        {credentials.length >= 1 && (
          <Alert
            status={credentials.length >= 2 ? 'success' : 'info'}
            variant='subtle'
            borderRadius='md'
            alignItems='start'
            py={3}
            px={4}
          >
            <AlertIcon as={credentials.length >= 2 ? LuCheck : LuInfo} />
            <Box>
              <AlertTitle fontWeight='bold'>
                {credentials.length >= 2
                  ? t('process_create.voter_auth_security_level', { defaultValue: 'Good security' })
                  : t('process_create.voter_auth_security_recommendation_title', {
                      defaultValue: 'Security recommendation',
                    })}
              </AlertTitle>
              <AlertDescription fontSize='sm'>
                {credentials.length === 1 &&
                  t('process_create.voter_auth_security_recommendation_1', {
                    defaultValue: 'For better security, we recommend selecting at least 2 credentials.',
                  })}
                {credentials.length >= 2 &&
                  t('process_create.voter_auth_security_recommendation_2', {
                    defaultValue:
                      "You've selected {{ count }} credentials, which provides good security for your voters.",
                    count: credentials.length,
                  })}
              </AlertDescription>
            </Box>
          </Alert>
        )}
        <Text>
          {t('process_create.voter_auth_selected_credentials_count', {
            defaultValue: '{{ count }}/3 credentials selected',
            count: credentials.length,
          })}
        </Text>
      </Flex>
    </TabPanel>
  )
}

const TwoFactorAuthTab = () => {
  const { t } = useTranslation()
  const { control, watch } = useFormContext()
  const use2FA = watch('use2FA')

  const TwoFactorMethods = [
    {
      value: 'email',
      label: t('process_create.voter_auth_2fa_email', { defaultValue: 'Email verification' }),
      description: t('process_create.voter_auth_2fa_email_description', {
        defaultValue: 'Voters will receive a verification code via email',
      }),
    },
    {
      value: 'sms',
      label: t('process_create.voter_auth_2fa_sms', { defaultValue: 'SMS verification' }),
      description: t('process_create.voter_auth_2fa_sms_description', {
        defaultValue: 'Voters will receive a verification code via SMS',
      }),
    },
    {
      value: 'voter_choice',
      label: t('process_create.voter_auth_2fa_voter_choice', { defaultValue: "Voter's choice" }),
      description: t('process_create.voter_auth_2fa_voter_choice_description', {
        defaultValue: 'Voters can choose their preferred verification method',
      }),
    },
  ]

  return (
    <TabPanel>
      <VStack spacing={4} border='1px solid' borderColor='table.border' p={4} borderRadius='md'>
        <FormControl as={HStack}>
          <Box>
            <FormLabel fontWeight='extrabold' m={0}>
              {t('process_create.voter_auth_2fa_enable', { defaultValue: 'Enable Two-Factor Authentication' })}
            </FormLabel>
            <Text fontSize='sm' color='texts.subtle'>
              {t('process_create.voter_auth_2fa_description', {
                defaultValue: 'Add an extra layer of security by requiring voters to verify their identity',
              })}
            </Text>
          </Box>
          <Controller
            name='use2FA'
            control={control}
            render={({ field }) => (
              <Switch isChecked={field.value} onChange={(e) => field.onChange(e.target.checked)} colorScheme='black' />
            )}
          />
        </FormControl>

        {use2FA && (
          <VStack align='start' spacing={6}>
            <Box>
              <Text fontWeight='bold'>
                {t('process_create.voter_auth_2fa_method_title', { defaultValue: 'Select verification method' })}
              </Text>
              <VStack align='start' spacing={3} mt={3}>
                <FormControl>
                  <Controller
                    name='use2FAMethod'
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} colorScheme='black'>
                        <Stack direction='column' gap={2}>
                          {TwoFactorMethods.map((method) => (
                            <Radio key={method.value} value={method.value} alignItems='flex-start' size='sm'>
                              <Text fontWeight='bold'>{method.label}</Text>
                              <Text fontSize='sm' color='texts.subtle'>
                                {method.description}
                              </Text>
                            </Radio>
                          ))}
                        </Stack>
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </VStack>
            </Box>

            <Alert status='success' variant='subtle' borderRadius='md' alignItems='start' py={3} px={4}>
              <AlertIcon as={LuLock} />
              <Box>
                <AlertTitle fontWeight='bold'>
                  {t('process_create.voter_auth_2fa_security_title', { defaultValue: 'Enhanced Security' })}
                </AlertTitle>
                <AlertDescription fontSize='sm'>
                  {t('process_create.voter_auth_2fa_security_description', {
                    defaultValue:
                      'Two-factor authentication significantly increases the security of your voting process by ensuring only authorized members can vote.',
                  })}
                </AlertDescription>
              </Box>
            </Alert>
          </VStack>
        )}
      </VStack>
    </TabPanel>
  )
}

const SecurityLevelBox = ({ level, isActive }: { level: SecurityLevel; isActive: boolean }) => {
  const variant = isActive ? level.toLowerCase() : 'inactive'
  const styles = useStyleConfig('SecurityLevelBox', { variant })

  return <Box __css={styles}>{level}</Box>
}

const SecurityLevelDisplay = () => {
  const { watch } = useFormContext()
  const credentials = watch('credentials') || []
  const use2FA = watch('use2FA')
  const level = getSecurityLevel(use2FA, credentials)

  return (
    <HStack spacing={3} w='full'>
      {(['WEAK', 'MID', 'STRONG'] as SecurityLevel[]).map((lvl) => (
        <SecurityLevelBox key={lvl} level={lvl} isActive={lvl === level} />
      ))}
    </HStack>
  )
}

const SummaryTab = () => {
  const { t } = useTranslation()
  const { watch } = useFormContext()
  const credentials = watch('credentials') || []
  const use2FA = watch('use2FA')
  const use2FAMethod = watch('use2FAMethod')
  const level = getSecurityLevel(use2FA, credentials)
  const { subtext, alert } = getSecurityLevelMessages(level)

  const get2FAMethodLabel = (method: string) =>
    method === 'sms'
      ? t('process_create.voter_auth_sms', { defaultValue: 'Via SMS verification' })
      : method === 'voter_choice'
        ? t('process_create.voter_auth_voters_choice', { defaultValue: "Voter's choice" })
        : t('process_create.voter_auth_email', { defaultValue: 'Via email verification' })

  return (
    <TabPanel>
      <Box border='1px solid' borderColor='table.border' borderRadius='md' p={5} bg='background.raised'>
        <Stack spacing={4}>
          <Text fontWeight='bold'>
            {t('process_create.voter_auth_summary_title', { defaultValue: 'Authentication Configuration Summary' })}
          </Text>
          <Box>
            <HStack mb={1}>
              <Icon as={LuShield} />
              <Text fontWeight='semibold'>
                {t('process_create.voter_auth_summary_credentials', { defaultValue: 'Required Credentials' })}
              </Text>
            </HStack>
            <Stack pl={6} spacing={2}>
              {credentials.map((cred) => (
                <HStack key={cred}>
                  <Icon as={LuCheck} color='green.500' />
                  <Text>{cred}</Text>
                </HStack>
              ))}
            </Stack>
          </Box>
          {use2FA && (
            <Box>
              <HStack mb={1}>
                <Badge colorScheme='black' fontSize='xs'>
                  2FA
                </Badge>
                <Text fontWeight='semibold'>
                  {t('process_create.voter_auth_summary_2fa_enable', { defaultValue: 'Two-Factor Authentication' })}
                </Text>
              </HStack>
              <Stack pl={6}>
                <HStack>
                  <Icon as={LuCheck} color='green.500' />
                  <Text>{t('process_create.voter_auth_summary_2fa_enabled', { defaultValue: 'Enabled' })}</Text>
                </HStack>
                <HStack>
                  <Icon as={LuMail} />
                  <Text>{get2FAMethodLabel(use2FAMethod)}</Text>
                </HStack>
              </Stack>
            </Box>
          )}
          <Divider />
          <Box>
            <HStack mb={3}>
              <Icon as={LuShield} />
              <Text fontWeight='semibold'>
                {t('process_create.voter_auth_guarantees', { defaultValue: 'Authentication Guarantees' })}
              </Text>
            </HStack>
            <SecurityLevelDisplay />
            <Text fontSize='sm' color='texts.subtle' mt={2}>
              {subtext}
            </Text>
          </Box>
          <Alert status={alert.status} variant='subtle' borderRadius='md' alignItems='start' py={3} px={4}>
            <AlertIcon />
            <Box>
              <AlertTitle fontWeight='bold'>{alert.title}</AlertTitle>
              <AlertDescription fontSize='sm'>{alert.description}</AlertDescription>
            </Box>
          </Alert>
        </Stack>
      </Box>
    </TabPanel>
  )
}
type ValidationErrorData = {
  memberIds: string[]
  duplicates: string[]
  missingData: string[]
}

type ValidationError = {
  error: string
  code: number
  data: ValidationErrorData
}

export const ValidationErrorsAlert = ({ validationError }) => {
  const { t } = useTranslation()

  if (!validationError) return null

  const errorData: ValidationErrorData = validationError?.data

  const { memberIds, duplicates, missingData } = errorData
  const hasDuplicates = duplicates.length > 0
  const hasMissing = missingData.length > 0
  const total = memberIds.length

  if (!hasDuplicates && !hasMissing) return null

  return (
    <Alert status='error' variant='subtle' borderRadius='md'>
      <AlertIcon />
      <Box>
        <AlertTitle fontWeight='bold'>
          {t('process_create.voter_auth_validation_error_title', 'Validation Error')}
        </AlertTitle>

        <AlertDescription fontSize='sm'>
          <Stack spacing={3} mt={2}>
            <Text>
              {t('process_create.voter_auth_validation_summary', {
                defaultValue: 'Validation failed for some users.',
              })}
            </Text>

            <UnorderedList>
              <ListItem>
                {t('process_create.voter_auth_validation_total', {
                  defaultValue: '{{count}} users total',
                  count: total,
                })}
              </ListItem>
              <ListItem>
                {t('process_create.voter_auth_validation_missing_data', {
                  defaultValue: '{{count}} users missing required fields',
                  count: missingData.length,
                })}
              </ListItem>
              <ListItem>
                {t('process_create.voter_auth_validation_duplicates', {
                  defaultValue: '{{count}} duplicated users',
                  count: duplicates.length,
                })}
              </ListItem>
            </UnorderedList>
          </Stack>
        </AlertDescription>
      </Box>
    </Alert>
  )
}

export const VoterAuthentication = () => {
  const { t } = useTranslation()
  const mainForm = useFormContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setMaxCensusSize } = useCensus()
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [validationError, setValidationError] = useState<ValidationError | null>(null)
  const validateGroupMutation = useValidateGroup()
  const createCensusMutation = useCreateCensus()
  const publishCensusMutation = usePublishCensus()

  const methods = useForm({ defaultValues: { credentials: [], use2FA: false, use2FAMethod: 'email' } })
  const { handleSubmit, watch, getValues } = methods
  const groupId = mainForm.watch('groupId')
  const censusId = mainForm.watch('censusId')
  const credentials = watch('credentials')
  const use2FA = watch('use2FA')
  const hasNoCredentialsSelected = !credentials.length && !use2FA

  const goToTab = async (nextIndex: number) => {
    setValidationError(null)

    try {
      if (activeTabIndex === 0) {
        if (credentials.length) {
          await validateGroupMutation.mutateAsync({
            groupId,
            authFields: credentials,
          })
        }
      }

      if (activeTabIndex === 1) {
        const censusData = getValues()
        if (censusData.use2FA) {
          const twoFaFields =
            censusData.use2FAMethod === "voter's choice" ? ['email', 'phone'] : [censusData.use2FAMethod]
          await validateGroupMutation.mutateAsync({
            groupId,
            authFields: censusData.credentials,
            twoFaFields,
          })
        }
      }

      setActiveTabIndex(nextIndex)
    } catch (error) {
      setValidationError(error.apiError as ValidationError)
    }
  }

  const onSubmit = async () => {
    const censusData = getValues()
    const { id: censusId } = await createCensusMutation.mutateAsync()
    const { size: maxCensusSize } = await publishCensusMutation.mutateAsync({
      censusId,
      groupId,
      authFields: censusData.credentials,
      twoFaFields: censusData.use2FA
        ? censusData.use2FAMethod === "voter's choice"
          ? ['email', 'phone']
          : [censusData.use2FAMethod]
        : [],
    })
    setMaxCensusSize(maxCensusSize)
    mainForm.setValue('censusId', censusId)
    onClose()
    goToTab(0)
  }

  const handleNext = () => {
    if (activeTabIndex < 2) {
      goToTab(activeTabIndex + 1)
    } else {
      handleSubmit(onSubmit)()
    }
  }

  const handlePrevious = () => {
    if (activeTabIndex > 0) goToTab(activeTabIndex - 1)
    else onClose()
  }

  return (
    <>
      <Button isDisabled={!groupId} colorScheme='gray' w='full' onClick={onOpen}>
        <Trans i18nKey='process_create.voter_auth'>Configure Voter Authentication</Trans>
      </Button>
      {censusId && (
        <Text color='texts.subtle' size='xs'>
          {t('process_create.voter_auth_no_census_description', {
            defaultValue: 'Census already created.',
          })}
        </Text>
      )}
      {!groupId && (
        <Text color='texts.subtle' size='xs'>
          {t('process_create.voter_auth_no_group_description', {
            defaultValue: 'Please select a group first to configure authentication.',
          })}
        </Text>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size='md' fontWeight='extrabold'>
              {t('process_create.voter_auth_title', { defaultValue: 'Configure Voter Authentication' })}
            </Heading>
            <Text size='sm' color='texts.subtle'>
              {t('process_create.voter_auth_description', {
                defaultValue: 'Set up how voters will authenticate to participate in this voting process.',
              })}
            </Text>
          </ModalHeader>
          <FormProvider {...methods}>
            <Box as='form' onSubmit={handleSubmit(onSubmit)} p={4}>
              <ModalBody display='flex' flexDirection='column' gap={4}>
                <ValidationErrorsAlert validationError={validationError} />
                <Tabs index={activeTabIndex} onChange={goToTab} isFitted>
                  <TabList w='full'>
                    <Tab>Credentials</Tab>
                    <Tab>Two-Factor</Tab>
                    <Tab isDisabled={hasNoCredentialsSelected}>Summary</Tab>
                  </TabList>
                  <TabPanels>
                    <CredentialSelectionTab />
                    <TwoFactorAuthTab />
                    <SummaryTab />
                  </TabPanels>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Flex justify='space-between' w='full'>
                  <Button variant='outline' onClick={handlePrevious}>
                    {t('common.back', 'Back')}
                  </Button>
                  <Button
                    colorScheme='black'
                    // isDisabled={hasNoCredentialsSelected && activeTabIndex === 1}
                    onClick={handleNext}
                  >
                    {activeTabIndex === 2 ? t('common.confirm', 'Confirm') : t('common.next', 'Next')}
                  </Button>
                </Flex>
              </ModalFooter>
            </Box>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  )
}
