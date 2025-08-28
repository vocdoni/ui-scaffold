import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useOrganization } from '@vocdoni/react-providers'
import { ensure0x } from '@vocdoni/sdk'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { useCensus } from '../Sidebar/CensusProvider'
import { CredentialsForm, CredentialsFormData } from './CredentialsForm'
import { SummaryDisplay } from './SummaryDisplay'
import { TwoFactorForm, TwoFactorFormData } from './TwoFactorForm'
import { getTwoFaFields, StepCompletionState, VoterAuthFormData } from './utils'
import { ValidationError, ValidationErrorsAlert } from './ValidationErrorsAlert'

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

export const VoterAuthentication = () => {
  const { t } = useTranslation()
  const mainForm = useFormContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setMaxCensusSize } = useCensus()
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [validationError, setValidationError] = useState<ValidationError | null>(null)
  const [formData, setFormData] = useState<VoterAuthFormData>({
    credentials: [],
    use2FA: false,
    use2FAMethod: 'email',
  })
  const [stepCompletion, setStepCompletion] = useState<StepCompletionState>({
    step1Completed: false,
    step2Completed: false,
  })

  const validateGroupMutation = useValidateGroup()
  const createCensusMutation = useCreateCensus()
  const publishCensusMutation = usePublishCensus()

  const groupId = mainForm.watch('groupId')
  const censusId = mainForm.watch('censusId')
  const hasNoCredentialsSelected = !formData.credentials.length && !formData.use2FA

  const handleCredentialsSubmit = async (data: CredentialsFormData) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStepCompletion((prev) => ({ ...prev, step1Completed: true }))
    setActiveTabIndex(1)
  }

  const handleTwoFactorSubmit = async (data: TwoFactorFormData) => {
    setValidationError(null)

    try {
      // Always perform validation, but adjust twoFaFields based on 2FA setting
      const twoFaFields = data.use2FA ? getTwoFaFields(data.use2FAMethod) : []

      await validateGroupMutation.mutateAsync({
        groupId,
        authFields: formData.credentials,
        twoFaFields,
      })

      setFormData((prev) => ({ ...prev, ...data }))
      setStepCompletion((prev) => ({ ...prev, step2Completed: true }))
      setActiveTabIndex(2)
    } catch (error) {
      setValidationError(error.apiError as ValidationError)
    }
  }

  const handleFinalSubmit = async () => {
    try {
      const { id: censusId } = await createCensusMutation.mutateAsync()
      const { size: maxCensusSize } = await publishCensusMutation.mutateAsync({
        censusId,
        groupId,
        authFields: formData.credentials,
        twoFaFields: formData.use2FA ? getTwoFaFields(formData.use2FAMethod) : [],
      })
      setMaxCensusSize(maxCensusSize)
      mainForm.setValue('censusId', censusId)
      onClose()
      resetForm()
    } catch (error) {
      console.error('Failed to create census:', error)
    }
  }

  const resetForm = () => {
    setActiveTabIndex(0)
    setFormData({
      credentials: [],
      use2FA: false,
      use2FAMethod: 'email',
    })
    setStepCompletion({
      step1Completed: false,
      step2Completed: false,
    })
    setValidationError(null)
  }

  const handleTabChange = (index: number) => {
    // Allow navigation to any completed step or the next available step
    if (index === 0) {
      setActiveTabIndex(0)
    } else if (index === 1 && stepCompletion.step1Completed) {
      setActiveTabIndex(1)
    } else if (index === 2 && stepCompletion.step2Completed) {
      setActiveTabIndex(2)
    }
  }

  const handlePrevious = () => {
    if (activeTabIndex > 0) {
      setActiveTabIndex(activeTabIndex - 1)
    } else {
      onClose()
    }
  }

  const isLoading = validateGroupMutation.isPending || createCensusMutation.isPending || publishCensusMutation.isPending

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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose()
          resetForm()
        }}
        size='xl'
      >
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
          <ModalBody display='flex' flexDirection='column' gap={4}>
            <ValidationErrorsAlert validationError={validationError} />
            <Tabs index={activeTabIndex} onChange={handleTabChange} isFitted>
              <TabList w='full'>
                <Tab>Credentials</Tab>
                <Tab isDisabled={!stepCompletion.step1Completed}>Two-Factor</Tab>
                <Tab isDisabled={!stepCompletion.step2Completed || hasNoCredentialsSelected}>Summary</Tab>
              </TabList>
              <TabPanels>
                <CredentialsForm
                  onSubmit={handleCredentialsSubmit}
                  defaultValues={{ credentials: formData.credentials }}
                />
                <TwoFactorForm
                  onSubmit={handleTwoFactorSubmit}
                  defaultValues={{ use2FA: formData.use2FA, use2FAMethod: formData.use2FAMethod }}
                  credentials={formData.credentials}
                  groupId={groupId}
                  isLoading={validateGroupMutation.isPending}
                />
                <SummaryDisplay
                  credentials={formData.credentials}
                  use2FA={formData.use2FA}
                  use2FAMethod={formData.use2FAMethod}
                />
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Flex justify='space-between' w='full'>
              <Button variant='outline' onClick={handlePrevious}>
                {t('common.back', 'Back')}
              </Button>
              <Button
                form='voter-authentication'
                type='submit'
                onClick={activeTabIndex === 2 ? handleFinalSubmit : undefined}
                colorScheme='black'
                isLoading={isLoading}
                isDisabled={activeTabIndex === 2 ? hasNoCredentialsSelected : false}
              >
                {activeTabIndex === 2 ? t('common.confirm', 'Confirm') : t('common.next', 'Next')}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
