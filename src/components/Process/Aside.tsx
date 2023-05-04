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
      gap={2}
      py={2}
      px={3}
      w={{ base: 80, lg: 64, xl: 80 }}
      color='white'
      bgGradient='var(--vcd-gradient-brand)'
      borderRadius={6}
    >
      <Flex direction='column' alignItems='center'>
        <Text textAlign='center' fontWeight='700' fontSize='25px' lineHeight=' 125%'>
          {getStatusText(t, election?.status)}
        </Text>

        {election?.status !== ElectionStatus.CANCELED && (
          <Text fontWeight='400' fontSize='md' lineHeight=' 125%'>
            <Text as='span'>{election?.voteCount}</Text> {t('process.votes')}
          </Text>
        )}
      </Flex>
      {isConnected ? (
        <>
          <Text textAlign='center' fontWeight='400' fontSize='sm'>
            {isAbleToVote && t('aside.is_able_to_vote')}
            {!isAbleToVote && !isInCensus && t('aside.is_not_in_census')}
            {!isAbleToVote && hasAlreadyVoted && t('aside.has_already_voted')}
          </Text>
          <VoteButton label={t('aside.vote').toString()} color='process.vote_btn' />
        </>
      ) : (
        <>
          <Text textAlign='center' fontWeight='400' fontSize='sm'>
            {t('aside.not_connected')}
          </Text>
          <Flex justifyContent='center'>
            <ConnectButton chainStatus='none' showBalance={false} label={t('menu.connect').toString()} />
          </Flex>
        </>
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
