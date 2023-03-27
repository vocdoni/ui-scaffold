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
import { TFunction } from 'i18next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const ProcessAside = ({ ...props }) => {
  const { t } = useTranslation()
  const { election } = useElection()
  const { client, account } = useClientContext()

  const [isInCensus, setIsInCensus] = useState<boolean>(false)
  const [hasAlreadyVoted, setHasAlreadyVoted] = useState<boolean>(false)

  useEffect(() => {
    if (!client || !election || !account) return

    client
      .isInCensus(election?.id)
      .then((res) => {
        setIsInCensus(res)
      })
      .catch(console.log)

    client
      .hasAlreadyVoted(election?.id)
      .then((res) => {
        setHasAlreadyVoted(res)
      })
      .catch(console.log)
  }, [account, client, election, isInCensus, hasAlreadyVoted])

  return (
    <Card variant='vote' {...props}>
      <CardHeader>
        <Circle>
          <EmailIcon />
        </Circle>
        <Box>
          <Text>{getStatusText(t, election?.status)}</Text>

          <Text>
            <Text as='span'>{election?.voteCount}</Text> {t('process.votes')}
          </Text>
        </Box>
      </CardHeader>

      {election?.status === ElectionStatus.ONGOING && <HR />}

      {election?.status === ElectionStatus.ONGOING && account && (
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
      {election?.status === ElectionStatus.ONGOING && !account && (
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

const getStatusText = (
  t: TFunction<'translation', undefined, 'translation'>,
  electionStatus: ElectionStatus | undefined
) => {
  console.log(electionStatus)
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
