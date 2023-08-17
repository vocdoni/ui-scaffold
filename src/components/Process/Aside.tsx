import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { CensusMeta } from '@components/ProcessCreate/Steps/Confirm'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SpreadsheetAccess, VoteButton, environment } from '@vocdoni/chakra-components'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus, PublishedElection, dotobject } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'

const ProcessAside = ({ ...props }) => {
  const { t } = useTranslation()
  const { election, connected, isAbleToVote, isInCensus, voted, votesLeft } = useElection()
  const { isConnected } = useAccount()
  const { env } = useClient()
  const census: CensusMeta = dotobject(election?.meta || {}, 'census')

  const renderVoteMenu = isAbleToVote || voted || (hasOverwriteEnabled(election) && isInCensus && voted)

  return (
    <Flex flexDirection='column' alignItems='center' gap={2}>
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        gap={12}
        p={12}
        w={96}
        mt={7}
        color='process.results.aside.color'
        background='aside_bg'
        borderRadius='lg'
        boxShadow='var(--box-shadow-banner)'
        {...props}
      >
        <Text textAlign='center' fontSize='xl3' lineHeight={1}>
          {getStatusText(t, election?.status).toUpperCase()}
        </Text>

        {election?.status !== ElectionStatus.CANCELED && election?.status !== ElectionStatus.UPCOMING && (
          <Flex flexDirection='column' mb={1}>
            <Trans
              i18nKey='aside.votes'
              components={{
                tos: <Text as='span' fontWeight='bold' fontSize='xl6' textAlign='center' lineHeight={1} />,
                tos2: <Text fontSize='xl2' lineHeight={1} textAlign='center' mt={3} />,
              }}
              count={election?.voteCount}
            />
          </Flex>
        )}

        {census.type === 'spreadsheet' && !connected && <SpreadsheetAccess />}

        {census.type !== 'spreadsheet' &&
          !isConnected &&
          !connected &&
          election?.status !== ElectionStatus.CANCELED && (
            <Flex flexDirection='column' alignItems='center' gap={3} w='full'>
              <ConnectButton chainStatus='none' showBalance={false} label={t('menu.connect').toString()} />
              <Text textAlign='center' fontSize='sm'>
                {t('aside.not_connected')}
              </Text>
            </Flex>
          )}

        {isConnected && census.type !== 'spreadsheet' && !isInCensus && (
          <Text textAlign='center'>{t('aside.is_not_in_census')}</Text>
        )}

        {renderVoteMenu && (
          <Flex flexDirection='column' alignItems='center' gap={3} w='full'>
            {isAbleToVote && <VoteButton variant='process' mb={0} />}
            {voted !== null && voted.length > 0 && (
              <Box textAlign='center'>
                <Link to={environment.verifyVote(env, voted)} target='_blank'>
                  <Button w='full' variant='process'>
                    {t('aside.verify_vote_on_explorer')}
                  </Button>
                </Link>
                <Text>{t('aside.has_already_voted').toString()}</Text>
              </Box>
            )}
            {hasOverwriteEnabled(election) && isInCensus && voted && (
              <Text>{t('aside.overwrite_votes_left', { left: votesLeft })}</Text>
            )}
          </Flex>
        )}
      </Flex>
      {connected && <SpreadsheetAccess />}
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
    case ElectionStatus.PAUSED:
    case ElectionStatus.ONGOING:
      return t('process.status.active')
    case ElectionStatus.ENDED:
    case ElectionStatus.CANCELED:
    case ElectionStatus.RESULTS:
      return t('process.status.ended')
    default:
      return t('process.status.unknown')
  }
}

export default ProcessAside
