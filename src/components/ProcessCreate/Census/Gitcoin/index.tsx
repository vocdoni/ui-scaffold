import { Alert, AlertIcon, Flex, Spinner } from '@chakra-ui/react'
import { errorToString, useClient } from '@vocdoni/react-providers'
import { EnvOptions, TokenSummary, VocdoniCensus3Client } from '@vocdoni/sdk'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { GitcoinForm } from '~components/ProcessCreate/Census/Gitcoin/GitcoinForm'
import { useProcessCreationSteps } from '~components/ProcessCreate/Steps/use-steps'
import Wrapper from '~components/ProcessCreate/Steps/Wrapper'

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
        // Reset the values to prevent previous values when user go back from the confirm screen
        setValue('maxCensusSize', undefined)
        setValue('strategySize', undefined)
        setValue('accuracy', undefined)
        setValue('timeToCreateCensus', undefined)

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
      } catch (err) {
        setError(errorToString(err))
        setValue('gitcoinGPSToken', undefined)
        setValue('chain', undefined)
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
