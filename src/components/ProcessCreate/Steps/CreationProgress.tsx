import { Progress, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CreationProgressProps {
  error: string | null
  sending: boolean
}

export const CreationProgress = ({ error, sending }: CreationProgressProps) => {
  const [step, setStep] = useState<number>(-1)
  const { t } = useTranslation()
  const steps = [
    t('form.process_create.confirm.creating'),
    t('form.process_create.confirm.adding_census'),
    t('form.process_create.confirm.submitting'),
    t('form.process_create.confirm.validating'),
    t('form.process_create.confirm.completed'),
  ]

  useEffect(() => {
    if (error) return
    if (!sending) {
      setStep(steps.length)
      return
    }

    const to = window.setInterval(() => {
      setStep(() => step + 1)
    }, 6000)

    return () => {
      if (to) window.clearInterval(to)
    }
  }, [error, sending, step, steps.length])

  return (
    <>
      <Stack direction='column'>
        {!error && <Progress isIndeterminate />}

        {error ? <Text color='red.300'>{error}</Text> : <Text>{t('form.process_create.do_not_close')}</Text>}
      </Stack>
    </>
  )
}
