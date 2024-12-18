import { Box } from '@chakra-ui/react'
import { useElection } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'

export const Features = () => {
  const { election } = useElection()

  if (!(election instanceof PublishedElection)) return null

  return (
    <Box>
      {!election.electionType.secretUntilTheEnd && <Box>Live results</Box>}
      {election.electionType.anonymous && <Box>Anonymous</Box>}
      {election.electionType.interruptible && <Box>Interruptible</Box>}
      {election.voteType.maxVoteOverwrites > 0 && <Box>{election.voteType.maxVoteOverwrites} vote overwrites</Box>}
    </Box>
  )
}
