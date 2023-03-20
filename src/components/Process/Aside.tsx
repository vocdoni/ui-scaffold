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
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'

const ProcessAside = ({ ...props }) => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { election } = useElection()
  const { client } = useClientContext()

  const [isAbleToVote, setIsAbleToVote] = useState<boolean>(false)
  const [abilityChecked, setAbilityChecked] = useState<boolean>(false)

  useEffect(() => {
    if (!client || abilityChecked) return

    client.isAbleToVote().then((res) => {
      setIsAbleToVote(res)
      setAbilityChecked(true)
    })
  }, [client, abilityChecked])

  const hasVotingStarted =
    election?.creationTime &&
    election?.startDate &&
    election.creationTime < election.startDate

  const hasVotingFinished = election?.endDate && election.endDate < new Date()

  return (
    <Card variant='vote' {...props}>
      <CardHeader>
        <Circle>
          <EmailIcon />
        </Circle>
        <Box>
          <Text>
            {hasVotingStarted && !hasVotingFinished
              ? t('process.status.process_in_progress')
              : !hasVotingStarted
              ? t('process.status.process_will_start')
              : t('process.status.process_finished')}
          </Text>
          <Text>
            <Text as='span'>{election?.voteCount}</Text> {t('process.votes')}
          </Text>
        </Box>
      </CardHeader>
      {hasVotingStarted && !hasVotingFinished && <HR />}

      {isConnected && hasVotingStarted && !hasVotingFinished && (
        <CardBody>
          <Text>
            {isAbleToVote
              ? t('aside.is_able_to_vote')
              : t('aside.is_not_able_to_vote')}
          </Text>
          <Button
            isDisabled={!isAbleToVote}
            type='submit'
            form='election-create-form'
            variant='brandVote'
          >
            {t('aside.vote')}
          </Button>
        </CardBody>
      )}
      {!isConnected && hasVotingStarted && !hasVotingFinished && (
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
