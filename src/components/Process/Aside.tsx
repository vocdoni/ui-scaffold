import { Box, Button, Card, Flex, Link, Spinner, Text, useMediaQuery } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { environment, SpreadsheetAccess, VoteButton } from '@vocdoni/chakra-components'
import { useClient, useElection } from '@vocdoni/react-providers'
import { dotobject, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { CensusMeta } from '~components/ProcessCreate/Steps/Confirm'

const ProcessAside = ({ setQuestionsTab }: { setQuestionsTab: () => void }) => {
  const { t } = useTranslation()
  const {
    election,
    connected,
    isAbleToVote,
    isInCensus,
    voted,
    votesLeft,
    loading: { voting },
  } = useElection()
  const { isConnected } = useAccount()
  const { env } = useClient()
  const census: CensusMeta = dotobject(election?.meta || {}, 'census')

  const renderVoteMenu = isAbleToVote || voted || (hasOverwriteEnabled(election) && isInCensus && voted)

  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)')

  return (
    <>
      <Card variant='aside'>
        <Text textAlign='center' fontSize='xl3' fontFamily='pixeloidsans' textTransform='uppercase'>
          {election?.electionType.anonymous && voting
            ? t('aside.submitting')
            : getStatusText(t, election?.status).toUpperCase()}
        </Text>

        {election?.status !== ElectionStatus.CANCELED &&
          election?.status !== ElectionStatus.UPCOMING &&
          !(election?.electionType.anonymous && voting) && (
            <Box
              display='flex'
              flexDirection='row'
              justifyContent='center'
              alignItems='center'
              gap={2}
              fontFamily='pixeloidsans'
            >
              <Trans
                i18nKey='aside.votes'
                components={{
                  span: <Text as='span' fontWeight='bold' fontSize='xl6' textAlign='center' lineHeight={1} />,
                  text: <Text fontSize='xl2' textAlign='center' lineHeight={1.3} />,
                }}
                count={election?.voteCount}
              />
            </Box>
          )}

        {census?.type === 'spreadsheet' && !connected && (
          <Box w='full' maxW='250px' mx='auto' display={{ base: 'none', lg2: 'block' }}>
            <SpreadsheetAccess />
          </Box>
        )}

        {census?.type !== 'spreadsheet' &&
          !isConnected &&
          !connected &&
          election?.status !== ElectionStatus.CANCELED && (
            <Flex flexDirection='column' alignItems='center' gap={3} w='full'>
              <Box display={{ base: 'none', lg2: 'block' }}>
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
                              <Button onClick={openConnectModal} w='full' variant='secondary'>
                                {t('menu.connect').toString()}
                              </Button>
                            )
                          }
                        })()}
                      </Box>
                    )
                  }}
                </ConnectButton.Custom>
              </Box>
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
            {voting && election?.electionType.anonymous && (
              <Text fontSize='sm' textAlign='center' whiteSpace='pre-line'>
                {t('aside.voting_anonymous_advice')}
              </Text>
            )}
            {isAbleToVote && isLargerThanMd && (
              <VoteButton variant='secondary' w='full' mb={0} onClick={setQuestionsTab} />
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
                textDecoration='underline'
                _hover={{
                  textDecoration: 'none',
                }}
              >
                {t('aside.verify_vote_on_explorer')}
              </Link>
            )}
            {connected && (
              <Box
                display={{ base: 'inline-block', lg2: 'none' }}
                alignSelf='center'
                sx={{
                  '& button': {
                    color: 'process.spreadsheet.disconnect_color_mbl',
                    bgColor: 'transparent',
                  },
                }}
              >
                <SpreadsheetAccess />
              </Box>
            )}
          </Flex>
        )}
      </Card>
      {connected && (
        <Box
          display={{ base: 'none', md: 'block' }}
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
        >
          <SpreadsheetAccess />
        </Box>
      )}
    </>
  )
}

export const ProcessAsideFooterMbl = ({ setQuestionsTab }: { setQuestionsTab: () => void }) => {
  const { t } = useTranslation()

  const { election, connected, isAbleToVote, isInCensus, voted } = useElection()
  const census: CensusMeta = dotobject(election?.meta || {}, 'census')
  const { isConnected } = useAccount()

  if (
    election?.status === ElectionStatus.CANCELED ||
    !!voted ||
    (isConnected && !isInCensus && census?.type !== 'spreadsheet')
  )
    return null

  return (
    <Flex justifyContent='center' alignItems='center' p={4} background='#3375ff' color='process.aside.color'>
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
                      <Button onClick={openConnectModal} w='full' variant='secondary'>
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
      {isAbleToVote ? (
        <VoteButton w='full' variant='secondary' onClick={setQuestionsTab} />
      ) : (
        connected && (
          <Flex justifyContent='center' alignItems='center' height='40px' borderRadius='30px' bgColor='white' w='full'>
            <Spinner color='primary.700' />
          </Flex>
        )
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
