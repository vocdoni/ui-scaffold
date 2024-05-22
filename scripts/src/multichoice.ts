import { MultiChoiceElection, Census } from '@vocdoni/sdk'

import 'dotenv/config'
import { DemoInterface } from './demoMeta'
import { CreateElectionFunctionType } from './utils/election'

export const getMultichoiceElection: CreateElectionFunctionType = (census: Census, meta) => {
  const endDate = new Date(DemoInterface.endDate)
  const startDate = new Date(DemoInterface.date)

  const election = MultiChoiceElection.from({
    startDate,
    endDate,
    census,
    canAbstain: true,
    canRepeatChoices: false,
    maxNumberOfChoices: 4,
    electionType: {
      secretUntilTheEnd: false,
    },
    title: {
      default: 'Multichoice voting',
    },
    description: `
    # Projectes Multichoice
    Multichoice project selector

    ## Welcome
    Initial description`,
    meta,
  })

  election.addQuestion('Projectes', 'Selecciona dos projectes (també et pots abstenir-te en una o dues opcions).', [
    {
      title: 'Projecte arbitrari 1',
    },
    {
      title: 'Projecte de comunitat',
    },
    {
      title: 'Projecte de ciència',
    },
    {
      title: 'Projecte de tecnologia',
    },
    {
      title: 'Festota',
    },
  ])

  return election
}
