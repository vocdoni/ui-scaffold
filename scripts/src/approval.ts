import { ApprovalElection, OffchainCensus } from '@vocdoni/sdk'

import { DemoInterface } from './demoMeta'

export const getApprovalElection = (census: OffchainCensus) => {
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
    meta: {
      generated: 'script',
      census: {
        type: 'spreadsheet',
        fields: ['DNI', 'Data de Naixement'], //TODO: get from spreadsheet
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
