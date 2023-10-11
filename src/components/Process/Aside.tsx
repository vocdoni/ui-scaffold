import { Box, Flex, Link, Spinner, Text } from '@chakra-ui/react'
import { CensusMeta } from '@components/ProcessCreate/Steps/Confirm'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SpreadsheetAccess, VoteButton, environment } from '@vocdoni/chakra-components'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus, PublishedElection, dotobject } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { ProcessDate } from './Date'

const ProcessAside = ({ setQuestionsTab }: { setQuestionsTab: () => void }) => {
  const { t } = useTranslation()
  const { election, connected, isAbleToVote, isInCensus, voted, votesLeft } = useElection()
  const { isConnected } = useAccount()
  const { env } = useClient()
  const census: CensusMeta = dotobject(election?.meta || {}, 'census')

  const renderVoteMenu = isAbleToVote || voted || (hasOverwriteEnabled(election) && isInCensus && voted)

  return (
    <Flex flexDirection='column' gap={2}>
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        p={{ base: 6, xl: 12 }}
        w='full'
        maxW={100}
        mt={7}
        color='process.aside.color'
        background='process.aside.bg'
        borderRadius='lg'
        boxShadow='var(--box-shadow-banner)'
      >
        <Text textAlign='center' fontSize='xl3' mb={6}>
          {getStatusText(t, election?.status).toUpperCase()}
        </Text>

        {election?.status !== ElectionStatus.CANCELED && election?.status !== ElectionStatus.UPCOMING && (
          <Flex flexDirection='row' justifyContent='center' alignItems='center' gap={2} mb={8}>
            <Trans
              i18nKey='aside.votes'
              components={{
                span: <Text as='span' fontWeight='bold' fontSize='xl6' textAlign='center' lineHeight={1} />,
                text: <Text fontSize='xl2' textAlign='center' lineHeight={1.3} />,
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
export const ProcessAsideBodyMbl = ({ setQuestionsTab }: { setQuestionsTab: () => void }) => {
  const { t } = useTranslation()
  const { election, connected, isAbleToVote, isInCensus, voted, votesLeft } = useElection()
  const { isConnected } = useAccount()
  const { env } = useClient()
  const census: CensusMeta = dotobject(election?.meta || {}, 'census')

  const renderVoteMenu = isAbleToVote || voted || (hasOverwriteEnabled(election) && isInCensus && voted)
  return (
    <Box
      p={4}
      background='process.aside.bg'
      borderRadius='xl'
      color='process.aside.color'
      boxShadow='var(--box-shadow-banner)'
      maxW={96}
      mx='auto'
    >
      <Flex w='full' justifyContent='space-between' alignItems='center'>
        <Text textAlign='center' fontSize='xl'>
          {getStatusText(t, election?.status).toUpperCase()}
        </Text>

        {election?.status !== 'CANCELED' && (
          <Box
            sx={{
              '& > div': {
                display: 'flex',
                gap: 1.5,

                '& p': {
                  color: 'white',
                  fontWeight: 'normal',
                },
              },
            }}
          >
            <ProcessDate />
          </Box>
        )}
      </Flex>

      {election?.status !== ElectionStatus.CANCELED && election?.status !== ElectionStatus.UPCOMING && (
        <Flex flexDirection='row' justifyContent='center' alignItems='center' gap={2}>
          <Trans
            i18nKey='aside.votes'
            components={{
              span: <Text as='span' fontWeight='bold' fontSize='xl6' textAlign='center' />,
              text: <Text fontSize='xl2' textAlign='center' />,
            }}
            count={election?.voteCount}
          />
        </Flex>
      )}
      {census?.type !== 'spreadsheet' && !isConnected && !connected && election?.status !== ElectionStatus.CANCELED && (
        <Text textAlign='center' fontSize='sm'>
          {t('aside.not_connected')}
        </Text>
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
          {hasOverwriteEnabled(election) && isInCensus && votesLeft > 0 && voted && (
            <Text fontSize='sm' textAlign='center'>
              {t('aside.overwrite_votes_left', { count: votesLeft })}
            </Text>
          )}
          {voted && <VoteButton variant='process' mb={0} onClick={setQuestionsTab} />}
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
      {connected && (
        <Flex justifyContent='center'>
          <SpreadsheetAccess />
        </Flex>
      )}
    </Box>
  )
}

export const ProcessAsideFooterMbl = ({ setQuestionsTab }: { setQuestionsTab: () => void }) => {
  const { t } = useTranslation()

  const { election, connected, isAbleToVote, isInCensus, voted } = useElection()
  const census: CensusMeta = dotobject(election?.meta || {}, 'census')
  const { isConnected } = useAccount()

  if (
    election?.status !== ElectionStatus.ONGOING ||
    !!voted ||
    (isConnected && !isInCensus && census?.type !== 'spreadsheet')
  )
    return null

  return (
    <Box>
      <Flex justifyContent='center' alignItems='center' p={4} background='process.aside.bg' color='process.aside.color'>
        {census?.type !== 'spreadsheet' && !connected && (
          <ConnectButton.Custom>
            {({ account, chain, openConnectModal, authenticationStatus, mounted }) => {
              const ready = mounted && authenticationStatus !== 'loading'
              const connected =
                ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')
              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          type='button'
                          style={{
                            height: '40px',
                            width: '100vw',
                            padding: 4,
                            color: 'black',
                            borderRadius: '30px',
                            fontSize: '16px',
                            fontWeight: 600,
                            backgroundColor: 'white',
                            display: 'inline-block',
                          }}
                        >
                          {t('menu.connect').toString()}
                        </button>
                      )
                    }
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>
        )}
        {census?.type === 'spreadsheet' && !connected && <SpreadsheetAccess />}
        {isAbleToVote ? (
          <VoteButton variant='process' mb={0} fontSize='md' onClick={setQuestionsTab} />
        ) : (
          connected && (
            <Flex
              justifyContent='center'
              alignItems='center'
              height='40px'
              borderRadius='30px'
              bgColor='white'
              w='full'
            >
              <Spinner color='primary.500' />
            </Flex>
          )
        )}
      </Flex>
    </Box>
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
