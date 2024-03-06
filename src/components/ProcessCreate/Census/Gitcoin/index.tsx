import { Alert, AlertIcon, Spinner, Stack } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { errorToString, useClient } from '@vocdoni/react-providers'
import { EnvOptions, TokenSummary, VocdoniCensus3Client } from '@vocdoni/sdk'
import { GitcoinForm } from '~components/ProcessCreate/Census/Gitcoin/GitcoinForm'
import Wrapper from '~components/ProcessCreate/Steps/Wrapper'
import { StampId } from '~components/ProcessCreate/Census/Gitcoin/StampIcon'
import { useFormContext } from 'react-hook-form'
import { useProcessCreationSteps } from '~components/ProcessCreate/Steps/use-steps'

export type GitcoinStampToken = Omit<TokenSummary, 'externalID'> & {
  externalID: StampId // For stamp tokens externalID is not nullable
}

export const GitcoinStrategyBuilder = () => {
  const { env } = useClient()

  const { setValue } = useFormContext()
  const { form } = useProcessCreationSteps()

  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [gitcoinTokens, setGitcoinTokens] = useState<GitcoinStampToken[]>([])

  const client = useMemo(
    () =>
      new VocdoniCensus3Client({
        env: env as EnvOptions,
      }),
    [env]
  )

  // UseEffect to fetch tokens and filter by the tag gitcoin
  useEffect(() => {
    // fetch tokens and chains
    ;(async () => {
      setLoading(true)
      setError(undefined)
      try {
        // Get Gitcoin tokens
        const tks = await client.getSupportedTokens()
        let ct: TokenSummary | undefined
        const gitcoinTokens = tks.filter((tk) => {
          // Store gitcoin passport score on other place
          if (tk.type === 'gitcoinpassport' && !tk.externalID) {
            ct = tk
            setValue('censusToken', tk)
            return false
          }
          return tk.type === 'gitcoinpassport' && tk.externalID
        })
        setGitcoinTokens(gitcoinTokens as GitcoinStampToken[])

        // Get gitcoin passport token info
        if (!ct) throw new Error('Error finding gitcoin passport token')
        const { size, timeToCreateCensus, accuracy } = await client.getStrategyEstimation(
          ct.defaultStrategy,
          form.electionType.anonymous
        )
        setValue('accuracy', accuracy)
        setValue('strategySize', size)
        setValue('timeToCreateCensus', timeToCreateCensus)
      } catch (err) {
        setError(errorToString(err))
        setValue('censusToken', undefined)
        setValue('strategySize', undefined)
      }
      setLoading(false)
    })()
  }, [client])

  return (
    <Wrapper>
      {loading ? <Spinner mt={10} /> : !error && <GitcoinForm gitcoinTokens={gitcoinTokens} />}
      {error && (
        <Alert status='error'>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Wrapper>
  )
}
