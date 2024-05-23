import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
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
import { Button } from '@vocdoni/chakra-components'
import { ElectionProvider, errorToString, useClient } from '@vocdoni/react-providers'
import {
  Census3CreateStrategyToken,
  CspCensus,
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
  StrategyToken,
  UnpublishedElection,
  VocdoniCensus3Client,
  WeightedCensus,
} from '@vocdoni/sdk'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { IElection, IElectionWithTokenResponse } from 'vocdoni-admin-sdk'
import { CensusMeta } from '~components/Process/Census/CensusType'
import { StampsUnionTypes } from '~components/ProcessCreate/Census/Gitcoin/StampsUnionType'
import { CensusGitcoinValues } from '~components/ProcessCreate/StepForm/CensusGitcoin'
import { DefaultCensusSize } from '~constants'
import { useCspAdmin } from '../Census/Csp/use-csp'
import Preview from '../Confirm/Preview'
import { CostPreview } from '../CostPreview'
import { CreationProgress, Steps } from '../CreationProgress'
import { Web3Address } from '../StepForm/CensusWeb3'
import { Option } from '../StepForm/Questions'
import { StepsFormValues, useProcessCreationSteps } from './use-steps'
import Wrapper from './Wrapper'

export const Confirm = () => {
  const { env, client, account, fetchAccount, census3: c3client } = useClient()
  const { form, prev, setForm, setIsLoadingPreview, isLoadingPreview, isLoadingCost, notEnoughBalance } =
    useProcessCreationSteps()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const toast = useToast()
  const [error, setError] = useState<string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [sending, setSending] = useState<boolean>(false)
  const [created, setCreated] = useState<string | null>(null)
  const [step, setStep] = useState<Steps>()
  const [unpublished, setUnpublished] = useState<UnpublishedElection | undefined>()
  const { vocdoniAdminClient } = useCspAdmin()

  const methods = useForm({
    defaultValues: {
      maxCensusSize: form.maxCensusSize,
      accuracy: form.accuracy,
      strategySize: form.strategySize,
      timeToCreateCensus: form.timeToCreateCensus,
      infoValid: false,
      termsAndConditions: false,
    },
  })
  const max = methods.watch('maxCensusSize')

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = methods

  const onSubmit = async () => {
    onOpen()
    setSending(true)
    setError(null)
    try {
      const salt = await client.electionService.getElectionSalt(account!.address, account!.electionIndex)
      const census = await getCensus(env, form, salt)
      const params: IElectionParameters = {
        ...electionFromForm(form),
        census,
      }
      const election = Election.from(params)

      for await (const step of client.createElectionSteps(election)) {
        switch (step.key) {
          case ElectionCreationSteps.CENSUS_CREATED:
          case ElectionCreationSteps.SIGN_TX:
          case ElectionCreationSteps.DONE:
            setStep(step.key as Steps)
            if (step.key === ElectionCreationSteps.DONE) {
              const pid = step.electionId
              if (census instanceof CspCensus) {
                const createdCspElection: IElectionWithTokenResponse = await createElectionInCsp(pid, form.userList)
              }

              setCreated(pid)
            }
        }
      }

      toast({
        title: t('form.process_create.success_title'),
        description: t('form.process_create.success_description'),
        status: 'success',
        duration: 4000,
      })

      // fetch account to update the election index and account balance
      await fetchAccount()

      // clear draft data from storage
      localStorage.removeItem('form-draft')
      localStorage.removeItem('form-draft-step')

      // NOTE: The redirect that was here has been moved to a useEffect block below, since
      // trying to redirect here, in combination with our `fetchAccount` call, was making the
      // redirect to not properly work. This is due to some weird interaction between
      // react-hook-form, react-router-dom and our react-provider reducers (which apparently are ok).
    } catch (err: any) {
      setError(errorToString(err))
      console.error('could not create election:', err)
    } finally {
      setSending(false)
    }
  }

  const createElectionInCsp = async (
    electionId: string,
    users: { login: string }[]
  ): Promise<IElectionWithTokenResponse> => {
    if (!vocdoniAdminClient) throw new Error('Vocdoni Admin Client not initialized')

    const cspElection: IElection = {
      electionId: electionId,
      handlers: [
        {
          handler: 'oauth',
          service: 'github',
          mode: 'usernames',
          data: users.map((user) => user.login),
        },
      ],
    }

    return await vocdoniAdminClient.cspElectionCreate(cspElection)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const corelection = useMemo(() => electionFromForm(form), [account?.address, form])

  // update maxCensusSize in state form when the Confirm form value changes
  useEffect(() => {
    setForm({ ...form, maxCensusSize: max })
  }, [max])

  // redirects to the created process
  useEffect(() => {
    if (!created || localStorage.getItem('form-draft')) return
    // wait a second just to ensure the user sees the toast
    setTimeout(() => navigate(`/processes/${ensure0x(created)}`), 1000)
  }, [created, navigate])

  // fetches census for unpublished elections
  useEffect(() => {
    ;(async () => {
      if (form.censusType === 'gitcoin' && (!form.maxCensusSize || isLoadingPreview)) return
      setUnpublished(
        Election.from({
          ...corelection,
          // we really don't care about the census, but it's a requirement from the Election.from method
          census: new WeightedCensus(),
        } as IElectionParameters)
      )
    })()
  }, [isLoadingPreview, form.maxCensusSize])

  // Recalculate the strategy estimation for gitcoin passport
  useEffect(() => {
    ;(async () => {
      if (form.censusType !== 'gitcoin' || !c3client) return
      setIsLoadingPreview(true)
      c3client.queueWait.attempts = 100
      try {
        const { predicate, tokens } = await getStrategyArgs(form)
        const { size, timeToCreateCensus, accuracy } = await c3client.getPredicateEstimation(
          predicate,
          tokens,
          form.electionType.anonymous
        )
        const initialValue = size < DefaultCensusSize ? size : DefaultCensusSize
        // Update this values on the state form because they are not gonna change
        setForm({ ...form, accuracy, strategySize: size, timeToCreateCensus, maxCensusSize: initialValue })
        // And update the values for this view
        setValue('accuracy', accuracy)
        setValue('strategySize', size)
        setValue('timeToCreateCensus', timeToCreateCensus)
        setValue('maxCensusSize', initialValue)
        setIsLoadingPreview(false)
      } catch (err) {
        console.error('could not get strategy estimation:', err)
        setError(errorToString(err))
        setIsLoadingPreview(false)
      }
    })()
  }, [c3client])

  // preview (fake) mapping
  const published = PublishedElection.build({
    ...corelection,
    status: ElectionStatus.PROCESS_UNKNOWN,
    organizationId: account?.address as string,
    // needs to be redefined in order to set it when set as autoStart
    startDate: form.electionType.autoStart ? new Date().getTime() : new Date(form.startDate).getTime(),
  } as unknown as IPublishedElectionParameters)

  const disabled = isLoadingPreview || isLoadingCost || notEnoughBalance

  return (
    <Wrapper>
      <Box>
        <Text className='process-create-title'>{t('form.process_create.confirm.title')}</Text>
        <Text mb={4} color='process_create.description'>
          {t('form.process_create.confirm.description')}
        </Text>
        <ElectionProvider election={published}>
          <FormProvider {...methods}>
            <Flex flexDirection={{ base: 'column', xl2: 'row' }} gap={5}>
              <Preview />
              <Box flex={{ xl2: '0 0 25%' }}>
                <CostPreview unpublished={unpublished} />

                <Box>
                  <Text className='brand-theme' fontWeight='bold' textTransform='uppercase' px={2} mb={2}>
                    {t('form.process_create.confirm.confirmation')}
                  </Text>
                  <Flex
                    as='form'
                    id='process-create-form'
                    onSubmit={handleSubmit(onSubmit)}
                    flexDirection='column'
                    gap={4}
                    bgColor='process_create.section'
                    borderRadius='none'
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
                              <Link
                                href='https://aragon.org/terms-and-conditions'
                                target='_blank'
                                color='link.primary'
                                textDecoration='underline'
                                _hover={{
                                  textDecoration: 'none',
                                }}
                              />
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
              </Box>
            </Flex>
          </FormProvider>
        </ElectionProvider>
      </Box>
      <Flex justifyContent='space-between' alignItems='end' mt='auto'>
        <Button variant='secondary' onClick={prev} leftIcon={<ArrowBackIcon />}>
          {t('form.process_create.previous_step')}
        </Button>

        <Button
          type='submit'
          form='process-create-form'
          isDisabled={disabled}
          isLoading={sending}
          px={{ base: 12, xl2: 28 }}
          variant='primary'
        >
          {t('form.process_create.confirm.create_button')}
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={!!error} closeOnOverlayClick={!!error} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>{t('form.process_create.creating_process')}</Text>
              <Box className='creating-process-img' />
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
 * Returns the expected census. Note that it returns a promise.
 *
 * @param {EnvOptions} env Current env (required by census3)
 * @param {StepsFormValues} form The form object from where to generate the census
 * @returns
 */
const getCensus = async (env: EnvOptions, form: StepsFormValues, salt: string) => {
  if (form.censusType === 'spreadsheet') {
    form.addresses = (await form.spreadsheet?.generateWallets(salt)) as Web3Address[]
  }

  switch (form.censusType) {
    case 'gitcoin':
    case 'token':
      const c3client = new VocdoniCensus3Client({
        env,
      })

      c3client.queueWait.retryTime = 5000
      // clamp attempts between 20 and 100
      c3client.queueWait.attempts = 100

      if (form.censusType === 'gitcoin') {
        // Create strategyId
        const { predicate, tokens } = await getStrategyArgs(form)
        const strategyID = await c3client.createStrategy('gitcoin_onvote_' + Date.now(), predicate, tokens)

        // Create the census
        return c3client.createStrategyCensus(strategyID, form.electionType.anonymous)
      }
      return c3client.createTokenCensus(
        form.censusToken.ID,
        form.censusToken.chainID,
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
    case 'csp':
      return new CspCensus(import.meta.env.CSP_PUBKEY as string, import.meta.env.CSP_URL as string)
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
  // max census size is calculated by the SDK when creating a process, but we need it to
  // calculate the cost preview... so here we set it for all cases anyway
  const maxCensusSize = form.maxCensusSize ?? form.spreadsheet?.data.length ?? form.addresses.length
  return {
    ...form,
    maxCensusSize,
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
    temporarySecretIdentity: form.censusType === 'spreadsheet' && form.electionType.anonymous,
    meta: {
      generated: 'ui-scaffold',
      app: import.meta.env.theme === 'default' ? 'vocdoni' : import.meta.env.theme,
      census: {
        type: form.censusType,
        fields: form.spreadsheet?.header ?? undefined,
      } as CensusMeta,
    },
  }
}

/**
 * For a list of stamp keys, create a predicate like key1 AND (key2 AND (key3 AND key4))
 *
 * @param symbols list of token symbols
 * @param operator The operator to add, AND or OR for example
 * @param index actual iteration index.
 */
const buildPredicate = (symbols: string[], operator: StampsUnionTypes, index: number = 0): string => {
  // Base case: when we reach the lasts key
  if (index === symbols.length - 2) {
    return symbols[index] + ` ${operator} ` + symbols[index + 1]
  }
  // Recursive case: build the string with nesting
  return symbols[index] + ` ${operator} (` + buildPredicate(symbols, operator, index + 1) + ')'
}

type StrategyArgs = {
  predicate: string
  tokens: { [p: string]: Census3CreateStrategyToken }
}

/**
 * Calculate strategy arguments to use it ot call estimation or create strategy.
 * Adapted for gitcoin flow only.
 * @param form
 * @param c3client
 * @constructor
 */
const getStrategyArgs = (form: CensusGitcoinValues): StrategyArgs => {
  let strategyTokens: Record<string, StrategyToken> = {}
  let predicate = ''

  if (Object.keys(form.stamps).length > 0) {
    Object.entries(form.stamps).forEach(([key, token]) => {
      if (!token.isChecked) return
      const newToken: StrategyToken = {
        ID: token.ID,
        chainID: token.chainID,
        externalID: token.externalID,
      }
      strategyTokens[key] = newToken
    })

    const gpsPredicate = form.gpsWeighted ? 'AND:mul' : 'AND'
    const stampKeys = Object.keys(strategyTokens)
    if (stampKeys.length === 1) {
      predicate = `${gpsPredicate} (${stampKeys[0]} OR ${stampKeys[0]})`
    } else if (stampKeys.length) {
      predicate = `${gpsPredicate} (${
        buildPredicate(stampKeys, form.stampsUnionType) + ')'.repeat(stampKeys.length - 1)
      }` // Add closing parentheses at the end
    }
  }

  const scoreToken = form.gitcoinGPSToken
  strategyTokens[scoreToken.symbol] = {
    ID: scoreToken.ID,
    chainID: scoreToken.chainID,
    minBalance: form.passportScore.toString(),
  }
  if (predicate.length == 0) {
    if (form.gpsWeighted) {
      predicate = `${scoreToken.symbol}`
    } else {
      predicate = `${scoreToken.symbol} AND ${scoreToken.symbol}`
    }
  } else {
    predicate = `${scoreToken.symbol} ${predicate}`
  }
  return { predicate, tokens: strategyTokens }
}
