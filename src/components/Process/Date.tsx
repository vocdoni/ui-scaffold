import { Box, Text } from '@chakra-ui/react'
import { useElection } from '@vocdoni/chakra-components'
import { ElectionStatus } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

export const ProcessDate = () => {
  const { election } = useElection()
  const { t } = useTranslation()

  if (!election) return null

  const statusText = getStatusText(t, election.status)

  if (election.status === ElectionStatus.CANCELED) return null

  return (
    <Box>
      <Text color='process.date'>{statusText}</Text>
      <Text>
        {t('process.date.relative', { date: election.startDate > new Date() ? election.startDate : election.endDate })}
      </Text>
    </Box>
  )
}

const getStatusText = (t: TFunction<string, undefined, string>, electionStatus: ElectionStatus | undefined) => {
  switch (electionStatus) {
    case ElectionStatus.UPCOMING:
      return t('process.date.starts')
    case ElectionStatus.ONGOING:
    case ElectionStatus.PAUSED:
      return t('process.date.ends')
    case ElectionStatus.RESULTS:
    case ElectionStatus.ENDED:
      return t('process.date.ended')
    case ElectionStatus.CANCELED:
      return t('process.status.canceled')
    default:
      return null
  }
}
