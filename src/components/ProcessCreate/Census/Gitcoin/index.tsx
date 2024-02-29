import { Alert, AlertIcon, Spinner, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import { errorToString, useClient } from '@vocdoni/react-providers'
import { EnvOptions, TokenSummary, VocdoniCensus3Client } from '@vocdoni/sdk'
import { GitcoinForm } from '~components/ProcessCreate/Census/Gitcoin/GitcoinForm'
import Wrapper from '~components/ProcessCreate/Steps/Wrapper'

export type GitcoinStampToken = Omit<TokenSummary, 'externalID'> & {
  externalID: string // For stamp tokens externalID is not nullable
}

export const GitcoinStrategyBuilder = () => {
  const { t } = useTranslation()
  const { env } = useClient()

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
        const tks = await client.getSupportedTokens()
        const gitcoinTokens = tks.filter((tk) => tk.type === 'gitcoinpassport' && tk.externalID)
        setGitcoinTokens(gitcoinTokens as GitcoinStampToken[])
      } catch (err) {
        setError(errorToString(err))
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
