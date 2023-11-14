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
  GridItem,
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
import { Census3Token, EnvOptions, ICensus3SupportedChain, Token, VocdoniCensus3Client } from '@vocdoni/sdk'
import { ChakraStylesConfig, GroupBase, Select, SelectComponentsConfig, SelectInstance } from 'chakra-react-select'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { customStylesSelect, customStylesTokensSelect } from '~theme/tokenSelectStyles'
import { customComponentsNetwork, customComponentsTokens } from './TokenSelectComponents'

export interface FilterOptionOption<Option> {
  readonly label: string
  readonly value: string
  readonly data: Option
}

export const CensusTokens = () => {
  const { env } = useClient()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingTk, setLoadingTk] = useState<boolean>(false)
  const selectTokenRef = useRef<SelectInstance<any, false, GroupBase<any>>>(null)
  const selectChainRef = useRef<SelectInstance<any, false, GroupBase<any>>>(null)
  const [chains, setChains] = useState<ICensus3SupportedChain[]>([])
  const [groupedTokens, setGroupedTokens] = useState<
    {
      label: string
      options: Token[] | { name: string; status: { synced: boolean }; type: string }[]
    }[]
  >([])
  const [totalTks, setTotalTks] = useState(0)

  const { t } = useTranslation()
  const {
    setValue,
    register,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  const client = useMemo(
    () =>
      new VocdoniCensus3Client({
        env: env as EnvOptions,
      }),
    [env]
  )
  const chain = register('chain', {
    required: {
      value: true,
      message: 'You need to select a network',
    },
  })

  const ch: ICensus3SupportedChain | undefined = watch('chain')

  const ctoken = register('censusToken', {
    required: {
      value: true,
      message: 'You need to select a token',
    },
  })
  const ct = watch('censusToken')

  const strategySize: number = watch('strategySize')

  const formatGroupLabel = (data: GroupBase<any>) => {
    const [opt] = data.options

    switch (opt.type) {
      case 'erc20':
        return 'Tokens'
      case 'erc721':
        return 'NFTs'
      case 'poap':
        return 'POAPs'
      default:
        return data.label
    }
  }

  const filterOptions = (candidate: FilterOptionOption<any>, input: string) => {
    const regex = new RegExp(input, 'ig')
    const { data } = candidate

    if (ch) {
      return (
        (data.chainID === ch.chainID && (data.name.match(regex) || data.symbol.match(regex) || data.ID.match(regex))) ||
        data.type === 'request'
      )
    }
    return true
  }

  useEffect(() => {
    // fetch tokens and chains
    ;(async () => {
      setLoading(true)
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

        const defaultOrder: number = 10000

        chs.sort((a, b) => {
          const orderA = order[a.shortName as keyof typeof order] || defaultOrder
          const orderB = order[b.shortName as keyof typeof order] || defaultOrder

          if (orderA !== orderB) {
            return orderA - orderB
          }

          return a.shortName.localeCompare(b.shortName)
        })
        setChains(chs)

        const tks = await client.getSupportedTokens()

        const uniqueTypes = [...new Set(tks.map((tk) => tk.type))].sort()

        const groupedTokens: {
          label: string
          options: Token[] | { name: string; status: { synced: boolean }; type: string }[]
        }[] = uniqueTypes.map((type) => {
          const tokensWithType = tks.filter((tk) => tk.type === type)
          return { label: type.toUpperCase(), options: tokensWithType }
        })

        groupedTokens.push({
          label: 'request',
          options: [{ name: 'Request Custom Tokens', status: { synced: true }, type: 'request' }],
        })

        const totalTks = groupedTokens.reduce((acc, curr) => {
          if (curr.label !== 'request') {
            return acc + curr.options.length
          }
          return acc
        }, 0)

        setTotalTks(totalTks)

        setGroupedTokens(groupedTokens)
      } catch (err) {
        setError(errorToString(err))
      }
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    // get token
    if (!ct) return
    ;(async () => {
      if (!ct?.ID) return
      setLoadingTk(true)
      try {
        const max = await client.getStrategySize(ct.defaultStrategy)

        setValue('strategySize', max)
      } catch (err) {
        setError(errorToString(err))
      } finally {
        setLoadingTk(false)
      }
    })()
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
        flexDirection={{ base: 'column', lg2: 'row' }}
        justifyContent='space-between'
        gap={{ base: 8, lg2: 0 }}
      >
        <FormControl
          isInvalid={!!errors.chain}
          w='full'
          maxW={{ base: '100%', lg2: '38%' }}
          display='flex'
          flexDirection='column'
          justifyContent='end'
          gap={1}
        >
          <FormLabel fontWeight='bold'>{t('form.process_create.census.network')}</FormLabel>
          <Select
            ref={selectChainRef}
            placeholder={t('form.process_create.census.network_placeholder')}
            aria-label={t('form.process_create.census.network_placeholder')}
            defaultValue={ch}
            name={chain.name}
            onBlur={chain.onBlur}
            options={Array.isArray(chains) ? chains : [chains]}
            getOptionValue={(value: ICensus3SupportedChain) => String(value.chainID)}
            getOptionLabel={({ name }: ICensus3SupportedChain) => `${name}`}
            onChange={(network) => {
              // setToken(undefined)
              setValue('censusToken', undefined)
              setValue('chain', network || undefined)
              setValue('maxCensusSize', undefined)
              clearErrors()
            }}
            isClearable
            isLoading={loading}
            isDisabled={loading || loadingTk}
            components={
              customComponentsNetwork as Partial<
                SelectComponentsConfig<ICensus3SupportedChain, boolean, GroupBase<ICensus3SupportedChain>>
              >
            }
            chakraStyles={
              customStylesSelect as ChakraStylesConfig<
                ICensus3SupportedChain,
                boolean,
                GroupBase<ICensus3SupportedChain>
              >
            }
          />
          <FormErrorMessage>{errors.chain && errors.chain.message?.toString()}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!errors.censusToken}
          w='full'
          maxW={{ base: '100%', lg2: '60%' }}
          display='flex'
          flexDirection='column'
          justifyContent='end'
          gap={1}
        >
          <FormLabel display='flex' justifyContent='space-between' fontWeight='bold'>
            <Text as='span'>Token</Text>{' '}
            {!!ch && !!totalTks && (
              <Text as='span' fontWeight='normal' ml={10} color='gray'>
                {totalTks === 1 ? '1 token' : `${totalTks} tokens`}
              </Text>
            )}
          </FormLabel>
          <Select
            ref={selectTokenRef}
            key={`my_unique_select_key__${ct}`}
            placeholder={t('form.process_create.census.tokens_placeholder')}
            aria-label={t('form.process_create.census.tokens_placeholder')}
            defaultValue={ct}
            name={ctoken.name}
            onBlur={ctoken.onBlur}
            formatGroupLabel={formatGroupLabel}
            options={groupedTokens}
            filterOption={filterOptions}
            getOptionValue={({ chainAddress, chainID, externalID }: Token) => chainAddress + chainID + externalID}
            getOptionLabel={(props: Token) => {
              if (props.symbol) return `${props.name}  (${props.symbol})`
              else return `${props.name}`
            }}
            onChange={(token) => {
              setValue('censusToken', token || undefined)
              setValue('maxCensusSize', undefined)
              clearErrors()
            }}
            isClearable
            isSearchable
            isDisabled={!ch || loadingTk}
            isOptionDisabled={(option) => !(option as { status?: { synced?: boolean } })?.status?.synced}
            components={customComponentsTokens as Partial<SelectComponentsConfig<unknown, boolean, GroupBase<unknown>>>}
            chakraStyles={customStylesTokensSelect}
          />
          <FormErrorMessage>{errors.censusToken && errors.censusToken.message?.toString()}</FormErrorMessage>
        </FormControl>
      </Flex>

      {loadingTk ? (
        <Spinner mt={10} />
      ) : (
        <>
          <TokenPreview token={ct} chainName={ch?.name} strategySize={strategySize} />
          <MaxCensusSizeSelector token={ct} strategySize={strategySize} />
        </>
      )}
    </Stack>
  )
}

export const MaxCensusSizeSelector = ({ token, strategySize }: { token?: Token; strategySize?: number }) => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()

  const [sliderValue, setSliderValue] = useState<number>(getValues('maxCensusSize'))
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (sliderValue !== undefined) return
    setValue('maxCensusSize', strategySize)
    setSliderValue(strategySize as number)
  }, [])

  if (sliderValue === undefined || !token || !strategySize) return null

  const percent = Math.round((sliderValue / strategySize) * 100)

  return (
    <>
      <FormControl isInvalid={!!errors.maxCensusSize} mb={3}>
        <FormLabel mb={3}>{t('form.process_create.census.max_census_slider_label')}</FormLabel>
        <Slider
          aria-label={t('form.process_create.census.max_census_slider_arialabel')}
          defaultValue={sliderValue}
          min={0}
          max={strategySize}
          onChange={(v) => {
            setSliderValue(v)
            setValue('maxCensusSize', v)
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderMark value={strategySize * 0.25} mt='1' ml='-2.5' fontSize='sm'>
            25%
          </SliderMark>
          <SliderMark value={strategySize * 0.5} mt='1' ml='-2.5' fontSize='sm'>
            50%
          </SliderMark>
          <SliderMark value={strategySize * 0.75} mt='1' ml='-2.5' fontSize='sm'>
            75%
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack bg='primary.500' />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg='primary.500'
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
            symbol: token.symbol,
            uniTokenHolders: sliderValue,
            percent,
          }}
        />
      </Text>
    </>
  )
}

export const TokenPreview = ({
  token,
  chainName,
  strategySize,
}: {
  token?: Census3Token
  chainName?: string
  strategySize?: number
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [minCardSize800px, setMinCardSize800px] = useState(false)

  useEffect(() => {
    const getCardWidth = () => {
      if (cardRef.current) {
        const { width } = cardRef.current.getBoundingClientRect()
        setMinCardSize800px(width >= 800)
      }
    }

    getCardWidth()

    window.addEventListener('resize', getCardWidth)

    return () => {
      window.removeEventListener('resize', getCardWidth)
    }
  }, [])

  if (!token || !strategySize) return null

  return (
    <Card ref={cardRef} w='full' my={5} boxShadow='var(--box-shadow)'>
      <CardHeader>
        <Grid
          gridTemplateColumns='min-content 1fr min-content min-content'
          gridColumn={{ base: 'min-content min-content', xl: 'min-content' }}
          gap={3}
        >
          <GridItem
            gridColumnStart={1}
            gridColumnEnd={2}
            gridRowStart={1}
            gridRowEnd={{ base: 2, sm2: 3, xl: minCardSize800px ? 2 : 3 }}
            display='flex'
            alignItems='center'
          >
            <Avatar
              name={token.name}
              src={
                token.iconURI ||
                `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token.ID}/logo.png`
              }
            />
          </GridItem>
          <GridItem
            gridColumnStart={{ base: 2, xl: minCardSize800px ? 3 : 2 }}
            gridColumnEnd={{ base: 3, xl: minCardSize800px ? 4 : 3 }}
            gridRowStart={1}
            gridRowEnd={2}
            display='flex'
            alignItems='center'
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
          </GridItem>
          <GridItem
            gridColumnStart={4}
            gridColumnEnd={5}
            gridRowStart={1}
            gridRowEnd={2}
            display='flex'
            alignItems='center'
          >
            <Text
              color='gray'
              alignSelf='center'
              whiteSpace={{ base: 'pre-wrap', sm2: 'nowrap' }}
              overflow='hidden'
              textOverflow='ellipsis'
              textAlign='center'
            >
              <Trans
                i18nKey={'form.process_create.census.holders'}
                values={{
                  holders: formatNumber(strategySize),
                }}
              />
            </Text>
          </GridItem>
          <GridItem
            gridColumnStart={{ base: 1, sm2: 2 }}
            gridColumnEnd={{ base: 6, xl: minCardSize800px ? 3 : 6 }}
            gridRowStart={{ base: 2, xl: minCardSize800px ? 1 : 2 }}
            gridRowEnd={{ base: 3, xl: minCardSize800px ? 2 : 3 }}
            display='flex'
            flexDirection='column'
            justifyContent='center'
          >
            <Heading size='sm' mb={1}>
              {token.name}
            </Heading>
            <Text>({token.symbol})</Text>
          </GridItem>
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
