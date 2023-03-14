import { EmailIcon } from '@chakra-ui/icons'
import { Box, Button, Card, Circle, Flex, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { HR, useClientContext, useElection } from '@vocdoni/react-components'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const ProcessAside = () => {
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

  return (
    <Card variant='vote'>
      <Flex gap={4} alignItems='center'>
        <Circle
          bg='branding.lightpurple1'
          size={16}
          border='.1px solid'
          borderColor='branding.purple'
        >
          <EmailIcon color='branding.purple' boxSize={8} />
        </Circle>
        <Box>
          <Text fontSize='1.2em' fontWeight='bold'>
            Voting in progrees
          </Text>
          {election?.creationTime &&
            election?.creationTime &&
            election.creationTime < election.startDate && (
              <Text>
                <Text as='span' color='branding.purple'>
                  {election?.voteCount}
                </Text>{' '}
                votes cast so far!
              </Text>
            )}
        </Box>
      </Flex>
      <HR m={0} h='.2px' />
      {isConnected && (
        <Flex direction='column' gap={4}>
          <Text fontSize='.9em' textAlign='center'>
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
        </Flex>
      )}
      {!isConnected && (
        <Flex direction='column' alignItems='center' gap={4}>
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
        </Flex>
      )}
    </Card>
  )
}

export default ProcessAside
