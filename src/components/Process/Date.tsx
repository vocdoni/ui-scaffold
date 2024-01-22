import { Box, Text } from '@chakra-ui/react'
import { useElection } from '@vocdoni/react-providers'
import { ElectionStatus } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

export const ProcessDate = () => {
  const { election } = useElection()
  const { t } = useTranslation()

  if (!election?.startDate) return null

  const statusText = getStatusText(t, election.status)

  if (election.status === ElectionStatus.CANCELED) return null

  return (
    <Box
      title={t('process.date.relative', {
        date: election.startDate > new Date() ? election.startDate : election.endDate,
      })}
      cursor='help'
    >
      <Text fontWeight='bold'>{statusText}</Text>
      <Text>
        {t('process.date.relative', { date: election.startDate > new Date() ? election.startDate : election.endDate })}
      </Text>
    </Box>
  )
}

export const ProcessDateInline = () => {
  const { election } = useElection()
  const { t } = useTranslation()

  if (!election?.startDate) return null

  const status = getStatusText(t, election.status)

  return (
    <Text>
      {t('process.date.relative_inline', {
        status,
        date: election.startDate > new Date() ? election.startDate : election.endDate,
      })}
    </Text>
  )
}

const getStatusText = (t: TFunction<string, string>, electionStatus: ElectionStatus | undefined) => {
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
