import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { VoteButton, useElection } from '@vocdoni/chakra-components'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'

const ProcessAside = ({ ...props }) => {
  const { t } = useTranslation()
  const { election, isAbleToVote, isInCensus, voted, votesLeft } = useElection()
  const { isConnected } = useAccount()

  return (
    <Flex
      direction='column'
      justifyContent='center'
      gap={2}
      py={4}
      px={6}
      w={{ base: 80, lg: 64, xl: 80 }}
      color='process.results.aside.color'
      bgGradient='var(--vcd-gradient-brand)'
      borderRadius={6}
      {...props}
    >
      <Flex direction='column' alignItems='center'>
        <Text textAlign='center' fontWeight='bold' fontSize='2xl' mb={2}>
          {getStatusText(t, election?.status)}
        </Text>

        {election?.status !== ElectionStatus.CANCELED && election?.status !== ElectionStatus.UPCOMING && (
          <Text>
            <Text as='span'>{election?.voteCount}</Text>{' '}
            {election?.status === ElectionStatus.ENDED || election?.status === ElectionStatus.RESULTS
              ? t('aside.votes_submited')
              : t('aside.votes')}
          </Text>
        )}
      </Flex>
      {isConnected ? (
        <>
          {isAbleToVote && (
            <Box textAlign='center' fontSize='sm'>
              <Text mb={2}>{t('aside.is_able_to_vote')}</Text>
              <VoteButton w='full' color='process.results.aside.vote_btn_color' />
            </Box>
          )}
          {!isInCensus && (
            <Text textAlign='center' fontSize='sm'>
              {t('aside.is_not_in_census')}
            </Text>
          )}
          {voted !== null && voted.length > 0 && (
            <Box textAlign='center' fontSize='sm'>
              <Text mb={2}>{t('aside.has_already_voted').toString()}</Text>
              <Link to='https://explorer.vote/verify/' target='_blank'>
                <Button w='full' color='process.results.aside.verify_color'>
                  {t('aside.verify_vote_on_explorer')}
                </Button>
              </Link>
            </Box>
          )}

          {hasOverwriteEnabled(election) && isInCensus && (
            <Text>{t('aside.overwrite_votes_left', { left: votesLeft })}</Text>
          )}
        </>
      ) : (
        <>
          <Text textAlign='center' fontSize='sm'>
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

const hasOverwriteEnabled = (election?: PublishedElection): boolean =>
  typeof election !== 'undefined' &&
  typeof election.voteType.maxVoteOverwrites !== 'undefined' &&
  election.voteType.maxVoteOverwrites > 0

const getStatusText = (t: TFunction<string, string>, electionStatus: ElectionStatus | undefined) => {
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
