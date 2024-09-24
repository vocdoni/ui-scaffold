import { useTranslation } from 'react-i18next'

import { GoNumber } from 'react-icons/go'
import { ImListNumbered } from 'react-icons/im'
import { MdOutlineLibraryAddCheck } from 'react-icons/md'
import { GenericFeatureObject } from '~components/ProcessCreate/Steps/TabsPage'

export const UnimplementedVotingTypeMulti = 'multi'
export const UnimplementedVotingTypeParticipatory = 'participatory'
export const UnimplementedVotingTypeBorda = 'borda'

export type UnimplementedVotingType =
  | typeof UnimplementedVotingTypeMulti
  | typeof UnimplementedVotingTypeParticipatory
  | typeof UnimplementedVotingTypeBorda

export const UnimplementedVotingType = [
  UnimplementedVotingTypeMulti as UnimplementedVotingType,
  UnimplementedVotingTypeParticipatory as UnimplementedVotingType,
  UnimplementedVotingTypeBorda as UnimplementedVotingType,
]

export const useUnimplementedVotingType = (): GenericFeatureObject<UnimplementedVotingType> => {
  const { t } = useTranslation()
  return {
    defined: import.meta.env.features.unimplemented_voting_type as UnimplementedVotingType[],
    details: {
      [UnimplementedVotingTypeMulti]: {
        title: t('process_create.question.multi_choice.title'),
        description: t('process_create.question.multi_choice.description'),
        icon: MdOutlineLibraryAddCheck,
      },
      [UnimplementedVotingTypeParticipatory]: {
        title: t('process_create.question.participation_budgeting.title'),
        description: t('process_create.question.participation_budgeting.description'),
        icon: GoNumber,
      },
      [UnimplementedVotingTypeBorda]: {
        title: t('process_create.question.borda_count.title'),
        description: t('process_create.question.borda_count.description'),
        icon: ImListNumbered,
      },
    },
  }
}
