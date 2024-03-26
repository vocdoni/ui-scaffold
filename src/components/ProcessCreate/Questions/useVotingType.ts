import { useTranslation } from 'react-i18next'
import { GiChoice } from 'react-icons/gi'

export const VotingTypeSingle = 'single'

export type VotingType = typeof VotingTypeSingle

export const VotingTypes = [VotingTypeSingle as VotingType]

export const useVotingType = () => {
  const { t } = useTranslation()
  return {
    list: VotingTypes,
    defined: import.meta.env.features.voting_type as VotingType[],
    details: {
      [VotingTypeSingle]: {
        title: t('process_create.question.single_choice.title'),
        description: t('process_create.question.single_choice.description'),
        icon: GiChoice,
      },
    },
  }
}
