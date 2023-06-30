import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import {
  ElectionDescription,
  ElectionProvider,
  ElectionQuestions,
  ElectionSchedule,
  ElectionTitle,
  errorToString,
  useClient,
} from '@vocdoni/chakra-components'
import {
  Election,
  ElectionStatus,
  ensure0x,
  EnvOptions,
  IElectionParameters,
  IPublishedElectionParameters,
  IQuestion,
  PlainCensus,
  PublishedElection,
  VocdoniCensus3Client,
  WeightedCensus,
} from '@vocdoni/sdk'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Wrapper from '../Wrapper'
import { CreationProgress } from './CreationProgress'
import { Option } from './Questions'
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

  const create = async () => {
    onOpen()
    setSending(true)
    setError(null)
    try {
      const census = await getCensus(env as EnvOptions, form)
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
      <Wrapper>
        <Alert status='info' mb={5}>
          <AlertIcon />
          {t('form.process_create.confirm.preview_alert')}
        </Alert>
        <ElectionProvider election={unpublished}>
          <ElectionTitle />
          <ElectionSchedule />
          <ElectionDescription />
          <ElectionQuestions />
        </ElectionProvider>
      </Wrapper>
      <Flex justifyContent='space-between' alignItems='end' mt={5}>
        <Button variant='outline' onClick={prev} leftIcon={<ArrowBackIcon />}>
          {t('form.process_create.previous_step')}
        </Button>

        <Button onClick={create} isLoading={sending}>
          {t('form.process_create.create')}
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
const getCensus = (env: EnvOptions, form: StepsFormValues) => {
  switch (form.censusType) {
    case 'token':
      const c3client = new VocdoniCensus3Client({
        env,
      })

      return c3client.createTokenCensus(form.censusToken)

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
  }
}
