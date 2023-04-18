import { EmailIcon } from '@chakra-ui/icons'
import { Box, Card, CardBody, CardHeader, Circle, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { HR, useClientContext, useElection, VoteButton } from '@vocdoni/react-components'
import { ElectionStatus } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

interface Props {
  isInCensus: boolean
  hasAlreadyVoted: boolean
  handleTabsChange: (index: number) => void
  order: any
  alignSelf: any
}

const ProcessAside = ({ handleTabsChange, isInCensus, hasAlreadyVoted, order, alignSelf }: Props) => {
  const { t } = useTranslation()
  const { election, isAbleToVote } = useElection()

  const { account } = useClientContext()

  return (
    <Card variant='process-info' order={order} alignSelf={alignSelf}>
      <CardHeader
        onClick={() => {
          if (election?.status === ElectionStatus.RESULTS) handleTabsChange(1)
        }}
        cursor={election?.status === ElectionStatus.RESULTS ? 'pointer' : 'normal'}
      >
        <Circle>
          <EmailIcon />
        </Circle>
        <Box>
          <Text>{getStatusText(t, election?.status)}</Text>

          {election?.status !== ElectionStatus.CANCELED && (
            <Text>
              <Text as='span'>{election?.voteCount}</Text> {t('process.votes')}
            </Text>
          )}
        </Box>
      </CardHeader>

      {election?.status === ElectionStatus.ONGOING && <HR />}

      {election?.status === ElectionStatus.ONGOING && account && (
        <CardBody>
          <Text textAlign='center'>
            {isAbleToVote && t('aside.is_able_to_vote')}
            {!isAbleToVote && !isInCensus && t('aside.is_not_in_census')}
            {!isAbleToVote && hasAlreadyVoted && t('aside.has_already_voted')}
          </Text>
          <VoteButton label={t('aside.vote').toString()} />
        </CardBody>
      )}
      {election?.status === ElectionStatus.ONGOING && !account && (
        <CardBody>
          <Box>
            <Text fontWeight='bold'>{t('aside.proposers')}: </Text>
            <Text>{t('aside.connect_your_wallet')}</Text>
            <Text fontWeight='bold'>{t('aside.voters')}: </Text>
            <Text>{t('aside.connect_and_vote')}</Text>
          </Box>
          <ConnectButton chainStatus='none' showBalance={false} label={t('aside.connect_to_vote').toString()} />
        </CardBody>
      )}
    </Card>
  )
}

const getStatusText = (t: TFunction<string, undefined, string>, electionStatus: ElectionStatus | undefined) => {
  switch (electionStatus) {
    case ElectionStatus.UPCOMING:
      return t('process.status.upcoming')
    case ElectionStatus.ENDED:
      return t('process.status.ended')
    case ElectionStatus.CANCELED:
      return t('process.status.canceled')
    case ElectionStatus.PAUSED:
      return t('process.status.paused')
    case ElectionStatus.ONGOING:
      return t('process.status.ongoing')
    case ElectionStatus.RESULTS:
      return t('process.status.results')
    default:
      return t('process.status.unknown')
  }
}

export default ProcessAside
