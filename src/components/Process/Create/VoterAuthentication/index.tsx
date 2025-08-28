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
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { ApiEndpoints } from '~components/Auth/api'
import { useAuth } from '~components/Auth/useAuth'
import { useCensus } from '../Sidebar/CensusProvider'
import { CredentialsForm } from './CredentialsForm'
import { SummaryDisplay } from './SummaryDisplay'
import { TwoFactorForm } from './TwoFactorForm'
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
  const [stepCompletion, setStepCompletion] = useState<StepCompletionState>({
    step1Completed: false,
    step2Completed: false,
  })

  const voterAuthForm = useForm<VoterAuthFormData>({
    defaultValues: {
      credentials: [],
      use2FA: false,
      use2FAMethod: 'email',
    },
  })

  const validateGroupMutation = useValidateGroup()
  const createCensusMutation = useCreateCensus()
  const publishCensusMutation = usePublishCensus()

  const groupId = mainForm.watch('groupId')
  const censusId = mainForm.watch('censusId')
  const formData = voterAuthForm.watch()
  const hasNoCredentialsSelected = !formData.credentials.length && !formData.use2FA

  const handleNext = async () => {
    if (activeTabIndex === 0) {
      // Step 1 → Step 2: Simple navigation
      setStepCompletion((prev) => ({ ...prev, step1Completed: true }))
      setActiveTabIndex(1)
    } else if (activeTabIndex === 1) {
      // Step 2 → Step 3: Validate and submit data
      setValidationError(null)

      try {
        const currentFormData = voterAuthForm.getValues()
        const twoFaFields = currentFormData.use2FA ? getTwoFaFields(currentFormData.use2FAMethod) : []

        // Validate the group configuration
        await validateGroupMutation.mutateAsync({
          groupId,
          authFields: currentFormData.credentials,
          twoFaFields,
        })

        // Create and publish census
        const { id: censusId } = await createCensusMutation.mutateAsync()
        const { size: maxCensusSize } = await publishCensusMutation.mutateAsync({
          censusId,
          groupId,
          authFields: currentFormData.credentials,
          twoFaFields,
        })

        setMaxCensusSize(maxCensusSize)
        mainForm.setValue('censusId', censusId)
        setStepCompletion((prev) => ({ ...prev, step2Completed: true }))
        setActiveTabIndex(2)
      } catch (error) {
        setValidationError(error.apiError as ValidationError)
      }
    } else {
      // Step 3: Close modal (data already submitted)
      onClose()
      resetForm()
    }
  }

  const resetForm = () => {
    setActiveTabIndex(0)
    voterAuthForm.reset()
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
        <Trans i18nKey='voter_auth.title'>Configure Voter Authentication</Trans>
      </Button>
      {censusId && (
        <Text color='texts.subtle' size='xs'>
          {t('voter_auth.no_census_description', {
            defaultValue: 'Census already created.',
          })}
        </Text>
      )}
      {!groupId && (
        <Text color='texts.subtle' size='xs'>
          {t('voter_auth.no_group_description', {
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
            <Heading variant='header'>
              {t('voter_auth.title', { defaultValue: 'Configure Voter Authentication' })}
            </Heading>
            <Text variant='subheader'>
              {t('voter_auth.description', {
                defaultValue: 'Set up how voters will authenticate to participate in this voting process.',
              })}
            </Text>
          </ModalHeader>
          <ModalBody display='flex' flexDirection='column' gap={4}>
            <FormProvider {...voterAuthForm}>
              <ValidationErrorsAlert validationError={validationError} />
              <Tabs index={activeTabIndex} onChange={handleTabChange} isFitted>
                <TabList w='full'>
                  <Tab>
                    <Trans i18nKey='voter_auth.credentials'>Credentials</Trans>
                  </Tab>
                  <Tab isDisabled={!stepCompletion.step1Completed}>
                    <Trans i18nKey='voter_auth.two_factor'>Two-Factor</Trans>
                  </Tab>
                  <Tab isDisabled={!stepCompletion.step2Completed || hasNoCredentialsSelected}>
                    <Trans i18nKey='voter_auth.summary'>Summary</Trans>
                  </Tab>
                </TabList>
                <TabPanels>
                  <CredentialsForm />
                  <TwoFactorForm />
                  <SummaryDisplay />
                </TabPanels>
              </Tabs>
            </FormProvider>
          </ModalBody>
          <ModalFooter>
            <Flex justify='space-between' w='full'>
              <Button variant='outline' onClick={handlePrevious}>
                {t('common.back', 'Back')}
              </Button>
              <Button
                onClick={handleNext}
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
