import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Card,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { errorToString, useClient } from '@vocdoni/chakra-components'
import { EnvOptions, ICensus3Token, VocdoniCensus3Client } from '@vocdoni/sdk'
import { AsyncSelect, GroupBase, SelectInstance } from 'chakra-react-select'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const CensusTokens = () => {
  const { env } = useClient()
  const [token, setToken] = useState<ICensus3Token | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const selectRef = useRef<SelectInstance<any, false, GroupBase<any>>>(null)

  const { t } = useTranslation()
  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext()
  const client = useMemo(
    () =>
      new VocdoniCensus3Client({
        env: env as EnvOptions,
      }),
    [env]
  )
  const getToken = useCallback(
    async (token: string) => {
      setLoading(true)
      try {
        const t = await client.getToken(token)
        setToken(t)
        setValue('token', t)
        return t
      } catch (e: any) {
        setError(errorToString(e))
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [client]
  )

  const ctoken = register('censusToken', {
    required: {
      value: true,
      message: 'You need to select a token',
    },
  })
  const ct: string | undefined = watch('censusToken')

  useEffect(() => {
    if (!ct) return
    if (token && ct === token.id) return
    ;(async () => {
      const t = await getToken(ct)
      selectRef.current?.setValue(t, 'select-option')
    })()
  }, [ct, getToken, token])

  if (error) {
    return (
      <Alert status='error'>
        <AlertIcon />
        {error}
      </Alert>
    )
  }

  return (
    <Flex justifyContent='center'>
      <Stack maxW='50%' w='full' direction='column' gap={3} alignItems='center'>
        <FormControl isInvalid={!!errors.censusToken}>
          <AsyncSelect
            ref={selectRef}
            placeholder={t('form.process_create.census.tokens_placeholder')}
            cacheOptions
            defaultOptions
            defaultValue={ct}
            loadOptions={(input: string) => {
              const regex = new RegExp(input, 'ig')
              return client
                .getSupportedTokens()
                .then((res: object) =>
                  (res as ICensus3Token[]).filter(
                    (t) => t.name.match(regex) || t.symbol.match(regex) || t.id.match(regex)
                  )
                )
            }}
            getOptionValue={({ id }) => id}
            getOptionLabel={({ name, symbol }) => `${name} (${symbol})`}
            onChange={async (token) => setValue('censusToken', token?.id)}
            name={ctoken.name}
            onBlur={ctoken.onBlur}
            chakraStyles={{ container: (p, state) => ({ ...p, w: 'full' }) }}
          />
          <FormErrorMessage>{errors.censusToken && errors.censusToken.message?.toString()}</FormErrorMessage>
        </FormControl>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <TokenPreview token={token} />
            <MaxCensusSizeSelector token={token} />
          </>
        )}
      </Stack>
    </Flex>
  )
}

export const MaxCensusSizeSelector = ({ token }: { token?: ICensus3Token }) => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()
  const [sliderValue, setSliderValue] = useState<number>(getValues('maxCensusSize'))
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const { t } = useTranslation()

  // set slidervalue the very first time, based on token.size
  useEffect(() => {
    if (sliderValue !== undefined || !token) return

    setSliderValue(Number((token as any).size) / 2)
  }, [token, sliderValue])

  if (sliderValue === undefined || !token) return null

  const max = Number((token as any).size)

  return (
    <FormControl isInvalid={!!errors.maxCensusSize}>
      <FormLabel>{t('form.process_create.census.max_census_slider_label')}</FormLabel>
      <Slider
        aria-label={t('form.process_create.census.max_census_slider_arialabel')}
        defaultValue={sliderValue}
        min={0}
        max={max}
        onChange={(v) => {
          setSliderValue(v)
          setValue('maxCensusSize', v)
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderMark value={max * 0.25} mt='1' ml='-2.5' fontSize='sm'>
          25%
        </SliderMark>
        <SliderMark value={max * 0.5} mt='1' ml='-2.5' fontSize='sm'>
          50%
        </SliderMark>
        <SliderMark value={max * 0.75} mt='1' ml='-2.5' fontSize='sm'>
          75%
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg='blue.500'
          color='white'
          placement='top'
          isOpen={showTooltip}
          label={t('form.process_create.census.max_census_slider_tooltip', {
            percent: Math.round((sliderValue / max) * 100),
            voters: Math.round(sliderValue),
          })}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
      <FormErrorMessage>{errors.maxCensusSize && errors.maxCensusSize.message?.toString()}</FormErrorMessage>
    </FormControl>
  )
}

export const TokenPreview = ({ token }: { token?: ICensus3Token }) => {
  if (!token) return null

  return (
    <Card mt={3} w='full'>
      <CardHeader>
        <Flex gap='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar
              name={token.name}
              src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token.id}/logo.png`}
            />

            <Box>
              <Heading size='sm'>{token.name}</Heading>
              <Text>{token.symbol}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
  )
}
