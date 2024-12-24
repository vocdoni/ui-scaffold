import { Box } from '@chakra-ui/react'
import { useElection } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { Trans } from 'react-i18next'

export const Features = () => {
  const { election } = useElection()

  if (!(election instanceof PublishedElection)) return null

  return (
    <Box>
      {!election.electionType.secretUntilTheEnd && (
        <Box>
          <Trans i18nKey='features.live_results'>Live results</Trans>
        </Box>
      )}
      {election.electionType.anonymous && (
        <Box>
          <Trans i18nKey='features.anonymous'>Anonymous</Trans>
        </Box>
      )}
      {election.electionType.interruptible && (
        <Box>
          <Trans i18nKey='features.interruptible'>Interruptible</Trans>
        </Box>
      )}
      {election.voteType.maxVoteOverwrites > 0 && (
        <Box>
          <Trans i18nKey='features.overwrite'>Vote overwrite</Trans>
        </Box>
      )}
    </Box>
  )
}
