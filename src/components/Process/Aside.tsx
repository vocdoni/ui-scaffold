import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { CensusMeta } from '@components/ProcessCreate/Steps/Confirm'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { VoteButton, environment } from '@vocdoni/chakra-components'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus, PublishedElection, dotobject } from '@vocdoni/sdk'
import { TFunction } from 'i18next'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { SpreadsheetAccess } from './SpreadsheetAccess'

const ProcessAside = ({ ...props }) => {
  const { t } = useTranslation()
  const { election, isAbleToVote, isInCensus, voted, votesLeft } = useElection()
  const [connected, setConnected] = useState<boolean>(false)
  const { isConnected } = useAccount()
  const { env } = useClient()
  const census: CensusMeta = dotobject(election.meta || {}, 'census')

  return (
    <Flex
      direction='column'
      justifyContent='center'
      alignItems='center'
      gap={12}
      p={12}
      w={84}
      mt={7}
      color='process.results.aside.color'
      background='aside_bg'
      borderRadius='lg'
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
      {census.type === 'spreadsheet' && !connected ? (
        <SpreadsheetAccess setConnected={setConnected} />
      ) : isConnected || connected ? (
        <>
          {isAbleToVote && <VoteButton w='full' borderRadius={30} p={7} color='process.results.aside.vote_btn_color' />}
          {!isInCensus && (
            <Text textAlign='center' fontSize='md'>
              {t('aside.is_not_in_census')}
            </Text>
          )}
          {voted !== null && voted.length > 0 && (
            <Box textAlign='center' fontSize='md'>
              <Link to={environment.verifyVote(env, voted)} target='_blank'>
                <Button w='full' color='process.results.aside.verify_color' mb={4} borderRadius={30} p={7}>
                  {t('aside.verify_vote_on_explorer')}
                </Button>
              </Link>
              <Text>{t('aside.has_already_voted').toString()}</Text>
            </Box>
          )}
          {hasOverwriteEnabled(election) && isInCensus && (
            <Text textAlign='center' fontSize='md'>
              {t('aside.overwrite_votes_left', { left: votesLeft })}
            </Text>
          )}
        </>
      ) : (
        <>
          <ConnectButton chainStatus='none' showBalance={false} label={t('menu.connect').toString()} />{' '}
          <Text textAlign='center' fontSize='sm'>
            {t('aside.not_connected')}
          </Text>
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
