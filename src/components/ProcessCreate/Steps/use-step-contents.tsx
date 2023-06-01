import { useTranslation } from 'react-i18next'
import { Census } from './Census'
import { Checks } from './Checks'
import { Confirm } from './Confirm'
import { Info } from './Info'
import { Questions } from './Questions'

export const useStepContents = () => {
  const { t } = useTranslation()
  const steps = [
    { title: t('form.process_create.steps.checks'), Contents: Checks },
    { title: t('form.process_create.steps.info'), Contents: Info, first: true },
    { title: t('form.process_create.steps.questions'), Contents: Questions },
    { title: t('form.process_create.steps.census'), Contents: Census },
    { title: t('form.process_create.steps.confirm'), Contents: Confirm },
  ]

  return steps
}
