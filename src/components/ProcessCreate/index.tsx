import { Alert, AlertIcon, Button, Flex, useToast } from '@chakra-ui/react'
import { useClientContext } from '@vocdoni/react-components'
import { Election, IQuestion, PlainCensus, WeightedCensus } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import CreateProcessAddresses from './Addresses'
import CreateProcessHeader from './Header'
import CreateProcessQuestions from './Questions'
import CreateProcessSettings from './Settings'

export interface FormValues {
  title: string
  description: string
  endDate: Date
  startDate: Date
  electionType: {
    autoStart: boolean
    interruptible: boolean
    secretUntilTheEnd: boolean
  }
  maxVoteOverwrites: number
  weightedVote: boolean
  addresses: Address[]
  questions: Question[]
}

export interface Question {
  title: string
  description: string
  options: Option[]
}

export interface Option {
  option: string
}

export interface Address {
  address: string
  weight: number
}

export const getPlainCensus = (addresses: string[]) => {
  const census = new PlainCensus()
  census.add(addresses)

  return census
}
export const getWeightedCensus = (addresses: Address[]) => {
  const census = new WeightedCensus()

  addresses.forEach((add: Address) => {
    census.add({
      key: add.address,
      weight: BigInt(add.weight),
    })
  })

  return census
}

const ProcessCreate = () => {
  const { address } = useAccount()
  const { client } = useClientContext()
  const [sending, setSending] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()
  const { t } = useTranslation()
  const toast = useToast()

  const methods = useForm<FormValues>({
    defaultValues: {
      electionType: {
        autoStart: false,
        interruptible: true,
        secretUntilTheEnd: true,
      },
      maxVoteOverwrites: 0,
      weightedVote: false,
      // add two address fields by default
      addresses: [{}, {}],
      questions: [
        {
          // add two options by default
          options: [{}, {}],
        },
      ],
    },
  })

  // fill account address to the census first address field
  useEffect(() => {
    if (!address) return
    methods.setValue(`addresses.${0}.address`, address)
  }, [address, methods])

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setError('')
    setSending(true)
    try {
      await client.createAccount()
      let census

      if (data.weightedVote) census = getWeightedCensus(data.addresses)
      else {
        const addresses = data.addresses.map((add) => add.address)
        census = await getPlainCensus(addresses)
      }

      const election = Election.from({
        ...data,
        census,
        // map questions back to IQuestion[]
        questions: data.questions.map(
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
        startDate: data.electionType.autoStart ? undefined : new Date(data.startDate).getTime(),
        endDate: new Date(data.endDate).getTime(),
        voteType: { maxVoteOverwrites: Number(data.maxVoteOverwrites) },
      })

      const pid = await client.createElection(election)
      toast({
        title: t('form.process_create.success_title'),
        description: t('form.process_create.success_description'),
        status: 'success',
        duration: 4000,
      })
      setTimeout(() => navigate(`/processes/${pid}`), 3000)
    } catch (err: any) {
      if ('message' in err) {
        setError(err.message)
      }
      console.error('could not create election:', err)
    } finally {
      setSending(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <Flex
        as='form'
        direction='column'
        gap={4}
        mt={1}
        mx='auto'
        p={{ base: 0, sm: 4 }}
        borderRadius='md'
        width={{ base: '98%', md: 160 }}
        borderWidth={{ sm: 2 }}
        borderStyle={{ sm: 'solid' }}
        borderColor={{ sm: 'gray.100' }}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <CreateProcessHeader />
        <CreateProcessSettings />
        <CreateProcessAddresses />
        <CreateProcessQuestions />
        {error.length > 0 && (
          <Alert status='error'>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Button type='submit' isLoading={sending} disabled={sending}>
          {t('form.process_create.submit')}
        </Button>
      </Flex>
    </FormProvider>
  )
}

export default ProcessCreate
