import { useTranslation } from 'react-i18next'
import { GiChoice } from 'react-icons/gi'
import { GenericFeatureObject } from '~components/ProcessCreate/Steps/TabsPage'
import SingleChoice from '~components/ProcessCreate/Questions/SingleChoice'
import ApprovalVoting from '~components/ProcessCreate/Questions/ApprovalVoting'

export const VotingTypeSingle = 'single'
export const UnimplementedVotingTypeApproval = 'approval'

export const MultiQuestionTypes = [VotingTypeSingle]

export type VotingType = typeof VotingTypeSingle | typeof UnimplementedVotingTypeApproval

export const VotingTypes = [VotingTypeSingle as VotingType, UnimplementedVotingTypeApproval as VotingType]

export const useVotingType = (): GenericFeatureObject<VotingType> => {
  const { t } = useTranslation()
  return {
    list: VotingTypes,
    defined: import.meta.env.features.voting_type as VotingType[],
    details: {
      [VotingTypeSingle]: {
        title: t('process_create.question.single_choice.title'),
        description: t('process_create.question.single_choice.description'),
        icon: GiChoice,
        component: SingleChoice,
      },
      [UnimplementedVotingTypeApproval]: {
        title: t('process_create.question.approval_voting.title'),
        description: t('process_create.question.approval_voting.description'),
        icon: GiChoice,
        component: ApprovalVoting,
      },
    },
  }
}
