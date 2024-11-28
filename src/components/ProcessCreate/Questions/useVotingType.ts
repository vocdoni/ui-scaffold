import { useTranslation } from 'react-i18next'
import { GiChoice } from 'react-icons/gi'
import ApprovalVoting from '~components/ProcessCreate/Questions/ApprovalVoting'
import SingleChoice from '~components/ProcessCreate/Questions/SingleChoice'
import { GenericFeatureObject } from '~components/ProcessCreate/Steps/TabsPage'

export const VotingTypeSingle = 'single'
export const VotingTypeApproval = 'approval'

export const MultiQuestionTypes = [VotingTypeSingle]

export type VotingType = typeof VotingTypeSingle | typeof VotingTypeApproval

export const VotingTypes = [VotingTypeSingle as VotingType, VotingTypeApproval as VotingType]

export const useVotingType = (): GenericFeatureObject<VotingType> => {
  const { t } = useTranslation()
  return {
    defined: VotingTypes,
    details: {
      [VotingTypeSingle]: {
        title: t('process_create.question.single_choice.title'),
        description: t('process_create.question.single_choice.description'),
        icon: GiChoice,
        component: SingleChoice,
      },
      [VotingTypeApproval]: {
        title: t('process_create.question.approval_voting.title'),
        description: t('process_create.question.approval_voting.description'),
        icon: GiChoice,
        component: ApprovalVoting,
      },
    },
  }
}
