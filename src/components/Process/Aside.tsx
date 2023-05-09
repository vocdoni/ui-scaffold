import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { VoteButton, useElection } from '@vocdoni/chakra-components'
import { ElectionStatus } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'

const ProcessAside = () => {
  const { t } = useTranslation()
  const { election, isAbleToVote, isInCensus, voted } = useElection()
  const { isConnected } = useAccount()

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
          <Box textAlign='center' fontWeight='400' fontSize='sm'>
            {isAbleToVote && (
              <>
                <Text mb={2}>{t('aside.is_able_to_vote')}</Text>
                <VoteButton w='full' color='black' />
              </>
            )}
            {!isInCensus && t('aside.is_not_in_census')}
            {voted !== null && voted.length > 0 && (
              <Link to='https://explorer.vote/verify/' target='_blank'>
                <Button w='full' color='black'>
                  Verify your vote
                </Button>
              </Link>
            )}
          </Box>
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
