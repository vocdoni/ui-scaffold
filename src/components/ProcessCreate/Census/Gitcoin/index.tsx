import { Alert, AlertIcon, Spinner, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import { errorToString, useClient } from '@vocdoni/react-providers'
import { EnvOptions, TokenSummary, VocdoniCensus3Client } from '@vocdoni/sdk'
import { GitcoinForm } from '~components/ProcessCreate/Census/Gitcoin/GitcoinForm'

export const GitcoinStrategyBuilder = () => {
  const { t } = useTranslation()
  const { env } = useClient()

  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [gitcoinTokens, setGitcoinTokens] = useState<TokenSummary[]>([])

  const required = {
    value: true,
    message: t('form.error.field_is_required'),
  }

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
        const gitcoinTokens = tks.filter((tk) => tk.type === 'gitcoinpassport')
        setGitcoinTokens(gitcoinTokens)
      } catch (err) {
        setError(errorToString(err))
      }
      setLoading(false)
    })()
  }, [client])

  return (
    <Stack w='full' direction='column' gap={3} alignItems='center'>
      {loading ? <Spinner mt={10} /> : !error && <GitcoinForm gitcoinTokens={gitcoinTokens} />}
      {error && (
        <Alert status='error'>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Stack>
  )
}
