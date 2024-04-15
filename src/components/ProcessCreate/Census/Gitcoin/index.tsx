import { Alert, AlertIcon, Flex, Spinner } from '@chakra-ui/react'
import { errorToString, useClient } from '@vocdoni/react-providers'
import { EnvOptions, TokenSummary, VocdoniCensus3Client } from '@vocdoni/sdk'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { GitcoinForm } from '~components/ProcessCreate/Census/Gitcoin/GitcoinForm'
import { useProcessCreationSteps } from '~components/ProcessCreate/Steps/use-steps'
import Wrapper from '~components/ProcessCreate/Steps/Wrapper'
import { DefaultCensusSize } from '~constants'

export type GitcoinStampToken = Omit<TokenSummary, 'externalID'> & {
  externalID: string // For stamp tokens externalID is not nullable
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
            setValue('gitcoinGPSToken', tk)
            setValue('chain', tk.chainID)
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
        const initialValue = size < DefaultCensusSize ? size : DefaultCensusSize
        setValue('maxCensusSize', initialValue)
      } catch (err) {
        setError(errorToString(err))
        setValue('gitcoinGPSToken', undefined)
        setValue('chain', undefined)
        setValue('strategySize', undefined)
      }
      setLoading(false)
    })()
  }, [client])

  return (
    <Wrapper>
      {loading ? (
        <Flex justifyContent='center'>
          <Spinner mt={10} />
        </Flex>
      ) : (
        !error && <GitcoinForm gitcoinTokens={gitcoinTokens} />
      )}
      {error && (
        <Alert status='error'>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Wrapper>
  )
}
