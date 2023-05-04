import { Flex, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { HR, useClient, useElection, VoteButton } from '@vocdoni/chakra-components'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'

interface Props {
  isInCensus: boolean
  hasAlreadyVoted: boolean
}

const ProcessAside = ({ isInCensus, hasAlreadyVoted }: Props) => {
  const { t } = useTranslation()
  const { election, isAbleToVote, votesLeft } = useElection()

  const { account } = useClient()

  return (
    <Flex
      direction='column'
      justifyContent='center'
      gap={4}
      bgGradient='var(--vcd-gradient-brand)'
      borderRadius={4}
      p={4}
      w={{ base: 80, lg: 64, xl: 80 }}
      color='white'
      position='sticky'
      top='72px'
    >
      <Flex direction='column' alignItems='center'>
        <Text textAlign='center' fontWeight='700' fontSize='25px' lineHeight=' 125%'>
          {getStatusText(t, election?.status)}
        </Text>

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
            {isAbleToVote && t('aside.is_able_to_vote').toString()}
            {!isAbleToVote && !isInCensus && t('aside.is_not_in_census').toString()}
            {!isAbleToVote && hasAlreadyVoted && t('aside.has_already_voted').toString()}{' '}
            {hasOverwriteEnabled(election) && isInCensus && t('aside.overwrite_votes_left', { left: votesLeft })}
          </Text>
          <VoteButton />
        </CardBody>
      )}
      {isConnected ? (
        <VoteButton color='process.vote_btn' label={t('aside.vote').toString()} />
      ) : (
        <Flex justifyContent='center'>
          <ConnectButton chainStatus='none' showBalance={false} label={t('menu.connect').toString()} />
        </Flex>
      )}
    </Flex>
  )
}

const hasOverwriteEnabled = (election: PublishedElection) =>
  typeof election.voteType.maxVoteOverwrites !== 'undefined' && election.voteType.maxVoteOverwrites > 0

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
