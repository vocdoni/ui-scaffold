import { ArrowBackIcon } from '@chakra-ui/icons'
import {
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
  ModalFooter,
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
  ensure0x,
  EnvOptions,
  IElectionParameters,
  IPublishedElectionParameters,
  IQuestion,
  PlainCensus,
  PublishedElection,
  UnpublishedElection,
  VocdoniCensus3Client,
  WeightedCensus,
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
import { StepsFormValues, useProcessCreationSteps } from './use-steps'

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
      setUnpublished(
        Election.from({
          ...corelection,
          census: await getCensus(env, form, account!.address),
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
    <>
      <ElectionProvider election={published}>
        <Preview />
        <Flex
          p={{ base: 2, md: 5, xl: 10 }}
          flexDirection={{ base: 'column', md: 'row' }}
          bgColor='process_create.bg'
          borderRadius='lg'
          border='1px solid'
          borderColor='process_create.border'
          mb={10}
        >
          <Text flexBasis='30%' flexGrow={0} flexShrink={0} fontWeight='bold' fontSize='md'>
            {t('form.process_create.confirm.cost_title')}
          </Text>
          <CostPreview unpublished={unpublished} />
        </Flex>
        <FormProvider {...methods}>
          <Flex
            as='form'
            id='process-create-form'
            flexDirection={{ base: 'column', md: 'row' }}
            gap={{ base: 2, md: 0 }}
            p={{ base: 2, md: 5, xl: 10 }}
            bgColor='process_create.bg'
            borderRadius='lg'
            border='1px solid'
            borderColor='process_create.border'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Text flexBasis='30%' flexGrow={0} flexShrink={0} fontWeight='bold' fontSize='md'>
              {t('form.process_create.confirm.confirmation')}
            </Text>
            <Flex flexDirection='column' gap={2}>
              <FormControl isInvalid={!!errors.infoValid}>
                <Checkbox {...register('infoValid', { required: true })}>
                  {t('form.process_create.confirm.confirmation_valid_info')}
                </Checkbox>
                <FormErrorMessage>
                  <Text>{t('form.error.field_is_required')}</Text>
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.termsAndConditions}>
                <Checkbox {...register('termsAndConditions', { required: true })}>
                  <Trans
                    i18nKey='form.process_create.confirm.confirmation_terms_and_conditions'
                    components={{
                      link: <Link variant='primary' href='https://aragon.org/terms-and-conditions' target='_blank' />,
                    }}
                  />
                </Checkbox>
                <FormErrorMessage>
                  <Text>{t('form.error.field_is_required')}</Text>
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </Flex>
        </FormProvider>
      </ElectionProvider>
      <Flex justifyContent='space-between' alignItems='end' mt={5}>
        <Button variant='outline' onClick={prev} leftIcon={<ArrowBackIcon />}>
          {t('form.process_create.previous_step')}
        </Button>

        <Button type='submit' form='process-create-form' isLoading={sending}>
          {t('form.process_create.confirm.create_button')}
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={!!error} closeOnOverlayClick={!!error} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{t('form.process_create.creating_process')}</ModalHeader>
            {error && <ModalCloseButton />}
            <ModalBody>
              <CreationProgress error={error} sending={sending} step={step} />
            </ModalBody>
            {error && (
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  {t('form.process_create.confirm.close')}
                </Button>
              </ModalFooter>
            )}
          </ModalContent>
        </Modal>
      </Flex>
    </>
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

      return c3client.createTokenCensus(form.censusToken, form.electionType.anonymous)

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
