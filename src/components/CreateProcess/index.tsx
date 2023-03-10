import { Button } from '@chakra-ui/react'
import { useClientContext } from '@vocdoni/react-components'
import {
  Census,
  Election,
  PlainCensus,
  UnpublishedElection,
  WeightedCensus,
} from '@vocdoni/sdk'
import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import CreateProcessAddresses from './Addresses'
import CreateProcessHeader from './Header'
import CreateProcessQuestions from './Questions'
import CreateProcessSettings from './Settings'
import WrapperForm from './WrapperForm'

export interface FormValues {
  titleProcess: string
  descriptionProcess: string
  dates: {
    start: Date
    end: Date
  }
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

interface PropsQuestionFormatted {
  title: string
  description: string
  options: PropsOptionsQuestionFormatted[]
}

interface PropsOptionsQuestionFormatted {
  title: string
  value: number
}

export interface Question {
  titleQuestion: string
  descriptionQuestion: string
  options: Option[]
}

export interface Option {
  option: string
}

export interface Address {
  address: string
  weight: number
}

export const getPlainCensus = async (addresses: string[]) => {
  const census = new PlainCensus()
  census.add(addresses)

  return census
}
export const getWeightedCensus = async (addresses: Address[]) => {
  const census = new WeightedCensus()

  addresses.forEach((add: Address) => {
    census.add({
      key: add.address,
      weight: BigInt(add.weight),
    })
  })

  return census
}

export const addQuestions = (
  election: UnpublishedElection,
  questions: Question[]
) => {
  const questionsFormatted = questions.map((question: Question) => ({
    title: question.titleQuestion,
    description: question.descriptionQuestion,
    options: question.options.map((q: Option, i: number) => ({
      title: q.option,
      value: i,
    })),
  }))

  questionsFormatted.forEach((questionFormatted: PropsQuestionFormatted) =>
    election.addQuestion(
      questionFormatted.title,
      questionFormatted.description,
      questionFormatted.options
    )
  )
}

export const createElection = (formValues: FormValues, census: Census) => {
  const startDate = new Date(formValues.dates.start)
  startDate.setHours(startDate.getHours())

  const endDate = new Date(formValues.dates.end)
  endDate.setHours(endDate.getHours())

  const election = Election.from({
    title: formValues.titleProcess,
    description: formValues.descriptionProcess,
    header: 'https://source.unsplash.com/random',
    streamUri: 'https://source.unsplash.com/random',
    startDate: formValues.electionType.autoStart
      ? undefined
      : startDate.getTime(),
    endDate: endDate.getTime(),
    electionType: {
      autoStart: formValues.electionType.autoStart,
      interruptible: formValues.electionType.interruptible,
      secretUntilTheEnd: formValues.electionType.secretUntilTheEnd,
    },
    voteType: { maxVoteOverwrites: Number(formValues.maxVoteOverwrites) },
    census,
  })

  return election
}

const CreateProcess = () => {
  const { client, account } = useClientContext()

  // const { isOpen, onOpen, onClose } = useDisclosure()

  const methods = useForm<FormValues>({
    defaultValues: {
      titleProcess: '',
      descriptionProcess: '',
      dates: {
        start: undefined,
        end: undefined,
      },
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
          titleQuestion: '',
          descriptionQuestion: '',
          options: [{ option: '' }, { option: '' }],
        },
      ],
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      // onOpen()

      await client.createAccount()
      let census

      if (data.weightedVote) census = await getWeightedCensus(data.addresses)
      else {
        const addresses = data.addresses.map((add) => add.address)
        census = await getPlainCensus(addresses)
      }

      const election = createElection(data, census)

      addQuestions(election, data.questions)

      const id = await client.createElection(election)

      console.log(id)

      // onClose()
      // onOpen()
    } catch (err) {
      throw new Error()
    } finally {
    }
  }

  useEffect(() => {
    if (!account) return
    methods.setValue(`addresses.${0}.address`, account.address)
  }, [account, methods])

  return (
    <FormProvider {...methods}>
      {/* <ModalWrapper isOpen={isOpen} onClose={onClose}>
        <ModalLoading />
      </ModalWrapper> */}
      <WrapperForm onSubmit={methods.handleSubmit(onSubmit)}>
        <>
          <CreateProcessHeader />
          <CreateProcessSettings />
          <CreateProcessAddresses />
          <CreateProcessQuestions />
          <Button type='submit' _dark={{ bg: 'black.c90' }}>
            Submit
          </Button>
        </>
      </WrapperForm>
    </FormProvider>
  )
}

export default CreateProcess
