import { Trans } from 'react-i18next'
import Questions from './Questions'

const ApprovalVoting = () => (
  <Questions
    title={<Trans i18nKey='form.process_create.question.approval_title' />}
    description={<Trans i18nKey='form.process_create.question.approval_description' />}
  />
)

export default ApprovalVoting
