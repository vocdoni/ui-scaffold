import { Progress, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface CreationProgressProps {
  error: string | null
  sending: boolean
}

export const CreationProgress = ({ error, sending }: CreationProgressProps) => {
  const { t } = useTranslation()

  return (
    <Stack direction='column'>
      {!error && <Progress isIndeterminate />}

      {error ? <Text color='red.300'>{error}</Text> : <Text>{t('form.process_create.do_not_close')}</Text>}
    </Stack>
  )
}
