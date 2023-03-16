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
import { useAccount } from 'wagmi'

const ProcessAside = ({ ...props }) => {
  const { isConnected } = useAccount()
  const { election } = useElection()
  const { client } = useClientContext()

  const [isAbleToVote, setIsAbleToVote] = useState<boolean>(false)
  const [abilityChecked, setAbilityChecked] = useState<boolean>(false)

  useEffect(() => {
    if (!client || abilityChecked) return

    client.isAbleToVote().then((res: any) => {
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
              ? 'Process in progress'
              : !hasVotingStarted
              ? 'Process will start'
              : 'Process finished'}
          </Text>
          <Text>
            <Text as='span'>{election?.voteCount}</Text> votes cast so far!
          </Text>
        </Box>
      </CardHeader>
      {hasVotingStarted && !hasVotingFinished && <HR />}

      {isConnected && hasVotingStarted && !hasVotingFinished && (
        <CardBody>
          <Text>
            {isAbleToVote
              ? 'Connected. You are elegible for voting.'
              : 'You are not elegible for voting'}
          </Text>
          <Button
            isDisabled={!isAbleToVote}
            type='submit'
            form='election-create-form'
            variant='brandVote'
          >
            Vote
          </Button>
        </CardBody>
      )}
      {!isConnected && hasVotingStarted && !hasVotingFinished && (
        <CardBody>
          <Box>
            <Text fontWeight='bold'>Proposers: </Text>
            <Text>
              Connect your wallet to view the status of the proposal..
            </Text>
            <Text fontWeight='bold'>Voters: </Text>
            <Text>Connect and vote on your favorite proposals</Text>
          </Box>
          <ConnectButton
            chainStatus='none'
            showBalance={false}
            label='Connect to vote'
          />
        </CardBody>
      )}
    </Card>
  )
}

export default ProcessAside
