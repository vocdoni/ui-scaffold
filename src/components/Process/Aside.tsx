import { Box, Button, Flex, Link, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { VoteButton as CVoteButton, environment, SpreadsheetAccess, VoteWeight } from '@vocdoni/chakra-components'
import { useClient, useElection } from '@vocdoni/react-providers'
import { CensusType, dotobject, ElectionStatus, formatUnits, InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount, useDisconnect } from 'wagmi'
import { CensusMeta } from './Census/CensusType'
import { CspAuth } from './CSP/CSPAuthModal'

const results = (result: number, decimals?: number) =>
  decimals ? parseInt(formatUnits(BigInt(result), decimals), 10) : result

const ProcessAside = () => {
  const { t } = useTranslation()
  const { disconnect } = useDisconnect()
  const {
    election,
    connected,
    isInCensus,
    voted,
    votesLeft,
    loading: { voting },
  } = useElection()
  const { isConnected } = useAccount()
  const { env, clear } = useClient()

  if (election instanceof InvalidElection) return null

  const census: CensusMeta = dotobject(election?.meta || {}, 'census')

  const renderVoteMenu =
    voted ||
    (voting && election?.electionType.anonymous) ||
    (hasOverwriteEnabled(election) && isInCensus && votesLeft > 0 && voted)

  const showVoters =
    election?.status !== ElectionStatus.CANCELED &&
    election?.status !== ElectionStatus.UPCOMING &&
    !(election?.electionType.anonymous && voting)
  const showVotes = !election?.electionType.secretUntilTheEnd && election?.status !== ElectionStatus.UPCOMING

  let votes = 0
  if (election && showVotes && election?.questions.length) {
    const decimals = (election.meta as any)?.token?.decimals || 0
    // It just has to check the first question to get the total of votes.
    const question = election?.questions[0]
    const totalsAbstain = 'numAbstains' in question ? Number(question.numAbstains) : 0
    votes = question.choices.reduce((acc, curr) => acc + Number(curr.results), totalsAbstain)
    votes = results(votes, decimals)
  }

  const votersCount = election?.voteCount
  const isCSP = election.census.type === CensusType.CSP

  return (
    <Flex direction='column' border='1px solid' borderRadius='lg' borderColor='table.border' p={4} gap={2}>
      <Flex
        flexDirection='column'
        gap={5}
        flexWrap='wrap'
        border='1px solid'
        borderRadius='lg'
        borderColor='table.border'
        p={4}
      >
        <Text textAlign='center' fontSize='xl' textTransform='uppercase'>
          {election?.electionType.anonymous && voting
            ? t('aside.submitting')
            : getStatusText(t, election?.status).toUpperCase()}
        </Text>

        {showVoters && !showVotes && (
          <Flex direction={'row'} justifyContent='center' alignItems='center' gap={2}>
            <Trans
              i18nKey='aside.votes'
              components={{
                span: <Text as='span' fontWeight='bold' fontSize='3xl' lineHeight={1} />,
                text: <Text fontSize='xl' lineHeight={1.3} />,
              }}
              count={votersCount}
            />
          </Flex>
        )}

        {showVotes && (
          <Flex direction='column' justifyContent='center' alignItems='center' gap={2}>
            <Flex direction={'row'} justifyContent='center' alignItems='center' gap={2}>
              <Trans
                i18nKey='aside.votes_weight'
                components={{
                  span: <Text as='span' fontWeight='bold' fontSize='3xl' lineHeight={1} />,
                  text: <Text fontSize='xl' lineHeight={1.3} />,
                }}
                count={votes}
              />
            </Flex>
            {showVoters && votersCount !== votes && (
              <Flex direction={'row'} justifyContent='center' alignItems='center'>
                {'('}
                <Trans
                  i18nKey='aside.votes'
                  components={{
                    span: <Text as='span' fontWeight='bold' fontSize='md' lineHeight={1} mr={2} />,
                    text: <Text fontSize='md' lineHeight={1.3} />,
                  }}
                  count={election?.voteCount}
                />
                {')'}
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
      {isCSP && !connected && <CspAuth />}
      {census?.type !== 'spreadsheet' &&
        !isConnected &&
        !connected &&
        !isCSP &&
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
            <Text
              fontWeight='extrabold'
              fontSize='sm'
              sx={{
                color: 'green.500',
                _dark: { color: 'green.300' },
              }}
              textAlign='center'
            >
              {t('aside.has_already_voted').toString()}
            </Text>
          )}
          {voting && election?.electionType.anonymous && (
            <Text fontSize='sm' textAlign='center' whiteSpace='pre-line'>
              {t('aside.voting_anonymous_advice')}
            </Text>
          )}
          {hasOverwriteEnabled(election) && isInCensus && votesLeft > 0 && voted && (
            <Text fontSize='sm' color='texts.subtle' textAlign='center'>
              {t('aside.overwrite_votes_left', { count: votesLeft })}
            </Text>
          )}
          {voted !== null && voted.length > 0 && (
            <Link
              sx={{ _hover: { textDecoration: 'underline' } }}
              as={ReactRouterLink}
              to={environment.verifyVote(env, voted)}
              target='_blank'
              whiteSpace='nowrap'
            >
              {t('aside.verify_vote_on_explorer')}
            </Link>
          )}
        </Flex>
      )}
      {(connected || isConnected) && (
        <Box alignSelf='center' mb={{ base: 10, md: 0 }}>
          {connected && (
            <SpreadsheetAccess
              sx={{
                color: 'red',
                button: {
                  bg: 'transparent',
                  border: 'none',
                  color: 'red !important',
                  textDecoration: 'underline',
                  _hover: { textDecoration: 'none' },
                },
              }}
            />
          )}

          {isConnected && election?.get('census.type') !== 'spreadsheet' && (
            <Button
              variant='link'
              onClick={() => {
                disconnect()
                clear()
              }}
            >
              {t('cc.spreadsheet.logout')}
            </Button>
          )}
        </Box>
      )}
    </Flex>
  )
}

export const VoteButton = ({ setQuestionsTab, ...props }: { setQuestionsTab: () => void }) => {
  const { t } = useTranslation()

  const { election, connected, isAbleToVote, isInCensus } = useElection()
  const { isConnected } = useAccount()

  if (election instanceof InvalidElection || election?.status === ElectionStatus.CANCELED) {
    return null
  }

  const census: CensusMeta = dotobject(election?.meta || {}, 'census')
  const isCSP = election.census.type === CensusType.CSP

  if (isConnected && !isInCensus && !['spreadsheet', 'csp'].includes(census?.type)) {
    return null
  }

  const isWeighted = Number(election?.census.weight) !== election?.census.size

  return (
    <Flex
      direction={'column'}
      justifyContent='center'
      alignItems='center'
      background='transparent'
      py={3}
      px={{ base: 3, lg2: 0 }}
      {...props}
    >
      {!isCSP && census?.type !== 'spreadsheet' && !connected && (
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
      {isCSP && !connected && <CspAuth />}
      {census?.type === 'spreadsheet' && !connected && <SpreadsheetAccess />}
      {isAbleToVote && (
        <>
          <CVoteButton
            w='100%'
            fontSize='lg'
            height='50px'
            onClick={setQuestionsTab}
            sx={{
              '&::disabled': {
                opacity: '0.8',
              },
            }}
          />
          {isWeighted && <VoteWeight />}
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
