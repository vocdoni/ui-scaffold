import { Flex, Link, Text } from '@chakra-ui/react'
import { CensusMeta } from '@components/ProcessCreate/Steps/Confirm'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SpreadsheetAccess, VoteButton, environment } from '@vocdoni/chakra-components'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus, PublishedElection, dotobject } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'

const ProcessAside = ({ setQuestionsTab }: { setQuestionsTab: () => void }) => {
  const { t } = useTranslation()
  const { election, connected, isAbleToVote, isInCensus, voted, votesLeft } = useElection()
  const { isConnected } = useAccount()
  const { env } = useClient()
  const census: CensusMeta = dotobject(election?.meta || {}, 'census')

  const renderVoteMenu = isAbleToVote || voted || (hasOverwriteEnabled(election) && isInCensus && voted)

  return (
    <Flex flexDirection='column' alignItems='center' gap={2} w='full'>
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        p={{ base: 6, xl: 12 }}
        w='full'
        maxW={{ base: 52, xl: 76 }}
        mt={7}
        color='process.aside.color'
        background='process.aside.bg'
        borderRadius='lg'
        boxShadow='var(--box-shadow-banner)'
      >
        <Text textAlign='center' fontSize={{ base: 'xl2', xl: 'xl3' }}>
          {getStatusText(t, election?.status).toUpperCase()}
        </Text>

        {election?.status !== ElectionStatus.CANCELED && election?.status !== ElectionStatus.UPCOMING && (
          <Flex flexDirection='column' mb={{ base: 3, xl: 5 }}>
            <Trans
              i18nKey='aside.votes'
              components={{
                span: <Text as='span' fontWeight='bold' fontSize={{ base: 'xl3', xl: 'xl6' }} textAlign='center' />,
                text: <Text fontSize={{ base: 'xl', xl: 'xl2' }} textAlign='center' />,
              }}
              count={election?.voteCount}
            />
          </Flex>
        )}

        {census?.type === 'spreadsheet' && !connected && <SpreadsheetAccess />}

        {census?.type !== 'spreadsheet' &&
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

        {isConnected && census?.type !== 'spreadsheet' && !isInCensus && (
          <Text textAlign='center' fontSize='sm'>
            {t('aside.is_not_in_census')}
          </Text>
        )}

        {renderVoteMenu && (
          <Flex flexDirection='column' alignItems='center' gap={3} w='full'>
            {voted !== null && voted.length > 0 && (
              <Text fontSize='sm' textAlign='center'>
                {t('aside.has_already_voted').toString()}
              </Text>
            )}
            {isAbleToVote && <VoteButton variant='process' mb={0} onClick={setQuestionsTab} />}
            {hasOverwriteEnabled(election) && isInCensus && votesLeft > 0 && voted && (
              <Text fontSize='sm' textAlign='center'>
                {t('aside.overwrite_votes_left', { count: votesLeft })}
              </Text>
            )}
            {voted !== null && voted.length > 0 && (
              <Link
                as={ReactRouterLink}
                to={environment.verifyVote(env, voted)}
                target='_blank'
                whiteSpace='nowrap'
                textDecoration='underline'
                _hover={{
                  textDecoration: 'none',
                }}
              >
                {t('aside.verify_vote_on_explorer')}
              </Link>
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
