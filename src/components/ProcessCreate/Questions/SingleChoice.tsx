import { useTranslation } from 'react-i18next'
import QuestionPage from './Question'

const SingleChoice = () => {
  const { t } = useTranslation()
  return (
    <QuestionPage
      title={t('form.process_create.question.title')}
      description={t('form.process_create.question.description')}
      isMultiQuestion
    />
  )
}

export default SingleChoice
