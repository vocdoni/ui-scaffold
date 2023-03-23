import { EmailIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Circle,
  Text,
} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { HR, useClientContext, useElection } from '@vocdoni/react-components'
import { ElectionStatus } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'

const ProcessAside = ({ ...props }) => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { election } = useElection()
  const { client } = useClientContext()

  const [isInCensus, setIsInCensus] = useState<boolean>(false)
  const [hasAlreadyVoted, setHasAlreadyVoted] = useState<boolean>(false)

  useEffect(() => {
    console.log(election)
    if (!client) return

    if (election) {
      client.isInCensus(election.id).then((res) => {
        console.log(res)
        setIsInCensus(res)
      })

      // client.hasAlreadyVoted().then((res) => {
      //   setHasAlreadyVoted(res)
      // })
    }
  }, [client, election, isInCensus, hasAlreadyVoted])

  return (
    <Card variant='vote' {...props}>
      <CardHeader>
        <Circle>
          <EmailIcon />
        </Circle>
        <Box>
          <Text>
            {election?.status === ElectionStatus.UPCOMING &&
              t('process.status.upcoming')}
            {election?.status === ElectionStatus.ENDED &&
              t('process.status.ended')}
            {election?.status === ElectionStatus.CANCELED &&
              t('process.status.canceled')}
            {election?.status === ElectionStatus.PAUSED &&
              t('process.status.paused')}
            {election?.status === ElectionStatus.ONGOING &&
              t('process.status.ongoing')}
            {election?.status === ElectionStatus.RESULTS &&
              t('process.status.results')}
            {election?.status === ElectionStatus.PROCESS_UNKNOWN &&
              t('process.status.unknown')}
          </Text>
          <Text>
            <Text as='span'>{election?.voteCount}</Text> {t('process.votes')}
          </Text>
        </Box>
      </CardHeader>
      {election?.status === ElectionStatus.ONGOING && <HR />}

      {isConnected && election?.status === ElectionStatus.ONGOING && (
        <CardBody>
          <Text textAlign='center'>
            {isInCensus && !hasAlreadyVoted && t('aside.is_able_to_vote')}
            {!isInCensus && t('aside.is_not_in_census')}
            {hasAlreadyVoted && t('aside.has_already_voted')}
          </Text>
          <Button
            isDisabled={!isInCensus || hasAlreadyVoted}
            type='submit'
            form='election-create-form'
            variant='brandVote'
          >
            {t('aside.vote')}
          </Button>
        </CardBody>
      )}
      {!isConnected && election?.status === ElectionStatus.ONGOING && (
        <CardBody>
          <Box>
            <Text fontWeight='bold'>{t('aside.proposers')}: </Text>
            <Text>{t('aside.connect_your_wallet')}</Text>
            <Text fontWeight='bold'>{t('aside.voters')}: </Text>
            <Text>{t('aside.connect_and_vote')}</Text>
          </Box>
          <ConnectButton
            chainStatus='none'
            showBalance={false}
            label={t('aside.connect_to_vote').toString()}
          />
        </CardBody>
      )}
    </Card>
  )
}

export default ProcessAside
