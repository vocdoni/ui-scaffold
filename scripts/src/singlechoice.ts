import { Election, IVoteType, OffchainCensus } from '@vocdoni/sdk'
import { DemoInterface } from './demoMeta'
import { ELECTION_META } from './utils/constants'

export const getSinglechoiceElection = (census: OffchainCensus) => {
  const endDate = new Date(DemoInterface.endDate)
  const startDate = new Date(DemoInterface.date)

  const election = Election.from({
    startDate,
    endDate,
    census,
    voteType: {
      uniqueChoices: true,
    },
    title: {
      default: "Aprovació, si escau, del Reglament de l'Assemblea General Ordinària 2024.",
    },
    description: `
    # Projectes Multichoice
    Multichoice project selector

    ## Welcome
    Initial description`,
    meta: ELECTION_META,
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
