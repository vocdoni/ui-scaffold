import { Trans } from 'react-i18next'
import Questions from './Questions'

const SingleChoice = () => (
  <Questions
    title={<Trans i18nKey='form.process_create.question.title' />}
    description={<Trans i18nKey='form.process_create.question.description' />}
    isMultiQuestion
  />
)

export default SingleChoice
