import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { ElectionProvider, errorToString, useClient } from '@vocdoni/react-providers'
import {
  Election,
  ElectionCreationSteps,
  ElectionStatus,
  EnvOptions,
  IElectionParameters,
  IPublishedElectionParameters,
  IQuestion,
  PlainCensus,
  PublishedElection,
  UnpublishedElection,
  VocdoniCensus3Client,
  WeightedCensus,
  ensure0x,
} from '@vocdoni/sdk'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { CensusType } from '../Census/TypeSelector'
import Preview from '../Confirm/Preview'
import { CostPreview } from '../CostPreview'
import { CreationProgress, Steps } from '../CreationProgress'
import { Web3Address } from '../StepForm/CensusWeb3'
import { Option } from '../StepForm/Questions'
import Wrapper from './Wrapper'
import { StepsFormValues, useProcessCreationSteps } from './use-steps'
import imageHeader from '/assets/spreadsheet-confirm-modal.jpeg'

export const Confirm = () => {
  const { env, client, account } = useClient()
  const { form, prev } = useProcessCreationSteps()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const toast = useToast()
  const [error, setError] = useState<string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sending, setSending] = useState<boolean>(false)
  const [step, setStep] = useState<Steps>()
  const [disabled, setDisabled] = useState<boolean>(false)
  const [unpublished, setUnpublished] = useState<UnpublishedElection | undefined>()

  const methods = useForm({
    defaultValues: {
      infoValid: false,
      termsAndConditions: false,
    },
  })

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = methods

  const onSubmit = async () => {
    onOpen()
    setSending(true)
    setError(null)
    try {
      const census = await getCensus(env, form, account!.address)
      const params: IElectionParameters = {
        ...electionFromForm(form),
        census,
      }
      const election = Election.from(params)

      let pid: string
      for await (const step of client.createElectionSteps(election)) {
        switch (step.key) {
          case ElectionCreationSteps.CENSUS_CREATED:
          case ElectionCreationSteps.SIGN_TX:
          case ElectionCreationSteps.DONE:
            setStep(step.key)
            if (step.key === ElectionCreationSteps.DONE) {
              pid = step.electionId
            }
        }
      }
      toast({
        title: t('form.process_create.success_title'),
        description: t('form.process_create.success_description'),
        status: 'success',
        duration: 4000,
      })

      // clear draft data from storage
      localStorage.removeItem('form-draft')
      localStorage.removeItem('form-draft-step')

      // redirect (with delay to allow the user to see the success toast)
      setTimeout(() => navigate(`/processes/${ensure0x(pid)}`), 3000)
    } catch (err: any) {
      setError(errorToString(err))
      console.error('could not create election:', err)
    } finally {
      setSending(false)
    }
  }
  const corelection = useMemo(() => electionFromForm(form), [account?.address, form])

  // fetches census for unpublished elections
  useEffect(() => {
    if (typeof unpublished !== 'undefined') return
    ;(async () => {
      const census = await getCensus(env, form, account!.address)
      setUnpublished(
        Election.from({
          ...corelection,
          census,
          // oroboros... getCensus ensures form.addresses is populated, that's why we need to set it again
          // this could be avoided by defining corelection asynchronusly, but would delay the rendering
          maxCensusSize: form.maxCensusSize ?? form.addresses.length,
        } as IElectionParameters)
      )
    })()
  }, [corelection])

  // preview (fake) mapping
  const published = PublishedElection.build({
    ...corelection,
    status: ElectionStatus.PROCESS_UNKNOWN,
    organizationId: account?.address as string,
    // needs to be redefined in order to set it when set as autoStart
    startDate: form.electionType.autoStart ? new Date().getTime() : new Date(form.startDate).getTime(),
  } as unknown as IPublishedElectionParameters)

  return (
    <Wrapper>
      <Box>
        <Text fontWeight='bold' mb={2}>
          {t('form.process_create.confirm.title')}
        </Text>
        <Text mb={4}>{t('form.process_create.confirm.description')}</Text>
        <ElectionProvider election={published}>
          <Flex flexDirection={{ base: 'column', xl2: 'row' }} gap={5}>
            <Preview />
            <Box flex={{ xl2: '0 0 25%' }}>
              <CostPreview unpublished={unpublished} disable={setDisabled} />

              <FormProvider {...methods}>
                <Box>
                  <Text fontWeight='bold' px={2} mb={2}>
                    {t('form.process_create.confirm.confirmation')}
                  </Text>
                  <Flex
                    as='form'
                    id='process-create-form'
                    onSubmit={handleSubmit(onSubmit)}
                    flexDirection='column'
                    gap={4}
                    bgColor='process_create.section'
                    borderRadius='md'
                    p={{ base: 3, xl: 6 }}
                  >
                    <FormControl
                      isInvalid={!!errors.infoValid}
                      sx={{
                        '& label': {
                          display: 'flex',
                          alignItems: { xl2: 'start' },

                          '& span:first-of-type': {
                            mt: { xl2: 1.5 },
                          },
                        },
                      }}
                    >
                      <Checkbox {...register('infoValid', { required: true })}>
                        {t('form.process_create.confirm.confirmation_valid_info')}
                      </Checkbox>
                      <FormErrorMessage>
                        <Text ml={6}>{t('form.error.field_is_required')}</Text>
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.termsAndConditions}
                      sx={{
                        '& label': {
                          display: 'flex',
                          alignItems: { xl2: 'start' },

                          '& span:first-of-type': {
                            mt: { xl2: 1.5 },
                          },
                        },
                      }}
                    >
                      <Checkbox {...register('termsAndConditions', { required: true })}>
                        <Trans
                          i18nKey='form.process_create.confirm.confirmation_terms_and_conditions'
                          components={{
                            customLink: (
                              <Link variant='primary' href='https://aragon.org/terms-and-conditions' target='_blank' />
                            ),
                          }}
                        />
                      </Checkbox>
                      <FormErrorMessage>
                        <Text ml={6}>{t('form.error.field_is_required')}</Text>
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                </Box>
              </FormProvider>
            </Box>
          </Flex>
        </ElectionProvider>
      </Box>
      <Flex justifyContent='space-between' alignItems='end' mt='auto'>
        <Button variant='outline' onClick={prev} leftIcon={<ArrowBackIcon />}>
          {t('form.process_create.previous_step')}
        </Button>

        <Button
          type='submit'
          form='process-create-form'
          isDisabled={disabled}
          isLoading={sending}
          variant='outline'
          colorScheme='primary'
          px={{ base: 12, xl2: 28 }}
        >
          {t('form.process_create.confirm.create_button')}
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={!!error} closeOnOverlayClick={!!error} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>{t('form.process_create.creating_process')}</Text>
              <Box bgImage={imageHeader} />
            </ModalHeader>
            {error && <ModalCloseButton />}
            <ModalBody>
              <CreationProgress error={error} sending={sending} step={step} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </Wrapper>
  )
}

/**
 * Returns the expected census. Note that it can return a promise (census3).
 *
 * @param {EnvOptions} env Current env (required by census3)
 * @param {StepsFormValues} form The form object from where to generate the census
 * @returns
 */
const getCensus = async (env: EnvOptions, form: StepsFormValues, organization: string) => {
  if (form.censusType === 'spreadsheet') {
    const wallets = await form.spreadsheet?.generateWallets(organization)

    form.addresses = wallets as Web3Address[]
  }

  switch (form.censusType) {
    case 'token':
      const c3client = new VocdoniCensus3Client({
        env,
      })

      return c3client.createTokenCensus(
        form.censusToken.ID,
        form.network.chainID,
        form.electionType.anonymous,
        form.censusToken.externalID
      )

    case 'spreadsheet':
    case 'web3':
      if (form.weightedVote) {
        const census = new WeightedCensus()
        const addresses = form.addresses.map(({ address, weight }) => ({
          key: address,
          weight: BigInt(weight),
        }))
        census.add(addresses)

        return census
      }

      const census = new PlainCensus()
      const addresses = form.addresses.map(({ address }) => address)
      census.add(addresses)

      return census

    default:
      throw new Error(`census type ${form.censusType} is not allowed`)
  }
}

/**
 * Maps values from our form state back to the expected SDK object. It needs to
 * stay as a syncronous function in order to be used in the preview.
 *
 * @param {StepsFormValues} form Form state contents
 * @returns
 */
const electionFromForm = (form: StepsFormValues) => {
  return {
    ...form,
    // map questions back to IQuestion[]
    questions: form.questions.map(
      (question) =>
        ({
          title: { default: question.title },
          description: { default: question.description },
          choices: question.options.map((q: Option, i: number) => ({
            title: { default: q.option },
            value: i,
          })),
        } as IQuestion)
    ),
    maxCensusSize: form.maxCensusSize ?? form.addresses.length,
    startDate: form.electionType.autoStart ? undefined : new Date(form.startDate).getTime(),
    endDate: new Date(form.endDate).getTime(),
    voteType: { maxVoteOverwrites: Number(form.maxVoteOverwrites) },
    meta: {
      generated: 'ui-scaffold',
      census: {
        type: form.censusType,
        fields: form.spreadsheet?.header ?? undefined,
      } as CensusMeta,
    },
  }
}

export type CensusMeta = {
  type: CensusType
  fields: string[]
}
