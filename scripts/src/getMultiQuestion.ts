import { Census, Election } from '@vocdoni/sdk'
import { DemoInterface } from './getDemoMeta'
import { CreateElectionFunctionType } from './utils/election'

export const getMultiQuestion: CreateElectionFunctionType = (census: Census, meta) => {
  const endDate = new Date(DemoInterface.endDate)
  const startDate = new Date(DemoInterface.date)

  //Procés "Adults" -> 1 procés amb 2 questions single choice
  const election = Election.from({
    startDate,
    endDate,
    census,
    voteType: {
      uniqueChoices: false,
    },
    title: {
      default: 'Multiple question',
    },
    description: `
    # Multiple question
    Multiple question project

    ## Welcome
    Initial description`,
    meta,
  })

  election.addQuestion('Inversió', 'Approve budget', [
    {
      title: 'A favor',
      value: 0,
    },
    {
      title: 'En contra',
      value: 1,
    },
    {
      title: 'En blanc',
      value: 2,
    },
  ])

  election.addQuestion('Approve the new candidature?', 'Approve the candidature of the candidate', [
    {
      title: 'A favor',
      value: 0,
    },
    {
      title: 'En contra',
      value: 1,
    },
    {
      title: 'En blanc',
      value: 2,
    },
  ])

  return election
}
