import { Box, Button, Card, Flex, Link, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { VoteButton as CVoteButton, environment, SpreadsheetAccess } from '@vocdoni/chakra-components'
import { useClient, useElection } from '@vocdoni/react-providers'
import { dotobject, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { CensusMeta } from '~components/ProcessCreate/Steps/Confirm'

const ProcessAside = () => {
  const { t } = useTranslation()
  const {
    election,
    connected,
    isInCensus,
    voted,
    votesLeft,
    loading: { voting },
  } = useElection()
  const { isConnected } = useAccount()
  const { env } = useClient()
  const census: CensusMeta = dotobject(election?.meta || {}, 'census')

  const renderVoteMenu =
    voted ||
    (voting && election?.electionType.anonymous) ||
    (hasOverwriteEnabled(election) && isInCensus && votesLeft > 0 && voted)

  return (
    <>
      <Card variant='aside'>
        <Flex alignItems='center' gap={5} flexWrap='wrap' justifyContent='center'>
          <Text textAlign='center' fontSize='xl' textTransform='uppercase'>
            {election?.electionType.anonymous && voting
              ? t('aside.submitting')
              : getStatusText(t, election?.status).toUpperCase()}
          </Text>

          {election?.status !== ElectionStatus.CANCELED &&
            election?.status !== ElectionStatus.UPCOMING &&
            !(election?.electionType.anonymous && voting) && (
              <Box
                className='brand-theme'
                display='flex'
                flexDirection='row'
                justifyContent='center'
                alignItems='center'
                gap={2}
              >
                <Trans
                  i18nKey='aside.votes'
                  components={{
                    span: <Text as='span' fontWeight='bold' fontSize='xl3' textAlign='center' lineHeight={1} />,
                    text: <Text fontSize='xl' textAlign='center' lineHeight={1.3} />,
                  }}
                  count={election?.voteCount}
                />
              </Box>
            )}
        </Flex>

        {census?.type !== 'spreadsheet' &&
          !isConnected &&
          !connected &&
          election?.status !== ElectionStatus.CANCELED && (
            <Flex flexDirection='column' alignItems='center' gap={3} w='full'>
              <Box display={{ base: 'none', md: 'block' }}>
                <ConnectButton chainStatus='none' showBalance={false} label={t('menu.connect').toString()} />
              </Box>
              <Text textAlign='center' fontSize='sm'>
                {t('aside.not_connected')}
              </Text>
            </Flex>
          )}

        {isConnected && !['spreadsheet', 'csp'].includes(census?.type) && !isInCensus && (
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
            {voting && election?.electionType.anonymous && (
              <Text fontSize='sm' textAlign='center' whiteSpace='pre-line'>
                {t('aside.voting_anonymous_advice')}
              </Text>
            )}
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
                variant='contrast'
              >
                {t('aside.verify_vote_on_explorer')}
              </Link>
            )}
          </Flex>
        )}
      </Card>
      {connected && (
        <Box
          alignSelf='center'
          sx={{
            '& button': {
              color: 'process.spreadsheet.disconnect_color_desktop',
              bgColor: 'transparent',
              borderColor: 'transparent',

              _before: {
                bgColor: 'transparent',
              },
              _after: {
                bgColor: 'transparent',
              },
            },
          }}
          mb={{ base: 10, md: 0 }}
        >
          <SpreadsheetAccess />
        </Box>
      )}
    </>
  )
}

export const VoteButton = ({ setQuestionsTab, ...props }: { setQuestionsTab: () => void }) => {
  const { t } = useTranslation()

  const { election, connected, isAbleToVote, isInCensus } = useElection()
  const census: CensusMeta = dotobject(election?.meta || {}, 'census')
  const { isConnected } = useAccount()

  if (
    election?.status === ElectionStatus.CANCELED ||
    (isConnected && !isInCensus && !['spreadsheet', 'csp'].includes(census?.type))
  )
    return null

  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      background='transparent'
      color='process.aside.color'
      py={3}
      px={{ base: 3, lg2: 0 }}
      {...props}
    >
      {census?.type !== 'spreadsheet' && !connected && (
        <ConnectButton.Custom>
          {({ account, chain, openConnectModal, authenticationStatus, mounted }) => {
            const ready = mounted && authenticationStatus !== 'loading'
            const connected =
              ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')
            return (
              <Box
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
                w='full'
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button onClick={openConnectModal} w='full'>
                        {t('menu.connect').toString()}
                      </Button>
                    )
                  }
                })()}
              </Box>
            )
          }}
        </ConnectButton.Custom>
      )}
      {census?.type === 'spreadsheet' && !connected && <SpreadsheetAccess />}
      {isAbleToVote && (
        <CVoteButton
          w='60%'
          fontSize='lg'
          height='50px'
          onClick={setQuestionsTab}
          sx={{
            '&::disabled': {
              opacity: '0.8',
            },
          }}
        />
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
