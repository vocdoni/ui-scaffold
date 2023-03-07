import {
  Census,
  Election,
  PlainCensus,
  UnpublishedElection,
  WeightedCensus,
} from '@vocdoni/sdk'
import {
  Address,
  FormValues,
  Option,
  Question,
} from '../../components/CreateProcess'

interface PropsQuestionFormatted {
  title: string
  description: string
  options: PropsOptionsQuestionFormatted[]
}

interface PropsOptionsQuestionFormatted {
  title: string
  value: number
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

export const handleElection = async (
  formValues: FormValues,
  census: Census
) => {
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
