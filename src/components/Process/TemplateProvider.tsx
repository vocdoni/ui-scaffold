import { createContext, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

const TemplateContext = createContext(undefined)

export const TemplateProvider = ({ children }) => {
  const { t } = useTranslation()
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null)

  const placeholders = {
    annual_general_meeting: {
      title: t('process.template.annual_general_meeting.title', {
        defaultValue: 'Annual General Meeting',
      }),
      description: t('process.template.annual_general_meeting.description', {
        defaultValue: 'Set up your annual general meeting',
      }),
      questions: [
        {
          title: t('process.template.annual_general_meeting.q1.title', {
            defaultValue: 'Approve the annual budget',
          }),
          description: t('process.template.annual_general_meeting.q1.description', {
            defaultValue: 'Do you approve the proposed budget for the next fiscal year?',
          }),
          options: [
            { option: t('process.template.annual_general_meeting.q1.option_1', { defaultValue: 'Yes' }) },
            { option: t('process.template.annual_general_meeting.q1.option_2', { defaultValue: 'No' }) },
          ],
        },
        {
          title: t('process.template.annual_general_meeting.q2.title', {
            defaultValue: 'Elect new board members',
          }),
          description: t('process.template.annual_general_meeting.q2.description', {
            defaultValue: 'Choose the new members for the board of directors.',
          }),
          options: [
            { option: t('process.template.annual_general_meeting.q2.option_1', { defaultValue: 'Candidate A' }) },
            { option: t('process.template.annual_general_meeting.q2.option_2', { defaultValue: 'Candidate B' }) },
          ],
        },
        {
          title: t('process_create.question.title.placeholder', {
            defaultValue: 'Add a title to the question',
          }),
          description: t('process.create.question.description.placeholder', {
            defaultValue: 'Add the description of the question here (optional)...',
          }),
        },
      ],
    },
    election: {
      title: t('process.template.election.title', {
        defaultValue: 'Election Process',
      }),
      description: t('process.template.election.description', {
        defaultValue: 'Set up your organization’s election process.',
      }),
      questions: [
        {
          title: t('process.template.election.q1.title', {
            defaultValue: 'Who should be the next president?',
          }),
          description: t('process.template.election.q1.description', {
            defaultValue: 'Choose the best candidate to represent your interests.',
          }),
          options: [
            { option: t('process.template.election.q1.option_1', { defaultValue: 'Candidate A' }) },
            { option: t('process.template.election.q1.option_2', { defaultValue: 'Candidate B' }) },
            { option: t('process.template.election.q1.option_3', { defaultValue: 'Candidate C' }) },
          ],
        },
      ],
    },
    participatory_budgeting: {
      title: t('process.template.participatory_budgeting.title', {
        defaultValue: 'Participatory Budgeting Cards',
      }),
      description: t('process.template.participatory_budgeting.description', {
        defaultValue: 'Template for community decision-making on budget allocation with project cards.',
      }),
      questions: [
        {
          options: [
            {
              option: t('process.template.participatory_budgeting.q1.option_1', { defaultValue: 'Project A' }),
              description: t('process.template.participatory_budgeting.q1.option_1_desc', {
                defaultValue: 'Description of Project A',
              }),
              budget: 1000,
            },
            {
              option: t('process.template.participatory_budgeting.q1.option_1', { defaultValue: 'Project B' }),
              description: t('process.template.participatory_budgeting.q1.option_2_desc', {
                defaultValue: 'Description of Project B',
              }),
              budget: 2000,
            },
            {
              option: t('process.template.participatory_budgeting.q1.option_1', { defaultValue: 'Project C' }),
              description: t('process.template.participatory_budgeting.q1.option_3_desc', {
                defaultValue: 'Description of Project C',
              }),
              budget: 1500,
            },
          ],
        },
      ],
    },
  }

  return (
    <TemplateContext.Provider value={{ placeholders, activeTemplate, setActiveTemplate }}>
      {children}
    </TemplateContext.Provider>
  )
}

export function useProcessTemplates() {
  const context = useContext(TemplateContext)
  if (!context) {
    throw new Error('useProcessTemplates must be used within a TemplateProvider')
  }
  return context
}
