import {
  Alert,
  AlertIcon,
  Avatar,
  Badge,
  Card,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
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
import { errorToString, useClient } from '@vocdoni/react-providers'
import { Census3TokenSummary, EnvOptions, ICensus3SupportedChain, Token, VocdoniCensus3Client } from '@vocdoni/sdk'
import { GroupBase, Select, SelectInstance } from 'chakra-react-select'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'

export const CensusTokens = () => {
  const { env } = useClient()
  const [token, setToken] = useState<Token | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const selectTokenRef = useRef<SelectInstance<any, false, GroupBase<any>>>(null)
  const selectChainRef = useRef<SelectInstance<any, false, GroupBase<any>>>(null)
  const [chains, setChains] = useState<ICensus3SupportedChain[]>([])
  const [tokens, setTokens] = useState<Census3TokenSummary[]>([])
  const [filtredaAndGroupedTokens, setFilteredAndGroupedTokens] = useState<
    { label: string; options: Census3TokenSummary[] }[]
  >([])
  const [isLoadingFiltredaAndGroupedTokens, setIsLoadingFiltredaAndGroupedTokens] = useState(false)

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
  const ctoken = register('censusToken', {
    required: {
      value: true,
      message: 'You need to select a token',
    },
  })
  const ct: Census3TokenSummary | undefined = watch('censusToken')

  const chain = register('censusToken', {
    required: {
      value: true,
      message: 'You need to select a token',
    },
  })
  const ch: ICensus3SupportedChain | undefined = watch('network')

  const getTokensAndChains = async () => {
    const tk = await client.getSupportedTokens()
    setTokens(tk)
    const ch = await client.getSupportedChains()
    setChains(ch)
  }

  const getFiltredAndGroupedTokens = () => {
    setIsLoadingFiltredaAndGroupedTokens(true)
    setToken(undefined)
    const filteredAndSyncedTokens = Array.from(tokens)
      .map((token) => {
        const isSynced = token.status?.synced

        return {
          ...token,
          disabled: !isSynced,
        }
      })
      .filter((token) => token.chainID === ch?.chainID)

    const uniqueTypes = [...new Set(tokens.map((tk) => tk.type))].sort()

    const orderedTokensByGroup: { label: string; options: Census3TokenSummary[] }[] = []

    uniqueTypes.forEach((type) => {
      const tokensWithType = Array.from(filteredAndSyncedTokens).filter((tk) => tk.type === type)

      orderedTokensByGroup.push({ label: type.toUpperCase(), options: tokensWithType })
    })

    setFilteredAndGroupedTokens(orderedTokensByGroup)
    setIsLoadingFiltredaAndGroupedTokens(false)
  }

  const getToken = async () => {
    if (!ct?.ID || !ch?.chainID) return
    setLoading(true)
    try {
      const token = await client.getToken(ct.ID, ch.chainID, ct.externalID)
      setToken(token)
    } catch (err) {
      setError(errorToString(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTokensAndChains()
  }, [])

  useEffect(() => {
    if (!ch) return
    getFiltredAndGroupedTokens()
  }, [ch])

  useEffect(() => {
    if (!ct) return
    getToken()
  }, [ct])

  if (error) {
    return (
      <Alert status='error'>
        <AlertIcon />
        {error}
      </Alert>
    )
  }

  return (
    <Stack w='full' direction='column' gap={3} alignItems='center'>
      <Flex
        w='full'
        flexDirection={{ base: 'column', md: 'row', lg: 'column', lg2: 'row' }}
        justifyContent='space-between'
        gap={3}
      >
        <Flex
          w='full'
          maxW={{ base: '100%', md: '40%', lg: '100%', lg2: '38%' }}
          flexDirection='column'
          justifyContent='end'
          gap={1}
        >
          {ch && <Text fontWeight='bold'>{t('form.process_create.census.network')}</Text>}
          <FormControl isInvalid={!!errors.network}>
            <Select
              ref={selectChainRef}
              placeholder={t('form.process_create.census.network')}
              aria-label={t('form.process_create.census.network_aria_label')}
              defaultValue={ch}
              options={Array.isArray(chains) ? chains : [chains]}
              getOptionValue={(value) => value}
              getOptionLabel={({ name }) => `${name}`}
              onChange={async (token) => {
                setValue('network', token)
                setValue('censusToken', undefined)
              }}
              name={chain.name}
              onBlur={chain.onBlur}
            />
            <FormErrorMessage>{errors.censusToken && errors.censusToken.message?.toString()}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex
          w='full'
          maxW={{ base: '100%', md: '55%', lg: '100%', lg2: '58%' }}
          flexDirection='column'
          justifyContent='end'
          gap={1}
        >
          {ct && <Text fontWeight='bold'>Token</Text>}
          <FormControl isInvalid={!!errors.censusToken}>
            <Select
              ref={selectTokenRef}
              key={`my_unique_select_key__${ct}`}
              placeholder={t('form.process_create.census.tokens_placeholder')}
              aria-label={t('form.process_create.census.tokens_placeholder')}
              defaultValue={ct}
              options={filtredaAndGroupedTokens}
              getOptionValue={(value) => value}
              getOptionLabel={({ name }) => name}
              onChange={async (token) => setValue('censusToken', token)}
              name={ctoken.name}
              onBlur={ctoken.onBlur}
              isDisabled={!ch}
              isLoading={isLoadingFiltredaAndGroupedTokens}
              value={ct}
              isOptionDisabled={(option) => option.disabled}
            />
            <FormErrorMessage>{errors.censusToken && errors.censusToken.message?.toString()}</FormErrorMessage>
          </FormControl>
        </Flex>
      </Flex>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TokenPreview token={token} chainName={ch?.name} />
          <MaxCensusSizeSelector token={token} />
        </>
      )}
    </Stack>
  )
}

export const MaxCensusSizeSelector = ({ token }: { token?: Token }) => {
  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext()
  const [sliderValue, setSliderValue] = useState<number>(getValues('maxCensusSize'))
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const { t } = useTranslation()

  // set slidervalue the very first time, based on token.size
  useEffect(() => {
    if (sliderValue !== undefined || !token) return

    const val = Number((token as any).size) / 2
    setSliderValue(val)
    setValue('maxCensusSize', Math.round(val))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, sliderValue])

  if (sliderValue === undefined || !token) return null

  const max = Number((token as any).size)
  const uniTokenHolders = watch('maxCensusSize')

  const percent = Math.round((sliderValue / max) * 100)

  return (
    <>
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
              percent,
              voters: Math.round(sliderValue),
            })}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
        <FormErrorMessage>{errors.maxCensusSize && errors.maxCensusSize.message?.toString()}</FormErrorMessage>
      </FormControl>
      <Text>
        <Trans
          i18nKey={'form.process_create.census.max_census_resum'}
          values={{
            uniTokenHolders: formatNumber(uniTokenHolders),
            percent,
          }}
        />
      </Text>
    </>
  )
}

export const TokenPreview = ({ token, chainName }: { token?: Token; chainName: string | undefined }) => {
  if (!token) return null

  return (
    <Card mt={3} w='full'>
      <CardHeader>
        <Grid
          gridTemplateColumns={{
            base: 'min-content 1fr',
            sm2: 'min-content min-content 1fr',
            xl: 'min-content 1fr min-content min-content min-content',
          }}
          gridTemplateRows={{ base: 'repeat(4, min-content)', sm2: 'repeat(3, min-content)', xl: '1fr' }}
          columnGap={{ base: 2, sm2: 3 }}
        >
          <Flex
            gridRowStart={1}
            gridRowEnd={{ base: 3, sm2: 2 }}
            gridColumnStart={1}
            gridColumnEnd={2}
            justifyContent='center'
            alignItems='center'
          >
            <Avatar
              name={token.name}
              src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token.ID}/logo.png`}
            />
          </Flex>
          <Flex
            gridRowStart={1}
            gridRowEnd={2}
            gridColumnStart={{ base: 2, xl: 5 }}
            gridColumnEnd={{ base: 3, xl: 6 }}
            justifyContent={{ base: 'center', sm2: 'start' }}
            whiteSpace='nowrap'
          >
            <Badge
              variant='outline'
              colorScheme='gray'
              py={1}
              px={3}
              maxW='min-content'
              borderRadius='lg'
              alignSelf='center'
            >
              {chainName}
            </Badge>
          </Flex>
          <Flex
            gridRowStart={{ base: 2, sm2: 1 }}
            gridRowEnd={{ base: 3, sm2: 2 }}
            gridColumnStart={{ base: 2, sm2: 3, xl: 6 }}
            gridColumnEnd={{ base: 3, sm2: 4, xl: 7 }}
            justifyContent={{ base: 'center', sm2: 'start' }}
          >
            <Text color='gray' alignSelf='center'>
              <Trans
                i18nKey={'form.process_create.census.holders'}
                values={{
                  holders: formatNumber(token.size),
                }}
              />
            </Text>
          </Flex>

          <Flex
            gridColumnStart={{ base: 1, xl: 2 }}
            gridColumnEnd={{ base: 3, sm2: 4, xl: 3 }}
            gridRowStart={{ base: 3, xl: 1 }}
            gridRowEnd={{ base: 4, xl: 2 }}
            justifyContent='start'
            alignItems={{ base: 'start', xl: 'center' }}
            flexDirection={{ base: 'column', xl: 'row' }}
            gap={2}
            mt={{ base: 3, xl: 0 }}
          >
            <Heading size='sm'>{token.name}</Heading>
            <Text>({token.symbol})</Text>
          </Flex>
        </Grid>
      </CardHeader>
    </Card>
  )
}
const formatNumber = (numero: number) => {
  if (numero < 1000) {
    return numero.toString()
  } else if (numero < 1000000) {
    const numEnK = Math.floor(numero / 1000)
    return numEnK.toFixed(0) + 'K'
  } else {
    const numEnM = Math.floor(numero / 1000000)
    return numEnM.toFixed(0) + 'M'
  }
}
