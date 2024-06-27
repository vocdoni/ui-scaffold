import { useTranslation } from 'react-i18next'
import QuestionPage from './Question'

const ApprovalVoting = () => {
  const { t } = useTranslation()
  return (
    <QuestionPage
      title={t('form.process_create.question.approval_title')}
      description={t('form.process_create.question.approval_description')}
    />
  )
}

export default ApprovalVoting
