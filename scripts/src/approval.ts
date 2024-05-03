import { ApprovalElection, OffchainCensus, VocdoniSDKClient } from '@vocdoni/sdk'

import { DemoInterface } from './demoMeta'

export const getApprovalElection = (census: OffchainCensus) => {
  const endDate = new Date(DemoInterface.endDate)
  const startDate = new Date(DemoInterface.date)
  console.log('end date:', endDate.toLocaleString())
  console.log('start date:', startDate.toLocaleString())

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
    meta: {
      generated: 'script',
      census: {
        type: 'spreadsheet',
        fields: ['Nom', 'Cognoms', 'Email'], // TODO
        specs: {
          'Data de Naixement': {
            value: '^[0-9]{2}/[0-9]{2}/[0-9]{4}$',
            message: "Ha d'estar en format dd/mm/aaaa",
          },
        },
      },
    },
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
