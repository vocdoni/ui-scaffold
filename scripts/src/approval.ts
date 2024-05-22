import { ApprovalElection, Census } from '@vocdoni/sdk'

import { DemoInterface } from './demoMeta'
import { CreateElectionFunctionType } from './utils/election'

export const getApprovalElection: CreateElectionFunctionType = (census: Census, meta) => {
  const endDate = new Date(DemoInterface.endDate)
  const startDate = new Date(DemoInterface.date)

  const election = ApprovalElection.from({
    title: 'Approval election',
    endDate,
    startDate,
    census,
    electionType: {
      secretUntilTheEnd: false,
    },
    description: `
      # Projectes Approval
      Approval project selector

      ## Welcome
      Initial description
      `,
    meta,
  })

  election.addQuestion('Projectes', 'Sel·lecciona les teves opcions preferides', [
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
