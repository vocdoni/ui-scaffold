import { Box, Text } from '@chakra-ui/react'
import { useElection } from '@vocdoni/react-components'
import { ElectionStatus } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'

export const ProcessDate = () => {
  const { election } = useElection()
  const { t } = useTranslation()

  if (!election) return null

  if (election.status === ElectionStatus.CANCELED) return null

  const now = new Date()

  return (
    <Box paddingX={4}>
      <Text color='process.date'>
        {election.startDate > now
          ? t('process.date.starts')
          : now < election.endDate
          ? t('process.date.ends')
          : t('process.date.ended')}
      </Text>
      <Text>
        {t('process.date.relative', { date: election.startDate > now ? election.startDate : election.endDate })}
      </Text>
    </Box>
  )
}
