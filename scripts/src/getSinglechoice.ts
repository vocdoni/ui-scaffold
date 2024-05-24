import { Census, Election } from '@vocdoni/sdk'
import { DemoMeta } from './getDemoMeta'
import { CreateElectionFunctionType } from './utils/election'

export const getSinglechoiceElection: CreateElectionFunctionType = (census: Census, meta) => {
  const endDate = new Date(DemoMeta.endDate)
  const startDate = new Date(DemoMeta.date)

  const election = Election.from({
    startDate,
    endDate,
    census,
    voteType: {
      uniqueChoices: true,
    },
    title: {
      default: 'Single choice',
    },
    description: `
    # Single choice
    Single choice project

    ## Welcome
    Initial description`,
    meta,
  })
  election.addQuestion("Aprovació, si escau, del Reglament de l'Assemblea General Ordinària 2024.", '', [
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
