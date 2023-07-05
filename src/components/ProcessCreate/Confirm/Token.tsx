import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { useClient } from '@vocdoni/chakra-components'
import { EnvOptions, VocdoniCensus3Client } from '@vocdoni/sdk'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TokenPreview } from '../Census/Token'
import { useProcessCreationSteps } from '../Steps/use-steps'

const TokenConfirm = () => {
  const { t } = useTranslation()
  const { form } = useProcessCreationSteps()
  const { env } = useClient()

  const [token, setToken] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [max, setMax] = useState<any>()

  const { censusToken, maxCensusSize: sliderValue } = form

  const client = useMemo(
    () =>
      new VocdoniCensus3Client({
        env: env as EnvOptions,
      }),
    [env]
  )

  const handlerToken = async () => {
    setLoading(true)
    try {
      const t = await client.getToken(censusToken)
      setToken(t)
      return t
    } catch (e: any) {
      //   setError(errorToString(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handlerToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!token) return
    setMax(Number((token as any).size))
  }, [token])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Box mr={4}>
          <TokenPreview token={token} />

          {sliderValue && (
            <Flex flexDirection={{ base: 'column', lg: 'row' }} mt={2}>
              <Text>{t('form.process_create.census.max_census_slider_label')}</Text>{' '}
              <Text>
                {t('form.process_create.census.max_census_slider_tooltip', {
                  percent: Math.round((sliderValue / max) * 100),
                  voters: Math.round(sliderValue),
                })}
              </Text>
            </Flex>
          )}
        </Box>
      )}
    </>
  )
}

export default TokenConfirm
