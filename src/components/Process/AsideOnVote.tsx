import { Box, Button, Flex, Link, Spinner, Text, useMediaQuery } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { environment, SpreadsheetAccess, VoteButton } from '@vocdoni/chakra-components'
import { useClient, useElection } from '@vocdoni/react-providers'
import { dotobject, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { CensusMeta } from '~components/ProcessCreate/Steps/ConfirmOnVote'

const ProcessAside = ({ setQuestionsTab }: { setQuestionsTab: () => void }) => {
  const { t } = useTranslation()
  const { election, connected, isAbleToVote, isInCensus, voted, votesLeft } = useElection()
  const { isConnected } = useAccount()
  const { env } = useClient()
  const census: CensusMeta = dotobject(election?.meta || {}, 'census')

  const renderVoteMenu = isAbleToVote || voted || (hasOverwriteEnabled(election) && isInCensus && voted)

  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)')

  return (
    <>
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        px={{ base: 12, md: 12 }}
        py={{ base: 8, md: 12 }}
        w='full'
        gap={4}
        mt={{ md: 7 }}
        mb={{ base: 7, md: 0 }}
        color='process.aside.color'
        background='process.aside.bg'
        boxShadow='var(--box-shadow-banner)'
        clipPath='polygon(0% 15px, 15px 15px, 15px 0%, calc(100% - 15px) 0%, calc(100% - 15px) 15px, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 15px calc(100% - 15px), 0% calc(100% - 15px))'
      >
        <Text textAlign='center' fontSize='xl3' fontFamily='pixeloid' textTransform='uppercase'>
          {getStatusText(t, election?.status).toUpperCase()}
        </Text>

        {election?.status !== ElectionStatus.CANCELED && election?.status !== ElectionStatus.UPCOMING && (
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            gap={2}
            fontFamily='pixeloid'
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
          <Box w='full' maxW='250px' mx='auto' display={{ base: 'none', md: 'block' }} border='1px solid red'>
            <SpreadsheetAccess />
          </Box>
        )}

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
            {isAbleToVote && isLargerThanMd && (
              <VoteButton variant='onvote-secondary' w='full' mb={0} onClick={setQuestionsTab} />
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
                display={{ base: 'inline-block', md: 'none' }}
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
      </Flex>
      {connected && (
        <Box
          display={{ base: 'none', md: 'block' }}
          alignSelf='center'
          sx={{
            '& button': {
              color: 'process.spreadsheet.disconnect_color_desktop',
              bgColor: 'transparent',
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
    <Flex justifyContent='center' alignItems='center' p={4} background='process.aside.bg' color='process.aside.color'>
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
                      <Button onClick={openConnectModal} variant='process' fontSize='lg'>
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
        <VoteButton variant='process' fontSize='lg' onClick={setQuestionsTab} />
      ) : (
        connected && (
          <Flex justifyContent='center' alignItems='center' height='40px' borderRadius='30px' bgColor='white' w='full'>
            <Spinner color='primary.500' />
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
