import { Button } from '@chakra-ui/react'
import { useClientContext } from '@vocdoni/react-components'
import { Election, IQuestion, PlainCensus, WeightedCensus } from '@vocdoni/sdk'
import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import CreateProcessAddresses from './Addresses'
import CreateProcessHeader from './Header'
import CreateProcessQuestions from './Questions'
import CreateProcessSettings from './Settings'
import WrapperForm from './WrapperForm'

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

const CreateProcess = () => {
  const { client, account } = useClientContext()
  const { t } = useTranslation()

  const methods = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      startDate: undefined,
      endDate: undefined,
      electionType: {
        autoStart: true,
        interruptible: true,
        secretUntilTheEnd: true,
      },
      maxVoteOverwrites: 0,
      weightedVote: false,
      addresses: [
        { address: account?.address, weight: 0 },
        { address: '', weight: 0 },
      ],
      questions: [
        {
          title: '',
          description: '',
          options: [{ option: '' }, { option: '' }],
        },
      ],
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
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
        startDate: data.electionType.autoStart
          ? undefined
          : new Date(data.startDate).getTime(),
        endDate: new Date(data.endDate).getTime(),
        voteType: { maxVoteOverwrites: Number(data.maxVoteOverwrites) },
      })

      const id = await client.createElection(election)

      console.log(id)
    } catch (err) {
      console.error('could not create election:', err)
    }
  }

  useEffect(() => {
    if (!account) return
    methods.setValue(`addresses.${0}.address`, account.address)
  }, [account, methods])

  return (
    <FormProvider {...methods}>
      <WrapperForm onSubmit={methods.handleSubmit(onSubmit)}>
        <>
          <CreateProcessHeader />
          <CreateProcessSettings />
          <CreateProcessAddresses />
          <CreateProcessQuestions />
          <Button type='submit' _dark={{ bg: 'black.c90' }}>
            {t('form.process_create.submit')}
          </Button>
        </>
      </WrapperForm>
    </FormProvider>
  )
}

export default CreateProcess
