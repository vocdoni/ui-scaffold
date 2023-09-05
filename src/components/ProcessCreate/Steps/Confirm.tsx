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
  ElectionStatus,
  EnvOptions,
  IElectionParameters,
  IPublishedElectionParameters,
  IQuestion,
  PlainCensus,
  PublishedElection,
  VocdoniCensus3Client,
  WeightedCensus,
  ensure0x,
} from '@vocdoni/sdk'
import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { CensusType } from '../Census/TypeSelector'
import Preview from '../Confirm/Preview'
import { CreationProgress } from '../CreationProgress'
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
      const census = await getCensus(env as EnvOptions, form, account!.address)
      const params: IElectionParameters = {
        ...electionFromForm(form),
        census,
      }
      const election = Election.from(params)

      const pid = await client.createElection(election)
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

  // preview (fake) mapping
  const unpublished = useMemo(
    () =>
      PublishedElection.build({
        ...electionFromForm(form),
        organizationId: account?.address as string,
        status: ElectionStatus.PROCESS_UNKNOWN,
        // needs to be redefined in order to set it when set as autoStart
        startDate: form.electionType.autoStart ? new Date().getTime() : new Date(form.startDate).getTime(),
      } as unknown as IPublishedElectionParameters),
    [account?.address, form]
  )

  return (
    <>
      <ElectionProvider election={unpublished}>
        <Preview />
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
                      link: <Link variant='primary' href='' target='_blank' />,
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
              <CreationProgress error={error} sending={sending} />
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
        form.addresses.forEach(({ address, weight }) => census.add({ key: address, weight: BigInt(weight) }))

        return census
      }

      const census = new PlainCensus()
      form.addresses.forEach(({ address }) => census.add(address))

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
    startDate: form.electionType.autoStart ? undefined : new Date(form.startDate).getTime(),
    endDate: new Date(form.endDate).getTime(),
    voteType: { maxVoteOverwrites: Number(form.maxVoteOverwrites) },
    meta: {
      census: {
        type: form.censusType,
        fields: form.spreadsheet ? form.spreadsheet.header : undefined,
      } as CensusMeta,
    },
  }
}

export type CensusMeta = {
  type: CensusType
  fields: string[]
}
