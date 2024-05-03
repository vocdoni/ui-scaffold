import { Election, OffchainCensus } from '@vocdoni/sdk'
import { DemoInterface } from './demoMeta'

export const getMultiQuestion = (census: OffchainCensus) => {
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
