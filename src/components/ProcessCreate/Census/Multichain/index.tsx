import { useEffect, useMemo, useState } from 'react'
import { errorToString, useClient } from '@vocdoni/react-providers'
import { EnvOptions, ICensus3SupportedChain, VocdoniCensus3Client } from '@vocdoni/sdk'
import { Alert, AlertIcon, Spinner } from '@chakra-ui/react'
import Wrapper from '~components/ProcessCreate/Steps/Wrapper'
import { MultiChainForm } from '~components/ProcessCreate/Census/Multichain/MultiChainForm'

export const MultichainStrategyBuilder = () => {
  const { env } = useClient()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [chains, setChains] = useState<ICensus3SupportedChain[]>([])
  const client = useMemo(
    () =>
      new VocdoniCensus3Client({
        env: env as EnvOptions,
      }),
    [env]
  )

  useEffect(() => {
    // fetch tokens and chains
    ;(async () => {
      setLoading(true)
      setError(undefined)
      try {
        const chs = await client.getSupportedChains()
        // Sort chains with the order: eth, gor, matic, maticmum, and the rest in alphabetical order
        const order: {
          [key: string]: number
          eth: number
          gor: number
          matic: number
          maticmum: number
        } = {
          eth: 1,
          gor: 2,
          matic: 3,
          maticmum: 4,
        }

        const filteredChains = ['sep']
        const defaultOrder: number = 10000

        const chains = chs
          .filter((ch) => !filteredChains.includes(ch.shortName))
          .sort((a, b) => {
            const orderA = order[a.shortName as keyof typeof order] || defaultOrder
            const orderB = order[b.shortName as keyof typeof order] || defaultOrder

            if (orderA !== orderB) {
              return orderA - orderB
            }

            return a.shortName.localeCompare(b.shortName)
          })
        setChains(chains)
      } catch (err) {
        setError(errorToString(err))
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrapper>
      {loading ? <Spinner mt={10} /> : !error && <MultiChainForm supportedChains={chains} />}
      {error && (
        <Alert status='error'>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Wrapper>
  )
}
