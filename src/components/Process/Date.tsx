import { Box, Text } from '@chakra-ui/react'
import { useElection } from '@vocdoni/react-components'
import { useTranslation } from 'react-i18next'

export const ProcessDate = () => {
  const { election } = useElection()
  const { t } = useTranslation()

  if (!election) return null

  const now = new Date()

  return (
    <Box px={4} pt={1}>
      <Text color='branding.purple'>
        {election.startDate > now
          ? t('process.date.starts')
          : now < election.endDate
          ? t('process.date.ends')
          : t('process.date.ended')}
      </Text>
      <Text>{t('process.date.relative', { date: election.endDate })}</Text>
    </Box>
  )
}
